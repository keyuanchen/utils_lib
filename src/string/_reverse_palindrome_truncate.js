/***
 * 字符串的倒序，回文，截取
 */

export function reverseStr(str) {
  return str.split('').reverse().join('')
}

export function palindrome(str) {
  return str === reverseStr(str)
}

export function truncate(str, size) {
  return str.length > size ? str.substring(0, size) : str
}