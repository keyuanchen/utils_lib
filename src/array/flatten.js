/**
 * 数组扁平化
 * 方法一
 * 使用reduce+concat+递归
 */
export function flatten1(array) {
  return array.reduce((pre, cur) => {
    pre = pre.concat(Array.isArray(cur) ? flatten1(cur) : cur)
    return pre
  }, [])
}

/**
 * 方法二
 * 使用concat+some+while
 */
export function flatten2(array) {
  // 将目标数组去一维
  let result = [].concat(...array)
  while (result.some(item => Array.isArray(item))) {
    result = [].concat(...result)
  }
  return result
}