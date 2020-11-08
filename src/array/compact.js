/***
 * 返回一个新数组，新数组中包含原数组的所有真值
 */
import {
  filter
} from './declares';

export function compact(arr) {
  return filter(arr, element => element)
}