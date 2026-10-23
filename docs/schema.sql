-- ============================================================
-- CryptoPulse — Database Schema
-- ============================================================
-- Run this in your Supabase SQL Editor to set up the database.
-- Creates: 4 tables, 4 RPCs, RLS policies, and grants.
-- ============================================================

-- ============================================================
-- 1. Tables
-- ============================================================

create table public.wallets (
  user_id uuid not null,
  cash_balance numeric not null default 1000,
  account_number text null,
  created_at timestamp with time zone not null default now(),
  constraint wallets_pkey primary key (user_id),
  constraint wallets_user_id_fkey foreign key (user_id)
    references auth.users (id) on delete cascade
);

create index if not exists wallets_user_idx
  on public.wallets using btree (user_id);

create table public.holdings (
  id uuid not null default gen_random_uuid(),
  user_id uuid not null,
  coin_id text not null,
  coin_symbol text not null,
  amount numeric not null default 0,
  avg_buy_price numeric not null default 0,
  created_at timestamp with time zone not null default now(),
  constraint holdings_pkey primary key (id),
  constraint holdings_user_id_coin_id_key unique (user_id, coin_id),
  constraint holdings_user_id_fkey foreign key (user_id)
    references auth.users (id) on delete cascade
);

create index if not exists holdings_user_idx
  on public.holdings using btree (user_id);

create table public.transactions (
  id uuid not null default gen_random_uuid(),
  user_id uuid not null,
  type text not null,
  coin_id text null,
  coin_symbol text null,
  amount numeric not null,
  price numeric null,
  total_usd numeric not null,
  fee numeric not null default 0,
  txn_id text not null,
  created_at timestamp with time zone not null default now(),
  constraint transactions_pkey primary key (id),
  constraint transactions_user_id_fkey foreign key (user_id)
    references auth.users (id) on delete cascade,
  constraint transactions_type_check check (
    type in ('deposit', 'withdraw', 'buy', 'sell')
  )
);

create index if not exists transactions_user_idx
  on public.transactions using btree (user_id);

create index if not exists transactions_created_idx
  on public.transactions using btree (created_at desc);

create table public.watchlist (
  id uuid not null default gen_random_uuid(),
  user_id uuid not null,
  coin_id text not null,
  created_at timestamp with time zone not null default now(),
  constraint watchlist_pkey primary key (id),
  constraint watchlist_user_id_coin_id_key unique (user_id, coin_id),
  constraint watchlist_user_id_fkey foreign key (user_id)
    references auth.users (id) on delete cascade
);

create index if not exists watchlist_user_id_idx
  on public.watchlist using btree (user_id);

-- ============================================================
-- 2. RPCs (Atomic financial operations)
-- ============================================================

create or replace function public.deposit_funds(p_amount numeric)
returns json
language plpgsql
security definer
as $function$
declare
  v_user_id uuid := auth.uid();
  v_wallet record;
  v_new_balance numeric;
  v_txn_id text;
begin
  if p_amount < 10 then
    raise exception 'Minimum deposit is $10';
  end if;
  if p_amount > 100000 then
    raise exception 'Maximum deposit is $100,000';
  end if;

  select * into v_wallet from public.wallets
    where user_id = v_user_id for update;
  if not found then
    raise exception 'Wallet not found';
  end if;

  v_new_balance := v_wallet.cash_balance + p_amount;
  update public.wallets set cash_balance = v_new_balance
    where user_id = v_user_id;

  v_txn_id := 'TXN-' || to_char(now(), 'YYYYMMDD') || '-' ||
              upper(substr(md5(random()::text), 1, 6));

  insert into public.transactions (user_id, type, amount, total_usd, fee, txn_id)
  values (v_user_id, 'deposit', p_amount, p_amount, 0, v_txn_id);

  return json_build_object('success', true, 'txn_id', v_txn_id);
end;
$function$;

create or replace function public.withdraw_funds(p_amount numeric)
returns json
language plpgsql
security definer
as $function$
declare
  v_user_id uuid := auth.uid();
  v_wallet record;
  v_new_balance numeric;
  v_txn_id text;
  v_fee numeric := 0.5;
begin
  if p_amount < 10 then
    raise exception 'Minimum withdrawal is $10';
  end if;

  select * into v_wallet from public.wallets
    where user_id = v_user_id for update;
  if not found then
    raise exception 'Wallet not found';
  end if;

  if p_amount > v_wallet.cash_balance + 1e-12 then
    raise exception 'Insufficient balance';
  end if;

  v_new_balance := v_wallet.cash_balance - p_amount;
  update public.wallets set cash_balance = v_new_balance
    where user_id = v_user_id;

  v_txn_id := 'TXN-' || to_char(now(), 'YYYYMMDD') || '-' ||
              upper(substr(md5(random()::text), 1, 6));

  insert into public.transactions (user_id, type, amount, total_usd, fee, txn_id)
  values (v_user_id, 'withdraw', p_amount, p_amount, v_fee, v_txn_id);

  return json_build_object('success', true, 'txn_id', v_txn_id);
end;
$function$;

create or replace function public.buy_coin(
  p_coin_id text,
  p_coin_symbol text,
  p_coin_amount numeric,
  p_price numeric,
  p_fee_rate numeric
)
returns json
language plpgsql
security definer
as $function$
declare
  v_user_id uuid := auth.uid();
  v_wallet record;
  v_total_cost numeric;
  v_subtotal numeric;
  v_fee numeric;
  v_new_balance numeric;
  v_existing_holding record;
  v_new_amount numeric;
  v_new_avg_price numeric;
  v_txn_id text;
begin
  if p_coin_amount <= 0 then
    raise exception 'Amount must be greater than 0';
  end if;

  select * into v_wallet from public.wallets
    where user_id = v_user_id for update;
  if not found then
    raise exception 'Wallet not found';
  end if;

  v_subtotal := p_coin_amount * p_price;
  v_fee := v_subtotal * p_fee_rate;
  v_total_cost := v_subtotal + v_fee;

  if v_subtotal < 1 then
    raise exception 'Minimum buy order is $1';
  end if;

  if v_total_cost > v_wallet.cash_balance + 1e-12 then
    raise exception 'Insufficient balance';
  end if;

  v_new_balance := v_wallet.cash_balance - v_total_cost;
  update public.wallets set cash_balance = v_new_balance
    where user_id = v_user_id;

  select * into v_existing_holding from public.holdings
    where user_id = v_user_id and coin_id = p_coin_id;

  if found then
    v_new_amount := v_existing_holding.amount + p_coin_amount;
    v_new_avg_price := ((v_existing_holding.amount * v_existing_holding.avg_buy_price) +
                        (p_coin_amount * p_price)) / v_new_amount;
    update public.holdings
      set amount = v_new_amount, avg_buy_price = v_new_avg_price
      where id = v_existing_holding.id;
  else
    insert into public.holdings (user_id, coin_id, coin_symbol, amount, avg_buy_price)
    values (v_user_id, p_coin_id, p_coin_symbol, p_coin_amount, p_price);
  end if;

  v_txn_id := 'TXN-' || to_char(now(), 'YYYYMMDD') || '-' ||
              upper(substr(md5(random()::text), 1, 6));

  insert into public.transactions (
    user_id, type, coin_id, coin_symbol, amount, price, total_usd, fee, txn_id
  ) values (
    v_user_id, 'buy', p_coin_id, p_coin_symbol, p_coin_amount, p_price,
    v_total_cost, v_fee, v_txn_id
  );

  return json_build_object('success', true, 'txn_id', v_txn_id);
end;
$function$;

create or replace function public.sell_coin(
  p_coin_id text,
  p_coin_symbol text,
  p_coin_amount numeric,
  p_price numeric,
  p_fee_rate numeric
)
returns json
language plpgsql
security definer
as $function$
declare
  v_user_id uuid := auth.uid();
  v_wallet record;
  v_existing_holding record;
  v_subtotal numeric;
  v_fee numeric;
  v_net_amount numeric;
  v_new_balance numeric;
  v_new_amount numeric;
  v_txn_id text;
  v_dust_threshold numeric := 0.000000001;
begin
  if p_coin_amount <= 0 then
    raise exception 'Amount must be greater than 0';
  end if;

  select * into v_wallet from public.wallets
    where user_id = v_user_id for update;
  if not found then
    raise exception 'Wallet not found';
  end if;

  select * into v_existing_holding from public.holdings
    where user_id = v_user_id and coin_id = p_coin_id for update;
  if not found then
    raise exception 'No holdings found';
  end if;

  if p_coin_amount > v_existing_holding.amount + 1e-12 then
    raise exception 'Insufficient holdings';
  end if;

  if p_coin_amount > v_existing_holding.amount then
    p_coin_amount := v_existing_holding.amount;
  end if;

  v_subtotal := p_coin_amount * p_price;
  v_fee := v_subtotal * p_fee_rate;
  v_net_amount := v_subtotal - v_fee;

  v_new_amount := v_existing_holding.amount - p_coin_amount;

  if v_subtotal < 1 and v_new_amount > v_dust_threshold then
    raise exception 'Minimum sell order is $1';
  end if;

  v_new_balance := v_wallet.cash_balance + v_net_amount;
  update public.wallets set cash_balance = v_new_balance
    where user_id = v_user_id;

  if v_new_amount <= v_dust_threshold then
    delete from public.holdings where id = v_existing_holding.id;
  else
    update public.holdings set amount = v_new_amount
      where id = v_existing_holding.id;
  end if;

  v_txn_id := 'TXN-' || to_char(now(), 'YYYYMMDD') || '-' ||
              upper(substr(md5(random()::text), 1, 6));

  insert into public.transactions (
    user_id, type, coin_id, coin_symbol, amount, price, total_usd, fee, txn_id
  ) values (
    v_user_id, 'sell', p_coin_id, p_coin_symbol, p_coin_amount, p_price,
    v_net_amount, v_fee, v_txn_id
  );

  return json_build_object('success', true, 'txn_id', v_txn_id);
end;
$function$;

-- ============================================================
-- 3. RLS: Enable
-- ============================================================

alter table public.wallets enable row level security;
alter table public.holdings enable row level security;
alter table public.transactions enable row level security;
alter table public.watchlist enable row level security;

-- ============================================================
-- 4. RLS: Policies
-- ============================================================

-- wallets
create policy "Users view own wallet"
  on public.wallets for select
  using (auth.uid() = user_id);

create policy "Users insert own wallet"
  on public.wallets for insert
  with check (auth.uid() = user_id);

create policy "Users update own wallet"
  on public.wallets for update
  using (auth.uid() = user_id);

-- holdings
create policy "Users view own holdings"
  on public.holdings for select
  using (auth.uid() = user_id);

create policy "Users insert own holdings"
  on public.holdings for insert
  with check (auth.uid() = user_id);

create policy "Users update own holdings"
  on public.holdings for update
  using (auth.uid() = user_id);

create policy "Users delete own holdings"
  on public.holdings for delete
  using (auth.uid() = user_id);

-- transactions (immutable audit log — no update/delete)
create policy "Users view own transactions"
  on public.transactions for select
  using (auth.uid() = user_id);

create policy "Users insert own transactions"
  on public.transactions for insert
  with check (auth.uid() = user_id);

-- watchlist
create policy "Users view own watchlist"
  on public.watchlist for select
  using (auth.uid() = user_id);

create policy "Users insert own watchlist"
  on public.watchlist for insert
  with check (auth.uid() = user_id);

create policy "Users delete own watchlist"
  on public.watchlist for delete
  using (auth.uid() = user_id);

-- ============================================================
-- 5. Grants
-- ============================================================

grant select, insert, update, delete
  on public.wallets, public.holdings, public.transactions, public.watchlist
  to authenticated;

grant select, insert, update, delete
  on public.wallets, public.holdings, public.transactions, public.watchlist
  to service_role;

-- RPCs: execute permission
grant execute on function public.deposit_funds(numeric) to authenticated;
grant execute on function public.withdraw_funds(numeric) to authenticated;
grant execute on function public.buy_coin(text, text, numeric, numeric, numeric) to authenticated;
grant execute on function public.sell_coin(text, text, numeric, numeric, numeric) to authenticated;

-- ============================================================
-- 6. Storage: avatars bucket (optional)
-- ============================================================

-- Uncomment if you want to store avatars in Supabase Storage.
-- 1. Create a public bucket named "avatars" in the dashboard.
-- 2. Then run:

-- create policy "Avatars are publicly readable"
--   on storage.objects for select
--   using (bucket_id = 'avatars');
--
-- create policy "Users can upload their own avatar"
--   on storage.objects for insert
--   with check (
--     bucket_id = 'avatars'
--     and auth.uid()::text = (storage.foldername(name))[1]
--   );
--
-- create policy "Users can update their own avatar"
--   on storage.objects for update
--   using (
--     bucket_id = 'avatars'
--     and auth.uid()::text = (storage.foldername(name))[1]
--   );
--
-- create policy "Users can delete their own avatar"
--   on storage.objects for delete
--   using (
--     bucket_id = 'avatars'
--     and auth.uid()::text = (storage.foldername(name))[1]
--   );