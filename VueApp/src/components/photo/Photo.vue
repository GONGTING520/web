<template>
  <div class="container">
    <ul class="clearfix">
      <li class="img-li" @click="$router.push(`/photo/photodetail/${obj.id}`)" v-for="obj in photoList" :key="obj.id" :style="{background: 'url(' + obj.src + ') no-repeat center/cover'}"></li>
    </ul>
    <div class="loading" v-show="isLoading"></div>
  </div>
</template>

<script>
import axios from "axios";
import store from "@/vuex/store.js";

export default {
  data() {
    return {
      photoList: [],
      isLoading: true
    };
  },
  store,
  created() {
    setTimeout(() => {
      axios
        .get("static/json/photo.json")
        .then(res => {
          this.photoList = Array.from(res.data);
          this.$store.commit("setPhoto", Array.from(res.data));
          this.isLoading = false;
        })
        .catch(() => {
          console.log("error");
        });
    }, 1000);
  }
};
</script>

<style scoped>
.img-li {
  width: 50%;
  padding-top: 50%;
  float: left;
}
.container .loading {
  position: absolute;
  top: 1rem;
  bottom: 1rem;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.8) url(/static/img/loadingImg.gif) no-repeat
    center/50%;
}
</style>
