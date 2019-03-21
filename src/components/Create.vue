<template>
  <div class="create">
    <div class="createTop">
      <router-link to="/">主页</router-link>
      <span>/ 发布话题</span>
    </div>
    <div>
      <span>选择板块：</span>
      <select :style="{ width: 220, height: 30 }">
        <option value selected>请选择</option>
        <option value>分享</option>
        <option value>问答</option>
        <option value>招聘</option>
        <option value>客户端测试</option>
      </select>
    </div>
    <input class="title" type="text" v-model="title" placeholder="标题字数十字以上">
    <textarea class="content" v-model="content"/>
    <button class="up" @click="add">提交</button>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "creat",
  data: () => ({
    title: "111",
    content: "",
    token: "5331e48f-1f71-4511-ad10-a3c2a6ee758a",
    tab: "dev"
  }),
  methods: {
    add() {
      axios
        .post("https://cnodejs.org/api/v1/topics", {
          accesstoken: this.token,
          title: this.title,
          tab: this.tab,
          content: this.content
        })
        .then(() => {});
    }
  }
};
</script>
<style lang="scss" scoped>
.create {
  width: 960px;
  height: 100vh;
  background-color: #fff;
}

.createTop {
  background-color: #f6f6f6;
}
.createTop a {
  line-height: 40px;
  color: #6ec000;
  margin-left: 20px;
}
.createTop span {
  color: #6ec000;
}
.title {
  display: block;
  font-size: 14px;
  width: 98%;
  line-height: 28px;
  outline: 0;
  border-radius: 4px;
  margin: 20px 0;
  text-indent: 28px;
  border: 1px solid #dfdfdf;
}
.content {
  width: 98%;
  height: 400px;
  outline: 0;
  resize: none;
}
.up {
  margin-top: 50px;
  margin-left: 20px;
  font-size: 16px;
  width: 80px;
  line-height: 40px;
  color: #fff;
  transition: all 0.5s;
  border-radius: 6px;
  background-color: #0089d1;
  :hover {
    background-color: #0053d4;
  }
}
</style>
