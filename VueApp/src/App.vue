<template>
  <div id="app">
    <common-header :bgColor="bgColor" @tapLi="change('movie')">
      <span v-text="title"></span>
    </common-header>
    <router-view/>
    <common-footer @tapLi="change" :bgColor="bgColor"></common-footer>
  </div>
</template>

<script>
import commonHeader from "@/components/common/Header";
import commonFooter from "@/components/common/Footer";

export default {
  name: "App",
  data() {
    return {
      bgColor: "rgb(33, 150, 243)",
      title: "Movie",
      // headAndFoot: [
      //   {
      //     color: "rgb(33, 150, 243)",
      //     title: "Movie",
      //     name: "movie"
      //   },
      //   {
      //     color: "rgb(0, 130, 112)",
      //     title: "Music",
      //     name: "music"
      //   },
      //   {
      //     color: "rgb(121, 85, 72)",
      //     title: "Book",
      //     name: "book"
      //   },
      //   {
      //     color: "rgb(63, 81, 181)",
      //     title: "Photo",
      //     name: "photo"
      //   }
      // ],
      // index: 0
    };
  },
  computed: {
    // bgColor() {
    //   return this.headAndFoot[this.index].color;
    // },
    // headerTitle() {
    //   return this.headAndFoot[this.index].title;
    // }
  },
  components: {
    commonHeader,
    commonFooter
  },
  methods: {
    // change(idx) {
    //   this.index = idx;
    // },
    change(tapName) {
      switch (tapName) {
        case "movie":
          this.bgColor = "rgb(33, 150, 243)";
          this.title = "Movie";
          break;
        case "music":
          this.bgColor = "rgb(0, 130, 112)";
          this.title = "Music";
          break;
        case "book":
          this.bgColor = "rgb(121, 85, 72)";
          this.title = "Book";
          break;
        case "photo":
          this.bgColor = "rgb(63, 81, 181)";
          this.title = "Photo";
          break;
        default:
      }
    }
  }
};
</script>

<style>
.container {
  /* position: absolute; */
  /* top: 1rem;
  bottom: 1rem;
  left: 0;
  right: 0; */
  margin: 1rem 0;
  font-size: 0.3rem;
  /* overflow-y: scroll; */
}
</style>
