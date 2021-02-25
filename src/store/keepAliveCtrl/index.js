import { dataParams } from '../../assets/utils'

const state = {
  includeArr: [],
  redis: {}
}
const getters = {
  get_includeArr: state_ => state_.includeArr,
  get_redis: state_ => state_.redis
}

const mutations = {
  setIncludeArr (state_, data) {
    state_.includeArr = data
  },

  set_RedisKey (state_, data) {
    if ('key' in data && 'value' in data && data.key && data.value) {
      var value = JSON.stringify(data.value)
      state_.redis[data.key] = value
    }
  },

  remove_RedisKey (state_, key) {
    var redis = state_.redis
    if (key && key in redis) {
      delete redis[key]
    }
  }
}
const actions = {
  // 添加路由缓存中，不存在的路由页面
  addRoute ({ commit, state }, data) {
    const includeArr = dataParams(state.includeArr)
    if (includeArr.length >= 0 && typeof data === 'string') {
      if (!includeArr.includes(data)) {
        includeArr.push(data)
        commit('setIncludeArr', includeArr)
      }
    }
  },

  // 移除指定的路由页面
  removeTargetRoute ({ commit, state }, data) {
    const includeArr = dataParams(state.includeArr)
    if (includeArr.length >= 0 && typeof data === 'string' && includeArr.includes(data)) {
      includeArr.splice(includeArr.indexOf(data), 1)
      commit('setIncludeArr', includeArr)
    }
  },

  // 移除所有缓存的路由页面，除了某一个
  removeAllElse ({ commit, state }, data) {
    if (!data) console.log('请输入页面name值')
    commit('setIncludeArr', data instanceof Array ? data : [data])
  },

  //   移除所有已缓存的路由页面
  removeAllRoute ({ commit, state }, data) {
    commit('setIncludeArr', [])
  },

  addRedisKey ({ commit }, data) {
    commit('set_RedisKey', data)
  },

  removeRedisKey ({ commit }, data) {
    commit('remove_RedisKey', data)
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
