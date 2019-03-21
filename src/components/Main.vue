<template>
  <div class="main">
    <router-view></router-view>
    <Personal/>
  </div>
</template>
<script>
import Personal from "./Personal";
export default {
  name: "ma",
  components: { Personal }
};
</script>
<style>
.main {
  display: flex;
  width: 1282px;
  margin: 20px auto 0;
}
</style>
