export function bookEncoder(
  title: string,
  year: number,
  isInTheHouse: boolean
) {
  return JSON.stringify({
    title: `${title}`,
    year: year,
    isInTheHouse: isInTheHouse,
  });
}
