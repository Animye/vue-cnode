<template>
  <div v-if="topics.length">
    <ul class="topics">
      <li v-for="topic in topics" :key="topic.id">
        <router-link :to="`/user/${topic.author.loginname}`">
          <img :src="topic.author.avatar_url" alt>
        </router-link>
        <span class="count">
          <span title="回复数">{{topic.reply_count}}</span>/
          <span title="阅读量">{{topic.visit_count}}</span>
        </span>
        <span v-if="topic.top" class="top">
          <span>置顶</span>
        </span>
        <span v-else></span>
        <router-link :to="`/topic/${topic.id}`" class="text">
          <span class="title">{{topic.title}}</span>
        </router-link>
        <span class="time">{{ $moment(topic.last_reply_at).fromNow()}}</span>
      </li>
    </ul>
  </div>
  <div v-else>请稍等。。</div>
</template>
<script>
export default {
  name: "topics",
  methods: {
    getTopics(tab) {
      const query = this.isSearch
        ? `title_like=${this.$route.query.query}`
        : `tab=${tab}`;
      this.$store.dispatch("getTopics", query);
    }
  },
  computed: {
    topics() {
      return this.$store.state.topics.topics;
    },
    tab() {
      const { tab } = this.$route.query;
      return tab ? tab : "all";
    },
    isSearch() {
      return this.$route.path.indexOf("search") !== -1;
    }
  },
  created() {
    this.getTopics(this.tab);
  },
  watch: {
    "$route.query.tab"() {
      this.getTopics(this.tab);
    }
  }
};
</script>
<style lang="scss" scoped>
.topics {
  padding-left: 0;
}
.topics > li {
  width: 100%;
  cursor: pointer;
  height: 50px;
  display: flex;
  align-items: center;
  list-style: none;
  border: 1px solid #f0f0f0;
  :hover {
    background-color: #f6f6f6;
  }
}
.text {
  display: flex;
  flex-grow: 1;
  color: #333333;
  font-size: 16px;
  justify-content: space-between;
  :hover {
    text-decoration: underline;
  }
}
.text > .title {
  text-align: left;
  width: 700px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.text > .time {
  width: 75px;
  text-align: right;
  color: #888;
  margin-right: 20px;
}
img {
  width: 30px;
  border-radius: 3px;
  margin-left: 8px;
  flex-shrink: 0;
}
.count {
  width: 70px;
  font-size: 12px;
  margin-left: 10px;
  flex-shrink: 0;
  text-align: center;
}
.top {
  padding: 2px;
  background-color: #80bd01;
  color: #fff;
  flex-shrink: 0;
  font-size: 12px;
  margin-right: 8px;
  border-radius: 4px;
}
</style>