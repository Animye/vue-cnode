<template>
  <div v-if="id" class="personal">
    <div>
      <h2>
        <span>作者信息</span>
      </h2>
      <div v-if="topic" class="PersonalTop">
        <router-link :to="`/user/${topic.author.loginname}`">
          <img
            :src="topic.author.avatar_url"
            alt
            :style="{ width: '48px', marginLeft: 20, marginRight: 20 }"
          >
        </router-link>
        <span>{{topic.author.loginname}}</span>
      </div>

      <div v-else></div>
    </div>
  </div>
  <div v-else class="personal">
    <div v-if="isLogin">
      <h2>
        <span>个人信息</span>
      </h2>
      <div v-if="user">
        <div class="PersonalTop">
          <router-link :to="`/user/${user.loginname}`">
            <img
              :src="user.avatar_url"
              alt
              :style="{ width: '48px', marginLeft: 20, marginRight: 20 }"
            >
          </router-link>
          <span>{{user.loginname}}</span>
        </div>
        <p :style="{ marginLeft: 20 }">积分：{{user.score}}</p>
        <router-link to="/topics/create" class="release">发布话题</router-link>
      </div>
      <div v-else>无信息</div>
    </div>
    <div v-else>请登录</div>
  </div>
</template>
<script>
export default {
  name: "personal",
  data: () => ({}),
  computed: {
    topic() {
      return this.$store.state.topics.topic;
    },
    isLogin() {
      return this.$store.state.login.isLogin;
    },
    user() {
      return this.$store.state.user.user;
    },
    id() {
      return this.$route.params.id;
    }
  },
  methods: {
    getPersonal() {
      if (this.$store.state.login.userInfo) {
        const { loginname } = this.$route.params;
        if (!loginname) {
          const personal = this.$store.state.login.userInfo.loginname;

          this.$store.dispatch("getUser", personal);
        }
      }
    }
  },
  created() {
    this.getPersonal();
  },
  watch: {
    "$route.params.loginname"() {
      this.getPersonal();
    },
    "$store.state.login.userInfo"() {
      this.getPersonal();
    }
  }
};
</script>
<style lang="scss" scoped>
.personal {
  background-color: #fff;
  width: 290px;
  height: 350px;
  margin-left: 20px;
  padding: 0;
}

.PersonalTop {
  display: flex;
  align-items: center;
}
.PersonalTop a {
  color: #758087;
}
h2 {
  line-height: 40px;
  background-color: #f6f6f6;
  font-size: 13px;
  margin: 0;
  color: #626262;
  margin-bottom: 20px;
}
h2 span {
  margin-left: 20px;
}
.release {
  color: #fff;
  background-color: #6ac000;
  margin-left: 20px;
  width: 90px;
  line-height: 34px;
  display: block;
  text-align: center;
  border-radius: 5px;
  transition: all 0.5s;
  :hover {
    background-color: #00c068;
  }
}
</style>
