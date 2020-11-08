/***
 * 实现new运算符
 * new做了什么？
 * 1 创建一个空对象
 * 2 空对象继承类的原型
 * 3 执行构造函数并使this指向新创建的对象
 * 4 构造函数执行返回的是object类型，则作为new的返回值，否则，新创建的对象作为new运算的返回值
 */

export function createInstance(Fn, ...args) {
  const obj = {}
  obj.__proto__ = Fn.prototype
  obj.fn = Fn
  const result = obj.fn.call(obj, ...args)
  delete obj.fn
  if (result instanceof Object) {
    return result
  }
  return obj
}