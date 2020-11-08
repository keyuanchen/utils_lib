/***
 * drop(arr, count):从左边开始删除count个元素，改变原数组，生成新数组返回
 * dropRight(arr, count): 从右边开始删除count个元素，改变原数组，生成新数组返回
 */
import {
  filter
} from './declares'

export function drop(arr, count = 1) {
  if (count < 1) {
    count = 1
  }
  if (!arr.length) {
    return []
  }
  return filter(arr, (item, index) => index >= count)
}

export function dropRight(arr, count = 1) {
  if (count < 1) {
    count = 1
  }
  if (!arr.length) {
    return []
  }
  return filter(arr, (item, index) => index < (arr.length - count))
}