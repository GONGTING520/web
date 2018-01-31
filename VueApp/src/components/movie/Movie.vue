<template>
    <!-- <ul> -->
        <!-- <common-header bgColor="rgb(33, 150, 243)">
            <span>Movie</span>
        </common-header> -->
        <ul class="container">
            <li v-for="(movie, index) in movieList" :key="index">
              <img class="movie-img" :src="movie.img" :alt="movie.nm">
              <div class="movie-info">
                <p class="name" v-text="movie.nm"></p>
                <p class="cat" v-text="movie.cat"></p>
                <p class="star" v-text="`主演：${movie.star}`"></p>
                <p class="showInfo" v-text="movie.showInfo"></p>
              </div>
            </li>
            <img src="@/assets/img/loadingMovieDetail.gif" class="loading" v-show="isLoading">
            <p class="end" v-show="isEnd">小主已经到底啦~~~~</p>
        </ul>
        <!-- <common-footer bgColor="rgb(33, 150, 243)"></common-footer> -->
    <!-- </div> -->
</template>

<script>
import commonHeader from "@/components/common/Header";
import commonFooter from "@/components/common/Footer";
import axios from "axios";

export default {
  data() {
    return {
      movieList: [],
      isLoading: true,
      isGetting: false,
      isEnd: false
    };
  },
  components: {
    commonHeader,
    commonFooter
  },
  methods: {
    getMovieInfo() {
      axios
        .get(
          `${API_PROXY}http://m.maoyan.com/movie/list.json?type=hot&offset=${
            this.movieList.length
          }&limit=10`
        )
        .then(res => {
          let list = res.data.data.movies;
          if (list.length < 10) {
            this.isEnd = true;
          }
          this.movieList = this.movieList.concat(list);
          this.isLoading = this.isGetting = false;
        })
        .catch(res => {
          alert.log("error");
        });
    }
  },
  created() {
    this.getMovieInfo();
  },
  mounted() {
    window.onscroll = () => {
      // 滚动条高度
      let iScrollTop =
        document.body.scrollTop || document.documentElement.scrollTop;
      // 滚动的内容的高度
      let iScrollHeight = document.documentElement.scrollHeight;
      // 可视的高度
      let iClientHeight = document.documentElement.clientHeight;
      // 如果数据库未获取完所有数据，并且当前无请求，并且拉到最下方则触发一次请求
      if (
        !this.isEnd &&
        !this.isGetting &&
        iScrollTop + iClientHeight === iScrollHeight
      ) {
        this.isGetting = this.isLoading = true;
        setTimeout(() => {
          this.getMovieInfo();
        }, 1000);
      }
    };
  }
};
</script>

<style scoped>
.container li {
  padding: 0.25rem;
  display: flex;
  border-bottom: 1px solid;
}
.container .movie-img {
  flex-grow: 1;
  width: 0;
  margin-right: 0.25rem;
}
.container .movie-info {
  flex-grow: 4;
  width: 0;
}
.movie-info .name {
  font-size: 0.3rem;
  font-weight: bolder;
}
.movie-info p {
  font-size: 0.26rem;
  color: #666;
}
.movie-info .star {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.movie-info .showInfo {
  color: #cccccc;
}
.loading {
  margin-top: 1px;
  height: 1rem;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}
.end {
  text-align: center;
  color: #777777;
}
</style>
