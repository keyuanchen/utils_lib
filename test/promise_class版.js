(
  function (window) {
    /***
     * 手写promise
     */

    /***
     * 第一步：搭结构
     */
    class Promise {
      constructor(executor) {
        const _this = this
        _this.status = 'pending' // promise实例对象的状态
        _this.data = '' // 保存数据
        _this.callbacks = [] // 缓存成功或者失败的回调，内容是对象形式{onResolved, onRejected}
        // resolve回调
        function resolve(value) {
          // 如果promise实例对象的状态已经改变了，什么也不做
          if (_this.status !== 'pending') return
          // 修改promise实例的状态为成功
          _this.status = 'resolved'
          // 保存数据
          _this.data = value
          // 异步执行成功的回调
          setTimeout(_ => {
            if (_this.callbacks.length > 0) {
              _this.callbacks.forEach(callbackObject => {
                callbackObject.onResolved(value)
              });
            }
          })
        }
        // reject回调
        function reject(reason) {
          // 如果promise实例对象的状态已经改变了，什么也不做
          if (_this.status !== 'pending') return
          // 修改promise实例的状态为失败
          _this.status = 'rejected'
          // 保存数据
          _this.data = reason
          // 异步执行成功的回调
          setTimeout(_ => {
            if (_this.callbacks.length > 0) {
              _this.callbacks.forEach(callbackObject => {
                callbackObject.onRejected(reason)
              });
            }
          })
        }
        // 执行器函数是同步执行
        /***
         * 执行器函数执行来改变promist实例对象的状态
         * 1 抛出错误
         * 2 resolve()状态变为成功
         * 3 reject() 状态变为失败
         */
        try {
          // 同步执行执行器函数
          executor(resolve, reject)
        } catch (error) {
          reject(error)
        }
      }
      then(onResolved, onRejected) {
        // 对两个函数参数初始化
        onResolved = typeof onResolved === 'function' ? onResolved : value => value
        onRejected = typeof onRejected === 'function' ? onRejected : reason => {
          throw reason
        }
        const _this = this
        // then返回一个新的额promise，该promise的状态由回调函数的执行结果决定
        return new Promise((resolve, reject) => {
          // 封装判断回调的3种执行结果后，修改then返回的promise的状态和数据
          function handleThen(cb) {
            try {
              const result = cb(_this.data)
              // 判断回调执行结果是不是promise实例对象
              if (result instanceof Promise) { // 是promise实例对象
                result.then(
                  value => {
                    resolve(value)
                  },
                  reason => {
                    reject(reason)
                  }
                )
              } else { // 不是promise实例对象
                resolve(result)
              }
            } catch (error) { // 回调函数抛出错误
              reject(error)
            }
          }
          // 先指定回调
          if (_this.status === 'pending') { //先指定回调，再改promise实例对象的状态
            // 保存成功/失败的回调,并执行对应的回调
            this.callbacks.push({
              onResolved(value) {
                handleThen(onResolved)
              },
              onRejected(reason) {
                handleThen(onRejected)
              }
            })
          } else if (_this.status === 'resolved') { // 先改变promise的状态, 再指定回调
            // 3种情况
            /***
             * 1 回调执行结果出错。抛出异常
             * 2 执行结果是promist，then返回的promise状态是成功或者失败，由这个promise的执行结果决定
             * 3 执行结果不是promise，得到什么就返回什么，then返回的promise状态是成功
             */
            // 异步执行then的回调
            setTimeout(_ => {
              handleThen(onResolved)
            })
          } else { // promise状态是rejected 
            setTimeout(_ => {
              handleThen(onRejected)
            })
          }
        })
      }
      catch (onRejected) {
        // catch返回一个新的额promise，该promise的状态和数据由回调函数的执行结果决定
        return this.then(undefined, onRejected)
      }
      /***
       * 返回一个成功/失败状态的promise
       * promise对象的状态由value执行的结果决定
       * 
       */

      // 延迟指定时间执行promise
      static resolveDelay = function (value, delay) {
        return new Promise((resolve, reject) => {
          setTimeout(_ => {
            // 需要判断value是不是promise
            if (value instanceof Promise) { //是promise对象 根据promise对象的结果决定外层promise的状态
              value.then(data => {
                resolve(data)
              }, reason => {
                reject(reason)
              })
            } else { //不是promise对象 外层promise对象是成功的状态
              resolve(value)
            }
          }, delay)
        })
      }

      static resolve = function (value) {
        return new Promise((resolve, reject) => {
          // 需要判断value是不是promise
          if (value instanceof Promise) { //是promise对象 根据promise对象的结果决定外层promise的状态
            value.then(data => {
              resolve(data)
            }, reason => {
              reject(reason)
            })
          } else { //不是promise对象 外层promise对象是成功的状态
            resolve(value)
          }
        })
      }

      // 延迟指定时间执行promise
      static rejectDelay = function (reason, delay) { //reason非promise对象
        return new Promise((resolve, reject) => {
          setTimeout(_ => {
            reject(reason)
          }, delay)
        })
      }

      /***
       * 返回一个失败状态的promise
       */
      static reject = function (reason) { //reason非promise对象
        return new Promise((resolve, reject) => {
          reject(reason)
        })
      }
      /***
       * 1 接受参数是一个promise对象的数组
       * 2 每个promise实例对象都是成功的状态，Promise.all才是成功,否则它是失败的状态
       * 3 如果都成功，则返回的是个包含所有promise结果的数组，否则是最先失败的promise的reason
       * 4 返回一个promise对象
       */
      static all = function (promises) {
        // 由于promise数组如果promise都是成功的状态，那么all的结果是个数组，先准备一个数组容器
        const arr = []
        // 记录promises数组中promise状态都成功的个数
        let succCount = 0
        return new Promise((resolve, reject) => {
          promises.forEach((promise, index) => {
            // 如果是promise对象
            // 
            // 判断数组中元素是不是promise对象， 可以使用自定义的Promise.resolve()包装成promise。统一处理，这样就简便啦
            Promise.resolve(promise).then(value => {
                succCount++
                arr[index] = value
                if (succCount == arr.length) {
                  resolve(arr)
                }
              },
              reason => {
                reject(reason)
              })
          })
        })
      }
      /***
       * 1 接受参数是一个promise对象的数组
       * 2 返回最先完成的promise的结果(成功或者失败)，只返回一个promise的结果
       * 3 返回一个promise对象
       */
      static race = function (promises) {
        return new Promise((resolve, reject) => {
          promises.forEach(promise => {
            promise.then(value => {
                resolve(value)
              },
              reason => {
                reject(reason)
              }
            )
          })
        })
      }

    }
    window.Promise = Promise
  }
)(window)