/**
 * Format a wallet balance (Cash, Total Portfolio, Holdings Value, PnL).
 *
 * Rules:
 *  - Below 1 million: full number with 2 decimals + thousands separator
 *  - 1 million to 1 billion: abbreviated with "M"
 *  - 1 billion and above: abbreviated with "B"
 *
 * @example
 * formatBalance(999999)     → "$999,999.00"
 * formatBalance(1000000)    → "$1.00M"
 * formatBalance(1000000000) → "$1.00B"
 */
/**
 * Format a wallet balance (Cash, Total Portfolio, Holdings Value, PnL).
 */
export function formatBalance(value: number): string {
  if (!isFinite(value)) return '$—'

  const abs = Math.abs(value)
  const sign = value < 0 ? '-' : ''

  // Treat dust (< $0.01) as zero for display
  if (abs < 0.01) {
    return `${sign}$0.00`
  }

  if (abs < 1_000_000) {
    return `${sign}$${abs.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`
  }

  if (abs >= 1_000_000_000) {
    return `${sign}$${(abs / 1_000_000_000).toFixed(2)}B`
  }

  return `${sign}$${(abs / 1_000_000).toFixed(2)}M`
}

/**
 * Check whether a balance value gets abbreviated (≥ 1 million).
 */
export function isAbbreviated(value: number): boolean {
  return isFinite(value) && Math.abs(value) >= 1_000_000
}

/**
 * Format a balance with full precision — no abbreviation.
 * Used for tooltips on abbreviated values.
 *
 * @example
 * formatBalanceFull(1000000)     → "$1,000,000.00"
 * formatBalanceFull(5500000000)  → "$5,500,000,000.00"
 */
export function formatBalanceFull(value: number): string {
  if (!isFinite(value)) return '$—'

  const abs = Math.abs(value)
  const sign = value < 0 ? '-' : ''

  return `${sign}$${abs.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

/**
 * Format a cryptocurrency price (BTC, ETH, SHIB, ...).
 */
export function formatCoinPrice(value: number): string {
  if (!isFinite(value) || value === 0) return '$0.00'

  const abs = Math.abs(value)
  const sign = value < 0 ? '-' : ''

  if (abs >= 1000) {
    return `${sign}$${abs.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`
  }

  if (abs >= 0.01) {
    return `${sign}$${abs.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 4,
    })}`
  }

  return `${sign}$${abs.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 8,
  })}`
}

/**
 * Format a raw amount of coins (e.g. "0.5 BTC").
 */
/**
 * Format a raw amount of coins (e.g. "0.5 BTC").
 */
export function formatCoinAmount(value: number, maxDecimals = 8): string {
  if (!isFinite(value) || Math.abs(value) < 1e-8) return '0'

  return value.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: maxDecimals,
  })
}
/**
 * Format a fee amount.
 * Ensures that very small fees (e.g. $0.00996) still display as non-zero.
 */
export function formatFee(value: number): string {
  if (!isFinite(value) || value === 0) return '$0.00'
  
  const abs = Math.abs(value)
  const sign = value < 0 ? '-' : ''
  
  if (abs >= 0.01) {
    return `${sign}$${abs.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`
  }
  
  // For very small values, keep up to 4 significant digits after the leading zeros
  return `${sign}$${abs.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  })}`
}
