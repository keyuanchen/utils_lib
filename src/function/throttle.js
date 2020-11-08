export default function throttle(callback, delay) {
  let pro = 0
  return function (e) {
    const cur = Date.now()
    if (cur - pre > delay) {
      callback.call(this, e)
      pre = cur
    }
  }
}