export const createColor = () => {
  const r = Math.round(Math.random() * 256)
    .toString(16)
    .padStart(2, "0")
  const g = Math.round(Math.random() * 256)
    .toString(16)
    .padStart(2, "0")
  const b = Math.round(Math.random() * 256)
    .toString(16)
    .padStart(2, "0")
  return `#${r}${g}${b}`
}
