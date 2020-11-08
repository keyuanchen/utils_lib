/***
 * instanceof
 * 通过实例的__proto__是否等于构造函数的prototype,沿着原型链查找，如果找到Object.prototype仍没有找到则返回false，否则返回true
 */

export function myInstanceOf(instance, Fn) {
  let proto = instance.__proto__
  while (proto.__proto__) {
    if (proto === Fn.prototype) {
      return true
    }
    proto = proto.__proto__
  }
  return false
}