<template>
    <div class="container">
        <div class="detail-title">
            <img :src="movieDetail.img" class="blur">
            <div class="detail-img">
                <img :src="movieDetail.img" :alt="movieDetail.nm">
            </div>
            <div class="detail-content">
                <p class="name" v-text="movieDetail.nm"></p>
                <p class="cat" v-text="movieDetail.cat"></p>
                <p class="src" v-text="`${movieDetail.src} / ${movieDetail.dur} 分钟`"></p>
                <p v-text="movieDetail.ver"></p>
                <p v-text="movieDetail.rt"></p>
                <p v-text="movieDetail.scm"></p>
            </div>
        </div>
        <div class="detail-container">
            <div class="dra">
                <h3>简介</h3>
                <div v-html="movieDetail.dra"></div>
            </div>
            <ul class="stars clearfix">
                <li>
                    <h3>主演</h3>
                </li>
                <li class="starImg" v-for="(name, index) in stars" v-text="name" :key="index">                </li>
            </ul>
            <div class="loading" v-show="isloading"></div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      movieDetail: {},
      stars: [],
      isloading: true
    };
  },
  created() {
    setTimeout(() => {
      axios
        .get(
          `${API_PROXY}http://m.maoyan.com/movie/${
            this.$route.params.movieId
          }.json`
        )
        .then(res => {
          console.log(res);
          this.movieDetail = res.data.data.MovieDetailModel;
          this.stars = this.movieDetail.star.split(" ").splice(0, 6);
          this.isloading = false;
        })
        .catch(res => {
          alert("error");
        });
    }, 1000);
  }
};
</script>

<style scoped>
.blur {
  filter: blur(0.6rem);
  position: absolute;
  top: 0;
  z-index: -1;
  width: 100%;
}
.detail-title {
  padding: 0.25rem;
  display: flex;
  background-color: rgba(64, 69, 77, 0.55);
  color: #ffffff;
  position: relative;
  z-index: -1;
  overflow: hidden;
}
.detail-img {
  flex: 1;
  width: 0;
  margin-right: 0.3rem;
}
.detail-img img {
  width: 100%;
}
.detail-content {
  padding: 0.2rem 0;
  flex: 2;
  width: 0;
  font-size: 0.24rem;
}
.detail-content .name {
  font-size: 0.34rem;
  font-weight: bolder;
}
.detail-container {
  background: #eeeeee;
}
.dra {
  padding: 0.25rem;
  font-size: 0.3rem;
  background: #ffffff;
}
.stars {
  margin-top: 0.25rem;
  padding: 0.25rem;
  background: #ffffff;
}
.starImg {
  width: 18%;
  padding: 0 1%;
  float: left;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.loading {
  position: absolute;
  left: 0;
  right: 0;
  top: 1rem;
  bottom: 1rem;
  background: url(../../assets/img/loadingMovie.gif) no-repeat center/50%;
  background-color: #ffffff;
}
</style>
