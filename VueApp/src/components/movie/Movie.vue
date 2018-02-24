<template>
    <!-- <ul> -->
        <!-- <common-header bgColor="rgb(33, 150, 243)">
            <span>Movie</span>
        </common-header> -->
        <ul class="container">
            <li @click="showDetail(movie.id)" v-for="(movie, index) in movieList" :key="index">
              <div class="movie-img">
                <img :src="movie.img" :alt="movie.nm">                
              </div>
              <div class="movie-info">
                <p class="name" v-text="movie.nm"></p>
                <p class="cat" v-text="movie.cat"></p>
                <p class="star" v-text="`主演：${movie.star}`"></p>
                <p class="showInfo" v-text="movie.showInfo"></p>
              </div>
              <div class="score" v-if="movie.sc!=0">
                <span v-text="float(movie.sc)"></span>
                <span class="words">分</span>
              </div>
              <div class="score" v-if="movie.sc==0">
                <span v-text="movie.wish"></span>
                <span class="words">人想看</span>                  
              </div>
              <span class="bottom sale" v-if="movie.sc!=0">购票</span>
              <span class="bottom presale" v-if="movie.sc==0">预售</span>
            </li>
            <li class="loading" v-show="isLoading">
              <img src="/static/img/loadingMovieDetail.gif">              
            </li>
            <li class="end" v-show="isEnd">小主已经到底啦~~~~</li>
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
    float(num) {
      return Number.isInteger(num) ? num + ".0" : num;
    },
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
    },
    showDetail(id) {
      this.$router.push(`/moviedetail/${id}`);
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
.container {
  background: #eeeeee;
  overflow: hidden;
}
.container li {
  margin: 0.25rem;
  display: flex;
  background: #ffffff;
  position: relative;
  align-items: center;
}
.container .movie-img {
  flex-grow: 1;
  width: 0;
  margin-right: 0.25rem;
}
.container .movie-img img {
  width: 100%;
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
  margin-right: 1.2rem;
}
.movie-info .star {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.movie-info .showInfo {
  color: #cccccc;
}
.score {
  position: absolute;
  right: 0.2rem;
  top: 0.12rem;
  color: #ffb400;
}
.score .words {
  font-size: 0.15rem;
  margin-left: -4px;
}
.bottom {
  position: absolute;
  padding: 0.06rem 0.23rem;
  font-size: 0.24rem;
  bottom: 0.25rem;
  right: 0.2rem;
  border-radius: 0.06rem;
  color: #ffffff;
}
.sale {
  background: #ef4238;
}
.presale {
  background: rgb(0, 153, 255);
}
.loading {
  margin-top: 1px;
  height: 1rem;
}
.loading img {
  position: relative;
  height: 100%;
  left: 50%;
  transform: translateX(-50%);
}
.container .end {
  display: block;
  text-align: center;
  color: #777777;
}
</style>
