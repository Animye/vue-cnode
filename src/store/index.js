import Vue from 'vue'
import Vuex from 'vuex'
import topics from './topics'
import login from './login'
import user from './user'
Vue.use(Vuex)
const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    topics,
    login,
    user
  }
})
export default store
