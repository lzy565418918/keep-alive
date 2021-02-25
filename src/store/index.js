import Vue from 'vue'
import Vuex from 'vuex'
import keepAliveCtrl from './keepAliveCtrl'

Vue.use(Vuex)

export default new Vuex.Store(keepAliveCtrl)
