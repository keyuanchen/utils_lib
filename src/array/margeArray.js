/***
 * 数组的合并
 * 保留第一个数组中的元素，后面的数组中如果元素在第一个数组中存在就忽略，反之，添加到新数组中，组成新的数组返回
 */

import {
  indexOf
} from './declares';

export function mergeArray(arr1, ...arrays) {
  const result = [...arr1]

  arrays.forEach(array => {
    array.forEach(item => {
      if (indexOf(result, item) === -1) {
        result.push(item)
      }
    })
  })

  return result
}