// 序列化参数
export function dataParams (obj) {
  if (typeof obj === 'string') return obj
  if (obj !== null && typeof obj === 'object') {
    return JSON.parse(JSON.stringify(obj))
  }
  return ''
}
