export const createVector = (length: number) => {
  "worklet"
  const vector = []
  for (let i = 0; i < length; i++) {
    vector.push(i)
  }
  return vector
}
