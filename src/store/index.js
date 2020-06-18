import Vue from "vue";
import Vuex from "vuex";
import api from '../api'
import tree from './tree'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    login: false,
    posting: false,
    user: {
      _id: '',
      authAccount: '',
      name: ''
    }
  },
  mutations: {
    'AUTH_LOGIN'(state) {
      state.login = true
    },
    'AUTH_LOGIN_END'(state) {
      state.login = false
    },
    'AUTH_INFO'(state, user) {
      state.user = user
    },
    'POSTING_AUTH'(state) {
      state.posting = false
    },
    'POSTING_AUTH_END'(state) {
      state.posting = true
    }
  },
  actions: {
    async login({ commit }, params) {
      commit('AUTH_LOGIN')
      const res = await api.login(params)
      if (res && res.code === 1) {
        localStorage.setItem('TOKEN', JSON.stringify(res.data))
        alert(res.message)
      } else alert(res.message)
      commit('AUTH_LOGIN_END')

      return res
    },
    // 获取用户信息
    async getAuth({ commit }) {
      const auth = await api.getAuth()
      if (auth && auth.code === 1) {
        commit('AUTH_INFO', auth.data)
      } else alert(auth.message)
    },
    // 修改用户信息
    async editAuth({ commit }, params) {
      commit('POSTING_AUTH')
      const res = await api.putAuth({ ...params })
      if (res && res.code === 1) alert(res.message)
      else alert(res.message)
      commit('POSTING_AUTH_END')
    }
  },
  modules: {
    tree
  }
});
