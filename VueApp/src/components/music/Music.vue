<template>
  <div class="container">
    <div class="albumInfo">
      <div class="album-left">
        <img :src="pic_small">
      </div>
      <div class="alubum-right">
        <p v-text="name" class="title"></p>
        <p v-text="singer" class="singer"></p>
        <audio class="controler" :src="audio" controls></audio>        
      </div>
      <img :src="pic_small" class="blur">
    </div>
    <div class="lrc"></div>
    <ul>
      <li v-for="obj in musicList" :key="obj.id" class="musicInfo" :class="{selected: obj.isSelected}" @click="showMusic(obj)">
        <span v-text="obj.album_title"></span> - 
        <span v-text="obj.artist_name"></span>
      </li>
    </ul>
    <div class="loading" v-show="isLoading">
      <img src="../../assets/img/loadingMusicList.gif" alt="">
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
      this.audio = this.musicList[this.iNow].pic_radio;
      console.log(this.audio);
    }
  },
  methods: {
    showMusic(obj) {
      this.arr.forEach(elem => {
        if (Object.is(obj, elem)) {
          elem.isSelected = true;
        } else {
          elem.isSelected = false;
        }
      });
    },
    getInfo() {
      // type = 1-新歌榜,2-热歌榜,11-摇滚榜,12-爵士,16-流行,21-欧美金曲榜,22-经典老歌榜,23-情歌对唱榜,24-影视金曲榜,25-网络歌曲榜
      axios
        .get(
          `${API_PROXY}http://tingapi.ting.baidu.com/v1/restserver/ting?format=json&callback=&from=webapp_music&method=baidu.ting.billboard.billList&type=1&size=10&offset=${
            this.musicList.length
          }`
        )
        .then(res => {
          console.log(res);
          this.musicList = this.musicList.concat(res.data.song_list);
          this.isLoading = false;
          if (this.musicList.length == 10) {
            this.iNow = 0;
            this.getMusic();
          }
        })
        .catch(() => {
          console.log("error");
        });
    },
    getMusic() {
      axios
        .get(
          `${API_PROXY}http://tingapi.ting.baidu.com/v1/restserver/ting?format=json&callback=&from=webapp_music&method=baidu.ting.song.play&songid=${
            this.musicList[this.iNow].song_id
          }`
        )
        .then(res => {
          console.log(JSON.parse(res.data.substring(1, res.data.length - 2)));
          this.audio = JSON.parse(res.data.substring(1, res.data.length - 2)).bitrate.file_link;
          console.log(this.audio);
        })
        .catch(res => {
          console.log("error");
        });
    }
  },
  created() {
    this.getInfo();
  }
};
</script>

<style scoped>
.albumInfo {
  padding: 0.3rem;
  border-bottom: 1px solid;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
}
.blur {
  filter: blur(0.6rem);
  position: absolute;
  top: 0;
  z-index: -1;
  width: 100%;
}
.album-left {
  flex-grow: 1;
  width: 0;
  margin-right: 0.3rem;
}
.album-left img {
  width: 100%;
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
.alubum-right .controler {
  width: 100%;
}
.musicInfo {
  height: 1rem;
  border-bottom: 1px solid;
  line-height: 1rem;
  padding: 0 0.2rem;
}
.selected {
  background: #cccccc;
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
</style>
