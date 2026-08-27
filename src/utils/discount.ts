export function getDiscountPercentage(
  price: number,
  originalPrice?: number,
): number {
  if (!originalPrice || originalPrice <= price) return 0;

  return Math.round(((originalPrice - price) / originalPrice) * 100);
}
