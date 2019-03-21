import axios from 'axios'
const user = {
  state: {
    user: null
  },
  mutations: {
    getUser(state, user) {
      state.user = user
    }
  },
  actions: {
    getUser({ commit }, loginname) {
      axios.get(`https://cnodejs.org/api/v1/user/${loginname}`).then(res => {
        commit('getUser', res.data.data)
      })
    }
  }
}
export default user
