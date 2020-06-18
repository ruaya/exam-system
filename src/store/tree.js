import api from '../api'

export default {
  namespaced: true,
  state: {
    manageTree: [],
    examTree: []
  },
  mutations: {
    'UPDATE_MANAGETREE'(state, data) {
      state.manageTree = data
    },
    'UPDATE_EXAMTREE'(state, data) {
      state.examTree = data
    }
  },
  actions: {
    async getManageTree({ commit }) {
      const res = await api.getCollection()
      if (res && res.code === 1) {
        let data = res.data.map(item => {
          return {
            id: item._id,
            text: item.name,
            children: item._papers.map(paper => {
              return {
                id: paper._id,
                text: paper.name,
                state: 'closed'
              }
            })
          }
        })
        commit('UPDATE_MANAGETREE', data)
      }
    },
    async getExamTree({ commit }) {
      const res = await api.getExam()
      if (res && res.code === 1) {
        let data = res.data.list.map(exam => {
          return {
            id: exam._id,
            text: exam.name
          }
        })
        commit('UPDATE_EXAMTREE', data)
      }
    }
  }
}