<template>
    <!-- <div> -->
        <!-- <common-header bgColor="rgb(0, 130, 112)">
            <span>Music</span>
        </common-header> -->
        <div class="container">
            <div class="albumInfo"></div>
            <ul>
                <li v-for="obj in arr" class="musicInfo" :class="{selected: obj.isSelected}" @click="showMusic(obj)">
                    <span v-text="obj.name"></span>
                    <span v-text="obj.singer"></span>
                    <span v-text="obj.time"></span>
                </li>
            </ul>
        </div>
        <!-- <common-footer bgColor="rgb(0, 130, 112)"></common-footer> -->
    <!-- </div> -->
</template>

<script>
import commonHeader from "@/components/common/Header";
import commonFooter from "@/components/common/Footer";
export default {
  data() {
    return {
      arr: [
        {
          name: "成都",
          singer: "zzz",
          time: "5:00",
          isSelected: false
        },
        {
          name: "我要你",
          singer: "aer",
          time: "4:00",
          isSelected: false
        },
        {
          name: "又",
          singer: "rehy",
          time: "5:10",
          isSelected: false
        },
        {
          name: "时间煮雨",
          singer: "ewt",
          time: "3:00",
          isSelected: false
        },
        {
          name: "假如爱有天意",
          singer: "eiwah",
          time: "2:45",
          isSelected: false
        }
      ]
    };
  },
  components: {
    commonHeader,
    commonFooter
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
    }
  }
};
</script>

<style scoped>
.albumInfo {
  height: 3rem;
  border-bottom: 1px solid;
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
</style>
