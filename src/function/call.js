export default function(fn, obj, ...args) {
  if (obj == null) {
    obj = window
  }
  obj.tempFun = fn
  const result = obj.tempFun(...args)
  delete obj.tempFun
  return result
}
