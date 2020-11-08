export function map(arr, callback) {
  let array = []
  for (let index = 0; index < arr.length; index++) {
    const element = arr[index];
    const result = callback(element, index)
    array.push(result)
  }
  return array
}

export function filter(arr, callback) {
  let array = []
  for (let index = 0; index < arr.length; index++) {
    const element = arr[index];
    const result = callback(element, index)
    if (result) {
      array.push(element)
    }
  }
  return array
}

export function indexOf(arr, ele) {
  for (let index = 0; index < arr.length; index++) {
    const element = arr[index];
    if (ele === element) {
      return index
    }
  }
  return -1
}

export function lastIndexOf(arr, ele) {
  for (let index = arr.length - 1; index >= 0; index--) {
    const element = arr[index];
    if (element === ele) {
      return index
    }
  }
  return -1
}

export function reduce(arr, callback) {
  let total = initValue
  // 遍历当前数组的每一个元素，调用callback得到一个累加的结果数据
  for (let index = 0; index < arr.length; index++) {
    const element = arr[index]
    total = callback(total, element, index)
  }
  return total
}

export function find(arr, callback) {
  for (let index = 0; index < arr.length; index++) {
    const element = arr[index];
    const result = callback(element, index)
    if (result) {
      return element
    }
  }
  return undefined
}

export function findIndex(arr, callback) {
  for (let index = 0; index < arr.length; index++) {
    const element = arr[index];
    const result = callback(element, index)
    if (result) {
      return index
    }
  }
  return -1
}

export function every(arr, callback) {
  for (let index = 0; index < arr.length; index++) {
    const element = arr[index];
    const result = callback(element, index)
    if (!result) {
      return false
    }
  }
  return true
}

export function some(arr, callback) {
  for (let index = 0; index < arr.length; index++) {
    const element = arr[index];
    const result = callback(element, index)
    if (result) {
      return true
    }
  }
  return false
}