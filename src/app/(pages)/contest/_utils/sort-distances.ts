export function sortDistances(distances: string[]): string[] {
  return distances.sort((a, b) => {
    const parseDistance = (d: string) => {
      const num = parseFloat(d.replace(/[^0-9.]/g, ''));
      return isNaN(num) ? 0 : num;
    };
    return parseDistance(a) - parseDistance(b);
  });
}