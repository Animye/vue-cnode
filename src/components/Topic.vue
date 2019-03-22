<template>
  <div>
    <div v-if="topic">
      <h2>{{topic.title}}</h2>
      <span>·作者{{topic.author.loginname}} ·来自{{topic.tab}}</span>
      <div v-if="isLogin">
        <button
          @click="collect"
          :style="{color: '#fff',backgroundColor: '#6ac000',width:'90px',lineHeight:'30px',fontSize:'16px',float:'right',display:'block',outline:0,
  cursor: 'pointer'}"
        >{{topic.is_collect ? '取消收藏' : '收藏'}}</button>
        {{topic.is_collect}}
      </div>
      <div v-else></div>
      <div class="topicContent" v-html="topic.content"></div>
      <div>
        <h3>评论</h3>
        <ul :style="{ padding: 0 }">
          <li
            v-for="replie in topic.replies"
            :key="replie.id"
            :style="{ listStyle: 'none' ,lineHeight:'40px'}"
          >
            <router-link :to="`/user/${replie.author.loginname}`">
              <img
                :src="replie.author.avatar_url"
                alt
                :style="{ width: '30px',marginRight:'10px' }"
              >
            </router-link>
            <span>{{replie.author.loginname}}</span>
            <div :style="{float:'right'}">
              <button @click="ups(replie.id)">点赞</button>
              <span>点赞数：{{replie.ups.length}}</span>
              <button @click="showArea(replie.id, replie.author.loginname)">回复</button>
            </div>
            <p v-html="replie.content" class="pinglun" :style="{textIndent:'36px'}"></p>
            <div v-if="replie.isShowArea">
              <textarea v-model="otherComment"/>
              <button @click="addOtherComment(replie.id)">回复</button>
            </div>
            <div v-else></div>
          </li>
        </ul>
        <div v-if="token">
          <h4>添加回复</h4>
          <textarea v-model="comment" :style="{width:'100%',height:'90px'}"/>
          <button
            @click="addComment"
            :style="{color: '#fff',backgroundColor: '#0089d1',outline:0,cursor: 'pointer',width:'80px',lineHeight:'30px',display:'block'}"
          >回复</button>
        </div>
        <div v-else></div>
      </div>
    </div>
    <div v-else>请稍等。。。。</div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "topic",
  data: () => ({
    otherComment: "",
    comment: "",
    token: null
  }),
  computed: {
    topic: {
      get: function() {
        return this.$store.state.topics.topic;
      },
      set: function() {}
    },
    isLogin() {
      return this.$store.state.login.isLogin;
    }
  },

  created() {
    this.token = sessionStorage.token;
    const { id } = this.$route.params;
    this.$store.dispatch("getTopic", id);
    // axios.get(` https://cnodejs.org/api/v1/topic/${id}`).then(res => {
    //   res.data.data.replies = res.data.data.replies.map(e => {
    //     e.isShowArea = false;
    //     return e;
    //   });
    //   this.topic = res.data.data;
    // });
  },
  methods: {
    addComment() {
      axios
        .post(`https://cnodejs.org/api/v1//topic/${this.topic.id}/replies`, {
          accesstoken: this.token,
          content: this.comment
        })
        .then(() => {
          this.comment = "";
        });
    },
    addOtherComment(id) {
      axios
        .post(`https://cnodejs.org/api/v1/topic/${this.topic.id}/replies`, {
          accesstoken: this.token,
          content: this.otherComment,
          reply_id: id
        })
        .then(() => {
          this.otherComment = "";
        });
    },
    showArea(id, loginname) {
      const newTopic = { ...this.topic };
      if (newTopic.replies.find(e => e.isShowArea === true)) {
        newTopic.replies.find(e => e.isShowArea === true).isShowArea = false;
      }
      newTopic.replies.find(e => e.id === id).isShowArea = true;
      (this.topic = newTopic), (this.otherComment = `@${loginname} `);
    },
    ups(id) {
      axios
        .post(`https://cnodejs.org/api/v1/reply/${id}/ups`, {
          accesstoken: this.token
        })
        .then(res => {
          const userId = sessionStorage.id;
          const newTopic = { ...this.topic };
          if (res.data.action === "up") {
            newTopic.replies.find(e => e.id === id).ups.push(userId);
          } else {
            newTopic.replies.find(e => e.id === id).ups = newTopic.replies
              .find(e => e.id === id)
              .ups.filter(e => e !== userId);
          }

          this.topic = newTopic;
        });
    },
    collect() {
      const { id } = this.$route.params;
      this.$store.dispatch("collect", id);

      // const is_collect = this.topic.is_collect;
      // axios
      //   .post(
      //     `https://cnodejs.org/api/v1/topic_collect/${
      //       is_collect ? "de_collect" : "collect"
      //     }`,
      //     {
      //       accesstoken: this.token,
      //       topic_id: id
      //     }
      //   )
      //   .then(() => {
      //     const newTopic = { ...this.topic };
      //     newTopic.is_collect = !newTopic.is_collect;
      //     console.log(is_collect);
      //   });
    }
  },
  watch: {
    //  "$route.query.tab"() {
    //   this.getTopics(this.tab);
    // }
  }
};
</script>
<style >
.topicContent {
  width: 960px;
  background-color: #fff;
  padding: 0 20px;
}
.topicContent img {
  width: 90%;
}
.topicContent p {
  text-indent: 32px;
}
.topicContent p a {
  display: block;
  width: 960px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.pinglun img {
  width: 100px;
}
.pinglun p {
  width: 860px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>