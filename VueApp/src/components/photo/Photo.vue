<template>
  <div class="container">
    <ul>
      <li class="imgLi" @click="obj.isShowBig=true" v-for="obj in arr" :style="{background: 'url(' + obj.src + ') no-repeat center/cover'}">
        <div class="layup" v-show="obj.isShowBig" @click.stop="obj.isShowBig = false">
          <img :src="obj.srcBig" alt="">
        </div>      
      </li>
    </ul>
  </div>
</template>

<script>
import commonHeader from "@/components/common/Header";
import commonFooter from "@/components/common/Footer";
export default {
  data() {
    return {
      arr: [
        {
          src: require("@/assets/img/1.jpg"),
          srcBig: require("@/assets/img/bigImg/1.jpg"),
          isShowBig: false
        },
        {
          src: require("@/assets/img/2.jpg"),
          srcBig: require("@/assets/img/bigImg/2.jpg"),
          isShowBig: false
        },
        {
          src: require("@/assets/img/3.jpg"),
          srcBig: require("@/assets/img/bigImg/3.jpg"),
          isShowBig: false
        },
        {
          src: require("@/assets/img/4.jpg"),
          srcBig: require("@/assets/img/bigImg/4.jpg"),
          isShowBig: false
        },
        {
          src: require("@/assets/img/5.jpg"),
          srcBig: require("@/assets/img/bigImg/5.jpg"),
          isShowBig: false
        },
        {
          src: require("@/assets/img/6.jpg"),
          srcBig: require("@/assets/img/bigImg/6.jpg"),
          isShowBig: false
        },
        {
          src: require("@/assets/img/7.jpg"),
          srcBig: require("@/assets/img/bigImg/7.jpg"),
          isShowBig: false
        },
        {
          src: require("@/assets/img/8.jpg"),
          srcBig: require("@/assets/img/bigImg/8.jpg"),
          isShowBig: false
        },
        {
          src: require("@/assets/img/9.jpg"),
          srcBig: require("@/assets/img/bigImg/9.jpg"),
          isShowBig: false
        }
      ],
      isScorll: true
    };
  },
  components: {
    commonHeader,
    commonFooter
  },
  methods: {
  }
};
</script>

<style scoped>
.imgLi {
  width: 50%;
  padding-top: 50%;
  float: left;
}
.imgLi .layup {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #000;
}
.imgLi .layup img {
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  width: 100%;
}
</style>
