export default function debounce(callback, delay) {
  return function (e) {
    if (callback.hasOwnProperty('timeId')) {
      clearTimeout(callback.timeId)
    }
    callback.timeId = setTimeout(_ => {
      callback.call(this, e)
      // 事件调用后删除
      delete callback.timeId
    }, delay)
  }
}