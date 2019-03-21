<template>
  <div class="wrap">
    <div class="userTop">
      <router-link to="/">主页</router-link>
      <span>/</span>
    </div>
    <div class="userMain" v-if="user">
      <div>
        <img :src="user.avatar_url" :style="{ width: '48px' }">
        
        <span>{{user.loginname}}</span>
      </div>
      <p>{{user.score}} 积分</p>
      <p>{{user.recent_topics.length}} 个话题收藏</p>
    </div>
    <div v-if="user">
      <div class="found">
        <h3>最新创建的话题</h3>
        <ul v-for="topic in user.recent_topics" :key="topic.id" class="all">
          <li>
            <router-link :to="`/user/${topic.author.loginname}`">
              <img :src="topic.author.avatar_url" :style="{ width: '30px' }">
            </router-link>
            <router-link :to="`/topic/${topic.id}`">{{topic.title}}</router-link>
          </li>
        </ul>
      </div>
      <div class="join">
        <h3>最近参与的话题</h3>
        <ul v-for="replie in user.recent_replies" :key="replie.id" class="all">
          <li>
            <router-link :to="`/user/${replie.author.loginname}`">
              <img :src="replie.author.avatar_url" :style="{ width: '30px' }">
            </router-link>
            <router-link :to="`/topic/${replie.id}`">{{replie.title}}</router-link>
          </li>
        </ul>
      </div>
    </div>
    <div v-else>无话题</div>
  </div>
</template>
<script>
export default {
  name: "user",
  data: () => ({}),
  computed: {
    user() {
      return this.$store.state.user.user;
    }
  },
  methods: {
    getUser() {
      const { loginname } = this.$route.params;
      this.$store.dispatch("getUser", loginname);
    }
  },
  created() {
    this.getUser();
  },
  watch: {
    "$route.params.loginname"() {
      this.getUser();
    }
  }
};
</script>
<style >
.wrap {
  width: 960px;
  background-color: #e1e1e1;
}
.userTop {
  background-color: #f6f6f6;
}
.userTop a {
  line-height: 40px;
  color: #6ec000;
  margin-left: 20px;
}
.userTop span {
  color: #6ec000;
}
.userMain {
  padding-left: 20px;
  padding-top: 20px;
  margin-bottom: 20px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
}
.userMain div {
  display: flex;
  height: 50px;
  align-items: center;
}
.userMain div img {
  margin-right: 20px;
}
.userMain div span {
  margin-bottom: 20px;
}
h3 {
  background-color: #f6f6f6;
  line-height: 40px;
  color: #626262;
  font-weight: 100;
  padding-left: 20px;
  font-size: 14px;
  margin: 0;
}
.found {
  background-color: #fff;
}
.join {
  background-color: #fff;
}
.all {
  display: flex;
  flex-direction: column;
  padding: 0;
}
.all > li {
  list-style: none;
  text-decoration: none;
  display: flex;
  height: 50px;
  align-items: center;
  border: 1px solid #f0f0f0;
}
.all > li > a {
  color: #0095d6;
  margin-left: 20px;
}
</style>

