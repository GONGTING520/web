<template>
    <transition name="fade">
        <v-touch :style="photoStyle" class="layup" @tap="tap" @swipeleft="swipeLeft" @swiperight="swipeRight"></v-touch>
    </transition> 
</template>

<script>
import store from "@/vuex/store.js";

export default {
  data() {
    return {
      index: 0
    };
  },
  computed: {
    photoStyle() {
      return {
        background: `#000 url(${
          this.$store.state.photoList[this.index].srcBig
        }) no-repeat center/contain`
      };
    }
  },
  created() {
    this.index = this.$route.params.index;
  },
  store,
  methods: {
    tap() {
      this.$router.go(-1);
    },
    swipeLeft() {
      this.index++;
      if (this.index == this.$store.state.photoList.length) {
        this.index = 0;
      }
    },
    swipeRight() {
      this.index--;
      if (this.index == -1) {
        this.index = this.$store.state.photoList.length - 1;
      }
    }
  }
};
</script>

<style scoped>
.layup {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: all 0.5s ease;
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
