import {
  filter
} from "./declares";

/***
 * pull([1,3,5,6], 3,5,6,9)d第一个参数是数组，生成一个新数组，这个数组中包含第一个参数数组中在后面参数列表中出现过的元素，返回这个新数组，改变原数组
 * pullArray后面的参数列表变成数组
 */

export function pull(array, ...values) {
  const result = []
  for (let index = 0; index < array.length; index++) {
    const item = array[index];
    if (values.indexOf(item) !== -1) { // 参数列表包含数组中的元素
      // 删除该元素
      arr.splice(index, 1)
      // 添加元素到新数组中
      result.push(item)
      // 由于删除后原数组减少一个元素，为了避免中间隔过元素
      index--
    }
  }
  return result
}

export function pullArray(array, values) {
  return pull(array, ...values)
}