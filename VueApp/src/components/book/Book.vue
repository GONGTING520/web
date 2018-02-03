<template>
    <div class="container">
      <transition-group tag="ul" class="imgs" :name="animateStyle">
          <li @touchstart="moveStart" @touchend="moveEnd" v-show="item.id==iNow" v-for="item in bookList" :key="item.id">
              <img :src="item.srcBig">
          </li>
      </transition-group>
      <ul class="index">
        <li @click="iNow=index" :class="{selected:index==iNow}" v-for="(item, index) in bookList.length" v-text="item" :key="index"></li>
      </ul>
    </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      bookList: [],
      iNow: 0,
      timer: null,
      beforeLeft: 0,
      afterLeft: 0,
      animateStyle: "slide"
    };
  },
  created() {
    axios
      .get("static/json/book.json")
      .then(res => {
        this.bookList = Array.from(res.data);
      })
      .catch(() => {
        console.log("error");
      });
  },
  mounted() {
    this.play();
  },
  methods: {
    play() {
      this.timer = setInterval(() => {
        this.animateStyle = "slide";
        this.iNow++;
        if (this.iNow == this.bookList.length) {
          this.iNow = 0;
        }
      }, 3000);
    },
    stop() {
      clearInterval(this.timer);
    },
    moveStart(e) {
      this.beforeLeft = e.changedTouches[0].pageX;
      this.stop();
    },
    moveEnd(e) {
      this.afterLeft = e.changedTouches[0].pageX;
      let idx = this.iNow;
      if (this.beforeLeft - this.afterLeft < 0) {
        this.animateStyle = "slide-right";
        idx--;
        if (idx == -1) {
          idx = this.bookList.length - 1;
        }
      } else if (this.beforeLeft - this.afterLeft > 0) {
        idx++;
        if (idx == this.bookList.length) {
          idx = 0;
        }
      }
      this.iNow = idx;
      this.play();
    }
  }
};
</script>

<style scoped>
.container {
  position: relative;
}
.imgs {
  overflow: hidden;
  height: 67vw;
  width: 100%;
  position: relative;
}
.imgs img {
  width: 100%;
}
.imgs li {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
}
.slide-enter {
  left: 100%;
}
.slide-enter-to,
.slide-leave {
  left: 0;
}
.slide-enter-active,
.slide-leave-active {
  transition: left 0.5s ease-out;
}
.slide-leave-to {
  left: -100%;
}
.index {
  position: absolute;
  bottom: 0.2rem;
  left: 50%;
  transform: translateX(-50%);
}
.index li {
  float: left;
  width: 0.12rem;
  height: 0.12rem;
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  color: transparent;
  margin-right: 0.2rem;
}
.index .selected {
  border-color: rgba(245, 123, 9, 0.467);
  background: rgba(255, 255, 255, 0.5);
}

.slide-right-enter {
  left: -100%;
}
.slide-right-enter-to,
.slide-right-leave {
  left: 0;
}
.slide-right-enter-active,
.slide-right-leave-active {
  transition: left 0.5s ease-out;
}
.slide-right-leave-to {
  left: 100%;
}
</style>
