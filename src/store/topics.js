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
    },
    collect(state, collect) {
      state.topic.is_collect = collect
      const newTopic = { ...state.topic }
      newTopic.is_collect = !newTopic.is_collect
    }
  },
  actions: {
    getTopics({ commit }, { ind, query }) {
      axios
        .get(`https://cnodejs.org/api/v1/topics?${query}&page=${ind}`)
        .then(res => {
          commit('getTopics', res.data.data)
        })
    },
    getTopic({ commit }, id) {
      axios.get(`https://cnodejs.org/api/v1/topic/${id}`).then(res => {
        commit('getTopic', res.data.data)
      })
    },
    collect({ commit, state }, id) {
      const token = sessionStorage.token
      const is_collect = state.topic.is_collect

      axios
        .post(
          `https://cnodejs.org/api/v1/topic_collect/${
            is_collect ? 'de_collect' : 'collect'
          }`,
          {
            accesstoken: token,
            topic_id: id
          }
        )
        .then(() => {
          commit('collect')
        })
    }
  }
}
export default topics
