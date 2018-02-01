<template>
  <div class="container">
    <div class="loading" v-show="isLoading">
      <img src="../../assets/img/loadingAnime.gif">
    </div>
    <h1 class="title">海贼王</h1>
    <p v-text="update"></p>
    <ul class="animeList">
      <a :href="obj.vurl" v-for="obj in animeList" :key="obj.id">
        <li class="animeItem">
          <div class="left">
            <img :src="obj.vpic">
          </div>
          <div class="right">
            <p v-text="obj.vn"></p>
            <p class="desc" v-text="obj.vt"></p>
          </div>
        </li>
      </a>
    </ul>
    <p v-if="end" class="end">小主到底啦~~~</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      animeList: [],
      animeAll: [],
      update: "",
      isLoading: true,
      end: false
    };
  },
  methods: {
    getInfo() {
      axios
        .get(
          `${API_PROXY}http://cache.video.iqiyi.com/jp/avlist/202861101/1/?callback=jsonp9`
        )
        .then(res => {
          let data = JSON.parse(res.data.substring(11, res.data.length - 15))
            .data;
          this.animeAll = data.vlist;
          this.update = data.ps;
          this.getLi();
        })
        .catch(res => {
          console.log("error");
        });
    },
    getLi() {
      setTimeout(() => {
        this.animeList = this.animeAll.slice(0, this.animeList.length + 10);
        if (this.animeList.length != 0 && !(this.animeList.length % 10 === 0)) {
          console.log(this.animeList.length % 10 === 0);
          this.end = true;
        }
        this.isLoading = false;
      }, 1000);
    }
  },
  created() {
    this.getInfo();
  },
  mounted() {
    window.onscroll = () => {
      let iScrollTop =
        document.body.scrollTop || document.documentElement.scrollTop;
      let iScrollHeight = document.documentElement.scrollHeight;
      let iClientHeight = document.documentElement.clientHeight;
      if (
        !this.end &&
        !this.isLoading &&
        iScrollTop + iClientHeight == iScrollHeight
      ) {
        this.isLoading = true;
        this.getLi();
      }
    };
  }
};
</script>

<style scoped>
.loading {
  position: absolute;
  top: 1rem;
  bottom: 1rem;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.5);
}
.loading img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.5);
  border-radius: 10%;
}
.animeItem {
  margin: 0.2rem;
  padding-bottom: 0.2rem;
  display: flex;
  align-items: center;
  border-bottom: 1px dashed #cccccc;
}
.animeItem .left {
  flex-grow: 1;
  margin-right: 0.2rem;
  width: 0;
}
.animeItem .right {
  flex-grow: 2;
  width: 0;
  padding-right: 0.2rem;
}
.animeItem .right .desc {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.end {
  text-align: center;
}
</style>
