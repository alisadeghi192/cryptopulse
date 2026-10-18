
const COIN_DECIMALS = 8
const USD_DECIMALS = 2

/**
 * Floor a value to a given number of decimals without floating point drift.
 */
export function floorTo(value: number, decimals: number): number {
  const factor = 10 ** decimals
  return Math.floor(value * factor + Number.EPSILON) / factor
}

/**
 * MAX amount (in USD) that can be spent when buying, given cash balance and fee rate.
 * Ensures `amount + amount * feeRate <= cashBalance`.
 */
export function maxBuyUsd(cashBalance: number, feeRate: number): number {
  if (cashBalance <= 0) return 0
  return floorTo(cashBalance / (1 + feeRate), USD_DECIMALS)
}

/**
 * MAX coin amount that can be bought, given cash balance, price and fee rate.
 * Floors to 8 decimals of the coin.
 */
export function maxBuyCoin(
  cashBalance: number,
  price: number,
  feeRate: number,
): number {
  if (cashBalance <= 0 || price <= 0) return 0
  const usd = cashBalance / (1 + feeRate)
  return floorTo(usd / price, COIN_DECIMALS)
}

/**
 * MAX coin amount that can be sold, given current holding.
 */
export function maxSellCoin(holdingAmount: number): number {
  return floorTo(holdingAmount, COIN_DECIMALS)
}

/**
 * MAX amount (in USD) that can be withdrawn, given cash balance and fixed fee.
 * Ensures `amount + fee <= cashBalance`.
 */
export function maxWithdrawUsd(cashBalance: number, fee: number): number {
  const usable = cashBalance - fee
  if (usable <= 0) return 0
  return floorTo(usable, USD_DECIMALS)
}