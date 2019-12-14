import Vue from 'vue'
import Vuex from 'vuex'

import user from './module/user'
import app from './module/app'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //
    moreMenuId: '', // 用于控制当前更多菜单的显示位置
    currentMenuId: '',
    refresh: 1 // 控制页面局部刷新
  },
  mutations: {
    //
  },
  actions: {
    //
  },
  modules: {
    user,
    app
  }
})
