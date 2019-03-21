import axios from 'axios'
const topics = {
  state: {
    topics: [],
    topic: null
  },
  mutations: {
    getTopics(state, topics) {
      state.topics = topics
    },
    getTopic(state, topic) {
      state.topic = topic
    }
  },
  actions: {
    getTopics({ commit }, query) {
      axios.get(`https://cnodejs.org/api/v1/topics?${query}`).then(res => {
        commit('getTopics', res.data.data)
      })
    },
    getTopic({ commit }, id) {
      axios.get(`https://cnodejs.org/api/v1/topic/${id}`).then(res => {
        commit('getTopic', res.data.data)
      })
    }
  }
}
export default topics
