export function roundToTheNearest(num: number, rate: number): number {
  if (rate >= 0.1)
    return parseFloat((Math.round(num / 0.05) * 0.05).toFixed(2));

  return parseFloat((Math.ceil(num * 10) / 10).toFixed(2));
}
