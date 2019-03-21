<template>
  <div class="home">
    <ul class="HomeList">
      <li>
        <router-link to="/">全部</router-link>
      </li>
      <li>
        <router-link to="/?tab=good">精华</router-link>
      </li>
      <li>
        <router-link to="/?tab=share">分享</router-link>
      </li>
      <li>
        <router-link to="/?tab=ask">问答</router-link>
      </li>
      <li>
        <router-link to="/?tab=job">招聘</router-link>
      </li>
    </ul>
    <router-view :key="$route.path"></router-view>
  </div>
</template>
<script>
export default {
  name: "home",
  computed: {}
};
</script>
<style >
.home {
  width: 960px;
  background-color: #fff;
}
.HomeList {
  list-style: none;
  padding-left: 0;
  margin: 0;
  display: flex;
  height: 40px;
  background-color: #f6f6f6;
  align-items: center;
  padding-left: 10px;
}
.HomeList > li {
  width: 60px;
  text-align: center;
  display: flex;
}
.HomeList > li > a {
  color: #71777c;
  text-decoration: none;
}
.HomeList > li > a.router-link-exact-active {
  color: #007fff;
}
</style>
