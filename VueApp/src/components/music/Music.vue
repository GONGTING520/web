<template>
  <div class="container">
    <img :src="pic_small" class="blur">    
    <div class="album-info" @click="isShowList=true">
      <div class="album-left">
        <img :src="pic_small">
      </div>
      <div class="alubum-right">
        <p v-text="name" class="title"></p>
        <p v-text="singer" class="singer"></p>
      </div>
      <span class="menu" @click.stop="isShowList=!isShowList">菜单</span>
    </div>
    <div class="lrc" @click="isShowList=true"></div>
    <audio class="controler" :src="audio" @ended="changeMusic" autoplay controls></audio>              
    <!-- <transition-group tag="ul" name="slide"> -->
    <div class="music-list" v-show="!isLoading" :class="{hide:isShowList, show:!isShowList}">
      <div class="music-title">歌单列表</div>
      <ul>
        <li v-for="(obj, index) in musicList" :key="obj.album_id" class="music-info" :class="{selected: iNow==index}" @click="changeInow(index)">
          <div v-text="index + 1" class="info-left"></div>
          <div class="info-right">
            <span v-text="obj.album_title"></span> - 
            <span v-text="obj.artist_name"></span>
          </div>
        </li>
      </ul>
    </div>
    <!-- </transition-group> -->
    <div class="loading" v-show="isLoading">
      <img src="../../assets/img/loadingMusicList.gif">
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      musicList: [],
      isLoading: true,
      isShowList: false,
      iNow: null,
      name: "",
      singer: "",
      pic_small: "",
      audio: ""
    };
  },
  watch: {
    iNow() {
      this.name = this.musicList[this.iNow].album_title;
      this.singer = this.musicList[this.iNow].artist_name;
      this.pic_small = this.musicList[this.iNow].pic_small;
      this.audio = this.musicList[this.iNow].src;
    }
  },
  methods: {
    changeInow(num) {
      this.iNow = num;
    },
    changeMusic() {
      this.iNow++;
      if (this.iNow == this.musicList.length) {
        this.iNow = 0;
      }
    },
    getInfo() {
      // 获取百度音乐的音乐列表
      // type = 1-新歌榜,2-热歌榜,11-摇滚榜,12-爵士,16-流行,21-欧美金曲榜,22-经典老歌榜,23-情歌对唱榜,24-影视金曲榜,25-网络歌曲榜
      axios
        .get(
          `${API_PROXY}http://tingapi.ting.baidu.com/v1/restserver/ting?format=json&callback=&from=webapp_music&method=baidu.ting.billboard.billList&type=1&size=10&offset=${
            this.musicList.length
          }`
        )
        .then(res => {
          this.musicList = this.musicList.concat(res.data.song_list);
          this.isLoading = false;
          console.log(this.musicList);
          if (this.musicList.length == 10) {
            this.iNow = 0;
            // this.iNow = this.musicList[0].album_id;
            this.getMusic();
          }
        })
        .catch(() => {
          console.log("error");
        });
    },
    getMusic() {
      // 获取音乐资源
      axios
        .get(
          `${API_PROXY}http://tingapi.ting.baidu.com/v1/restserver/ting?format=json&callback=&from=webapp_music&method=baidu.ting.song.play&songid=${
            this.musicList[this.iNow].song_id
          }`
        )
        .then(res => {
          this.audio = JSON.parse(
            res.data.substring(1, res.data.length - 2)
          ).bitrate.show_link;
          console.log(this.audio);
        })
        .catch(res => {
          console.log("error");
        });
    },
    get() {
      // 获取酷我音乐的音乐列表
      axios
        .get(
          `${API_PROXY}http://search.kuwo.cn/r.s?all=周杰伦&ft=music&itemset=web_2013&client=kt&pn=0&rn=10&rformat=json&encoding=utf8`
        )
        .then(res => {
          console.log(JSON.parse(res.data.replace(/\'/g, '"')));
          this.musicList = this.musicList.concat(
            JSON.parse(res.data.replace(/\'/g, '"')).abslist
          );
          this.isLoading = false;
          console.log(this.musicList);
          if (this.musicList.length == 10) {
            this.iNow = 0;
            this.getMusic();
          }
        })
        .catch(res => {
          console.log("error");
        });
    },
    getMusicList() {
      setTimeout(() => {
        this.musicList = Array.from(require("../json/music.json"));
        this.isLoading = false;
        this.iNow = 0;
      }, 1000);
    }
  },
  created() {
    this.getMusicList();
    // this.get();
  }
};
</script>

<style scoped>
.album-info {
  padding: 0.3rem;
  height: 2rem;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  color: #ffffff;
  background: rgba(0, 0, 0, 0.35);
}
.blur {
  filter: blur(0.6rem);
  position: absolute;
  top: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
}
.album-left {
  flex-grow: 1;
  width: 0;
  margin-right: 0.3rem;
}
.album-left img {
  height: 100%;
}
.alubum-right {
  flex-grow: 3;
  width: 0;
}
.alubum-right .title {
  font-size: 0.4rem;
}
.alubum-right .singer {
  font-size: 0.3rem;
}
.menu {
  position: absolute;
  right: 0.5rem;
  bottom: 0.3rem;
}
.lrc {
  background: #cccccc;
}
.controler {
  position: absolute;
  bottom: 1rem;
  width: 100%;
  height: 1rem;
  background: #ffffff;
}
.music-list {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  bottom: 2rem;
  background: rgba(0, 0, 0, 0.6);
  color: #ffffff;
}
.music-list ul {
  overflow-y: scroll;
  position: absolute;
  top: 0.5rem;
  bottom: 0;
  left: 0;
  right: 0;
}
.music-list .music-title {
  text-align: center;
  height: 0.5rem;
}
.music-info {
  height: 1rem;
  border-bottom: 1px solid #000000;
  line-height: 1rem;
  padding: 0 0.2rem;
  display: flex;
}
.music-info .info-left {
  flex-grow: 1;
  text-align: center;
  width: 0;
}
.music-info .info-right {
  flex-grow: 9;
  width: 0;
}
.selected {
  background: rgba(255, 255, 255, 0.4);
  color: #000000;
}
.loading {
  position: absolute;
  top: 1rem;
  bottom: 1rem;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.6);
}
.loading img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
/* .slide-enter {
  top: 100%;
}
.slide-enter-to {
  top: 50%;
}
.slide-enter-active,
.slide-leave-active {
  transition: top 0.5s ease;
}
.slide-leave {
  top: 50%;
}
.slide-leave-to {
  top: 100%;
} */
.show {
  animation: showList 0.5s linear forwards;
}
.hide {
  animation: hideList 0.5s linear forwards;
}
@keyframes showList {
  0% {
    top: 100%;
  }
  100% {
    top: 40%;
  }
}
@keyframes hideList {
  0% {
    top: 40%;
  }
  100% {
    top: 100%;
  }
}
</style>
