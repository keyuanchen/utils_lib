/***
 * 方法一
 * 1 使用双重循环去重(外层循环+indexOf)
 * 2 不改变原数组，生成新数组返回
 */
export function unique1(arr) {
  const result = []

  arr.forEach(item => {
    const index = result.indexOf(item)
    if (index === -1) {
      result.push(item)
    }
  });

  return result
}

/***
 * 方法二
 * 1 使用循环+对象
 * 2 不改变原数组，生成新数组返回
 */
export function unique2(arr) {
  const result = []
  const obj = {}
  arr.forEach(item => {
    if (!obj[item]) { // 对象属性名的唯一性，如果没有该属性名，则添加并记录
      result.push(item)
      obj[item] = true
    }
  });
  return result
}
/***
 * 方法三
 * 1 使用ES6的... + Set
 * 2 不改变原数组，生成新数组返回
 */
export function unique3(arr) {
  // return Array.from(new Set(arr))
  return [...new Set(arr)]
}