export function slice(arr, begin, end) {
  const result = []
  if (arr.length === 0) {
    return result
  }
  begin = begin || 0
  end = end || arr.length

  if (begin < 0) {
    begin = 0
  }
  if (end > arr.length) {
    end = arr.length
  }

  for (let index = begin; index < end; index++) {
    const element = arr[index];
    result.push(element)
  }

  return result
}