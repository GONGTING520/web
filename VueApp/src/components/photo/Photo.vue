<template>
  <div class="container">
    <ul class="clearfix">
      <li class="img-li" @click="$router.push(`/photo/photodetail/${obj.id}`)" v-for="obj in photoList" :key="obj.id" :style="{background: 'url(' + obj.src + ') no-repeat center/cover'}"></li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import store from "@/vuex/store.js";

export default {
  data() {
    return {
      photoList: []
    };
  },
  store,
  created() {
    axios
      .get("static/json/photo.json")
      .then(res => {
        this.photoList = Array.from(res.data);
        this.$store.commit("setPhoto", Array.from(res.data));
      })
      .catch(() => {
        console.log("error");
      });
  }
};
</script>

<style scoped>
.img-li {
  width: 50%;
  padding-top: 50%;
  float: left;
}
</style>
