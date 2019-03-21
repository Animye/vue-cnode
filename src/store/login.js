import axios from 'axios'
const login = {
  state: {
    userInfo: null,
    isLogin: false
  },
  mutations: {
    getUserInfo(state, userInfo) {
      state.userInfo = {
        loginname: userInfo.loginname,
        avatar_url: userInfo.avatar_url
      }
    },
    logout(state, userInfo1) {
      state.userInfo = userInfo1
    },
    isLogin(state, isLogin) {
      state.isLogin = isLogin
    }
  },
  actions: {
    getUserInfo({ commit }, { token }) {
      axios
        .post('https://cnodejs.org/api/v1/accesstoken', {
          accesstoken: token
        })
        .then(res => {
          sessionStorage.loginname = res.data.loginname
          sessionStorage.avatar_url = res.data.avatar_url
          sessionStorage.token = token
          sessionStorage.id = res.data.id
          commit('getUserInfo', res.data)
        })
        .catch(() => {
          alert('请输入正确的')
        })
    },
    logout({ commit }) {
      commit('logout', null)
    },
    isLogin({ commit }, n) {
      commit('isLogin', n)
    }
  }
}
export default login
