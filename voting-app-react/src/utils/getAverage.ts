const getAverage = (array: number[]) => {
  const size = array.length;
  const sum = array.reduce((a, b) => a + b, 0)

  return sum / size
}

export { getAverage }