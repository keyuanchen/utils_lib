/**
 * 取出数组中的不同部分，组成新的数组
 */
import {
  filter
} from './declares';

// 一个数组
export function difference(array, arr1) {
  if (array.length === 0) {
    return []
  }
  if (arr1.length === 0) {
    return [...array]
  }
  return filter(array, item => {
    return arr1.indexOf(item) === -1
  })
}
// 多个数组
export function differences(array, ...arrays) {
  if (array.length === 0) {
    return []
  }
  if (arrays.length === 0) {
    return [...array]
  }
  return filter(array, item => {
    for (let index = 0; index < arrays.length; index++) {
      const arr = arrays[index];
      if (arr.indexOf(item) !== -1) {
        return false
      }
    }
    return true
  })
}