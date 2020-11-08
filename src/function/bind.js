import call from "./call"

export function bind(fn, obj, ...args) {
  const _this = fn
  return function (...args2) {
    return call(_this, obj, ...args, ...args2)
  }
}