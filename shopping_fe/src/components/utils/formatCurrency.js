const CURRENCY_FORMATTER = new Intl.NumberFormat("vi-VI", {
    currency: "VND",
    style: "currency",
})
/**
 * Format a number into currency format.
 * @param {number} number - The number to be formatted.
 * @returns {string} The formatted currency string.
 */
export function formatCurrency(number) {
    return CURRENCY_FORMATTER.format(number)
}