import store from '../store'

function elCtrl (elString) {
  if (!elString) return null
  if (typeof elString === 'string') return [elString]
  if (Array.isArray(elString)) {
    if (elString.some(item => typeof item !== 'string' || item === '')) {
      return null
    }
    return elString
  }
  return null
}

export default function (elString) {
  const elArr = elCtrl(elString)
  if (!elArr) return {}
  const elRedis = {}
  return {
    beforeRouteEnter (to, from, next) {
      const includeArr = store.getters.get_includeArr
      if (to.name && to.meta && to.meta._keepAlive_) {
        if (includeArr.indexOf(to.name) === -1) {
          store.dispatch('removeRedisKey', to.name)
          store.dispatch('addRoute', to.name)
        }
      }
      next()
    },
    activated () {
      const redis = store.getters.get_redis
      this.__name__ = this.$route.name
      let redisXY = null
      if (redis[this.__name__]) redisXY = JSON.parse(redis[this.__name])
      if (this.__name__) {
        elArr.forEach(item => {
          const elList = this.$el.querySelectorAll(item) || []
          elList.forEach((el, index) => {
            if (el) elList[item + index] = el
            if (el && redisXY && redis[item + index]) {
              const elXY = redisXY[item + index].split(',')
              this.$nextTick(() => {
                el.scrollTo(elXY[0] || 0, elXY[1] || 0)
              })
            }
          })
        })
      }
    },
    beforeRouteLeave (to, from, next) {
      if (this.__name__) {
        const obj = {}
        if (Object.keys(elRedis).length !== 0) {
          for (const item in elRedis) {
            obj[item] = `${elRedis[item].scrollLeft},${elRedis[item].scrollTop}`
          }
          store.dispatch('addRedisKey', { key: this.__name__, value: obj }).then(() => {
            next()
          })
        } else next()
      } else next()
    }
  }
}
