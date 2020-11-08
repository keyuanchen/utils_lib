/***
 * mergeObject
 * merge前：
 * {a:{x:0},b:{y:1}}
 * {b: {z:10}}
 * {c:'c'}
 * mergeh后：
 * {a:{x:0},b:[{y:1},{z:10}],c:'c'}
 * 如果两个对象相同属性名都不是数组，merge后变为数组形式
 */
import {
  concat
} from '../array/concat'

export function mergeObject(...objects) {
  const result = {}
  objects.forEach(object => {
    for (let key in object) {
      if (object.hasOwnProperty(key)) {
        const element = object[key];
        if (!result[key]) { //如果对象中没有该属性名 
          result[key] = element
        } else { // 属性名存在
          // 需要分result[key]是不是数组再操作，可以使用concat，是数组，可以降维，不是数组的话，生成新数组，并赋值给result[key]
          result[key] = concat([], result[key], element)
        }
      }
    }
  })
  return result
}