<template>
  <div style="{backgroundColor:' #e1e1e1'}">
    <Header :isLogin="isLogin"/>
    <Main/>
  </div>
</template>
<script>
import Header from "./components/Header";
import Main from "./components/Main";
export default {
  name: "app",
  components: { Header, Main },
  data: () => ({
    isLogin: false
  }),
  created() {
    const { loginname, avatar_url } = sessionStorage;
    this.isLogin = loginname && avatar_url ? true : false;
  }
  // ,
  // methods: {
  //   setLogin(bool) {
  //     this.isLogin = bool;
  //   }
  // }
};
</script>
<style>
</style>