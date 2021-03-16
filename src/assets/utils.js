const _toString = Object.prototype.toString // IE浏览器的toString.call会报错，用Object的来兼容

// 判断对象是否为空
export function isEmptyObject (obj) {
  if (_toString.call(obj) === '[object Object]') return Object.keys(obj).length === 0
  return false
}

function getType (num) {
  const num_ = Number(num)
  if (typeof num_ === 'boolean' || isNaN(num_)) return true
  return false
}

// 四舍五入
export function _toFixed_ (num, fixedNum) {
  if (getType(num) || getType(fixedNum)) return ''
  const isNegative = Number(num) < 0 ? '-' : ''
  const num_ = Math.abs(Number(num))
  const toFixedNum = parseInt(fixedNum, 0)
  let over0 = '0.'
  let i = 0
  let numFloat
  let num__
  if (toFixedNum < 0 || toFixedNum > 20) return ''
  const isFloatNum = num_.toString().indexOf('.') !== -1
  if (isFloatNum) numFloat = num_.toString().split('.')[1]
  if (isFloatNum && numFloat && numFloat.length > toFixedNum) {
    const numArr = numFloat.toString().split('')
    numArr[toFixedNum] = numArr[toFixedNum] === '5' ? '6' : numArr[toFixedNum]
    num__ = `${Number(num_.toString().split('.')[0])}.${numArr.join('')}`
  }
  while (i < toFixedNum) {
    over0 += '0'
    i++
  }
  const returnNum = Number(num__ || num_).toFixed(toFixedNum)
  return returnNum === over0 ? '0' : isNegative + returnNum
}

// 序列化参数
export function dataParams (obj) {
  if (typeof obj === 'string') return obj
  if (obj !== null && typeof obj === 'object') {
    return JSON.parse(JSON.stringify(obj))
  }
  return ''
}

// 防抖函数
export function debounce (fn, wait) {
  let timers = null
  return (key) => {
    if (timers != null) clearTimeout(timers)
    timers = setTimeout(() => {
      timers = null
      if (fn) fn(key)
    }, wait)
  }
}

// 深拷贝
export function deepClone (obj) {
  let objClone = Array.isArray(obj) ? [] : {}
  if (obj && typeof obj === 'object') {
    if (obj instanceof Array) {
      objClone = obj.slice(0)
    } else {
      Object.keys(obj).forEach((k) => {
        if (obj[k] && typeof obj[k] === 'object') {
          objClone[k] = deepClone(obj[k])
        } else {
          objClone[k] = obj[k]
        }
      })
    }
  }
  return objClone
}

//  添加百分号
export function addPercent (obj) {
  if (typeof obj === 'undefined' || obj === null || obj === '') {
    return ''
  }
  return `${obj}%`
}

//  处理空字符、null、undefined
export function handleNullStr (obj) {
  if (typeof obj === 'undefined' || obj === null || obj === '') {
    return ''
  }
  return obj
}

// 金额格式化 1000 => 1,000.00
export function formatMoney (val) {
  if (typeof val === 'string' && val.length === 0) {
    return ''
  }
  // const str = `${(Math.floor(val * 10000) / 10000).toFixed(2)}`;
  const str = `${_toFixed_(Math.floor(val * 10000) / 10000, 2)}`
  const intSum = str.substring(0, str.indexOf('.')).replace(/\B(?=(?:\d{3})+$)/g, ',')// 取整数部分
  const dot = str.substring(str.length, str.indexOf('.'))// 取小数部分
  const ret = intSum + dot
  return ret
}

// 日期格式化 new Date() => 2020-01-02
export function getDateStr (date) {
  if (!(date instanceof Date)) return -1
  const year = date.getFullYear()
  let month = date.getMonth() + 1
  let strDate = date.getDate()
  if (month >= 1 && month <= 9) {
    month = `0${month}`
  }
  if (strDate >= 1 && strDate <= 9) {
    strDate = `0${strDate}`
  }
  return `${year}${month}${strDate}`
}
