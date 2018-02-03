<template>
  <div class="container">
    <ul class="clearfix">
      <li class="img-li" @click="iNow=obj.id" v-for="obj in photoList" :key="obj.id" :style="{background: 'url(' + obj.src + ') no-repeat center/cover'}">
        <transition name="fade">
          <div class="layup" v-show="obj.id===iNow" @click.stop="iNow=-1">
            <img :src="obj.srcBig">            
          </div>
        </transition>   
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      photoList: [],
      isScorll: true,
      iNow: -1
    };
  },
  methods: {},
  created() {
    axios
      .get("static/json/photo.json")
      .then(res => {
        this.photoList = Array.from(res.data);
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
.img-li .layup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #000;
}
.img-li .layup img {
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  width: 100%;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave {
  opacity: 1;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>
