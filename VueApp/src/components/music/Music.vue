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
      <div class="controls" @click.stop>
        <i class="icon iconfont icon-shangyishou" @click="prev"></i>
        <i class="icon iconfont icon-bofang" v-show="!isPlay" @click="changeState"></i>
        <i class="icon iconfont icon-zanting" v-show="isPlay" @click="changeState"></i>
        <i class="icon iconfont icon-xiayishou" @click="changeMusic"></i>
      </div>
      <span class="menu" @click.stop="isShowList=!isShowList">菜单</span>
    </div>
    <div class="lrc" @click="isShowList=true" ref="lrcScroll">
      <p class="empty" v-for="index in 5" :key="index-100" v-text="index"></p>
      <p :class="{selected: idx==index}" v-for="(obj, index) in lrc" :key="index" v-text="obj[1]"></p>
      <p class="empty" v-for="index in 5" :key="index-50" v-text="index"></p>      
    </div>
    <audio ref="musicAudio" @playing="isPlay=true" @pause="isPlay=false" class="controler" :src="audio" @ended="changeMusic" autoplay controls></audio>              
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
      <img src="/static/img/loadingMusicList.gif">
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
      audio: "",
      lrc: [],
      idx: 0,
      isPlay: true
    };
  },
  mounted() {
    this.$refs.musicAudio.ontimeupdate = () => {
      let iTime = this.$refs.musicAudio.currentTime;
      this.lrc.forEach((item, key) => {
        if (this.idx == 0 && iTime < item[0]) {
          this.idx = 0;
        }
        if (
          iTime >= item[0] &&
          (this.lrc[key + 1] == undefined || iTime < this.lrc[key + 1][0])
        ) {
          this.idx = key;
        }
      });
      this.$refs.lrcScroll.scrollTop = 25 * this.idx;
    };
  },
  watch: {
    iNow() {
      if (this.iNow != null) {
        this.name = this.musicList[this.iNow].album_title;
        this.singer = this.musicList[this.iNow].artist_name;
        this.pic_small = this.musicList[this.iNow].pic_small;
        this.audio = this.musicList[this.iNow].src;
        axios
          .get(this.musicList[this.iNow].lrcSrc)
          .then(res => {
            this.parseLyric(res.data);
            this.idx = 0;
          })
          .catch(() => {
            console.log("error");
          });
      }
    }
  },
  methods: {
    changeInow(num) {
      // 点击时切换歌曲
      this.iNow = num;
      this.isPlay = true;
    },
    prev() {
      this.iNow--;
      if (this.iNow == -1) {
        this.iNow = this.musicList.length - 1;
      }
      this.isPlay = true;      
    },
    changeState() {
      if (this.$refs.musicAudio.paused) {
        this.$refs.musicAudio.play();
        this.isPlay = true;
      } else {
        this.$refs.musicAudio.pause();
        this.isPlay = false;
      }
    },
    parseLyric(text) {
      let lyric = text.split("\n"); //先按行分割
      let _l = lyric.length; //获取歌词行数
      let lrc = new Array(); //新建一个数组存放最后结果
      for (let i = 0; i < _l; i++) {
        let d = lyric[i].match(/\[\d{2}:\d{2}((\.|\:)\d{2,})\]/g); //正则匹配播放时间
        let t = lyric[i].split(d); //以时间为分割点分割每行歌词，数组最后一个为歌词正文
        // let t = lyric[i].split(']'); //以时间为分割点分割每行歌词，数组最后一个为歌词正文
        if (d != null) {
          //过滤掉空行等非歌词正文部分
          //换算时间，保留两位小数
          let dt = String(d).split(":");
          let _t =
            parseInt(dt[0].split("[")[1]) * 60 +
            parseFloat(dt[1].split("]")[0]);
          lrc.push([_t, t[1]]);
        }
      }
      this.lrc = lrc;
    },
    changeMusic() {
      // 自动播放下一首
      this.iNow++;
      if (this.iNow == this.musicList.length) {
        this.iNow = 0;
      }
      this.isPlay = true;
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
        this.musicList = Array.from(require("../../../static/json/music.json"));
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
.controls {
  position: absolute;
  bottom: 0.9rem;
  right: 0.15rem;
}
.iconfont {
  font-size: 0.7rem;
  margin-right: 0.15rem;
}
.menu {
  position: absolute;
  right: 0.5rem;
  bottom: 0.3rem;
}
.lrc {
  position: absolute;
  top: 4rem;
  bottom: 3rem;
  left: 0;
  right: 0;
  text-align: center;
  color: #000000;
  overflow-y: scroll;
}
.lrc p {
  transition: all 0.5s ease;
}
.lrc .empty {
  color: transparent;
}
.lrc .selected {
  font-size: 0.4rem;
  color: #eeeeee;
}
.controler {
  position: absolute;
  bottom: 1rem;
  width: 100%;
}
.music-list {
  position: absolute;
  top: 100%;
  left: 0;
  bottom: 1rem;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
  color: #ffffff;
}
.music-list ul {
  overflow-y: scroll;
  position: absolute;
  top: 0.5rem;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: scroll;
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
.music-list .selected {
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
    top: 45%;
  }
}
@keyframes hideList {
  0% {
    top: 45%;
  }
  100% {
    top: 100%;
  }
}
</style>
