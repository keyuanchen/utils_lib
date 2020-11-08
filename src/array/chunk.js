/***
 * 将一维数组修改为二维数组
 * size: 每一个小数组的长度(默认小数组的长度是1)
 */
export function chunk(array, size = 1) {
  const bigArr = []
  let smallArr = []
  if (size < 1) {
    size = 1
  }
  // if (size > array.length) { 
  //   size = array.length
  // }

  array.forEach(element => {
    if (smallArr.length === 0) {
      bigArr.push(smallArr)
    }
    smallArr.push(element)
    if (smallArr.length === size) {
      smallArr = []
    }
  })
  return bigArr
}