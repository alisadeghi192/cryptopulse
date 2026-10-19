const COIN_DECIMALS = 8
const USD_DECIMALS = 2

export const EPSILON = 1e-12

export function floorTo(value: number, decimals: number): number {
  const factor = 10 ** decimals
  return Math.floor(value * factor + Number.EPSILON) / factor
}

export function lte(a: number, b: number): boolean {
  return a <= b + EPSILON
}

export function gte(a: number, b: number): boolean {
  return a + EPSILON >= b
}

export function maxBuyUsd(cashBalance: number, feeRate: number): number {
  if (cashBalance <= 0) return 0
  return floorTo(cashBalance / (1 + feeRate), USD_DECIMALS)
}

export function maxBuyCoin(
  cashBalance: number,
  price: number,
  feeRate: number,
): number {
  if (cashBalance <= 0 || price <= 0) return 0
  const usd = cashBalance / (1 + feeRate)
  return floorTo(usd / price, COIN_DECIMALS)
}

export function maxSellCoin(holdingAmount: number): number {
  return Math.max(holdingAmount, 0)
}

/**
 * MAX amount (in USD) that can be withdrawn.
 * In our model, fee is deducted FROM the withdrawal amount (not from cash).
 * So user can withdraw their entire cash balance (minus minimum).
 */
export function maxWithdrawUsd(cashBalance: number, fee: number): number {
  if (cashBalance < fee + 10) return 0
  return floorTo(cashBalance, USD_DECIMALS)
}

export function coinToUsdFloor(amount: number, price: number): number {
  return floorTo(amount * price, USD_DECIMALS)
}

export function calculateTradeTotals(
  amount: number,
  price: number,
  feeRate: number,
  isBuy: boolean,
) {
  const subtotal = amount * price
  const fee = subtotal * feeRate
  const total = isBuy ? subtotal + fee : subtotal - fee
  return {
    subtotal: floorTo(subtotal, USD_DECIMALS),
    fee: floorTo(fee, USD_DECIMALS),
    total: floorTo(total, USD_DECIMALS),
  }
}

