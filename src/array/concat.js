export function concat(arr, ...argArrs) {
  const result = [...arr]
  argArrs.forEach(array => {
    if (Array.isArray(array)) {
      array.forEach(item => {
        result.push(item)
      })
    } else {
      result.push(array)
    }
  })
  return result
}