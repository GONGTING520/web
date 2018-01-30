<template>
  <div id="app">
    <common-header :bgColor="bgColor" @tapLi="change">
      <span v-text="headerTitle"></span>
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
      headAndFoot: [
        {
          color: "rgb(33, 150, 243)",
          title: "Movie"
        },
        {
          color: "rgb(0, 130, 112)",
          title: "Music"
        },
        {
          color: "rgb(121, 85, 72)",
          title: "Book"
        },
        {
          color: "rgb(63, 81, 181)",
          title: "Photo"
        }
      ],
      index: 0
    };
  },
  computed: {
    bgColor() {
      return this.headAndFoot[this.index].color;
    },
    headerTitle() {
      return this.headAndFoot[this.index].title;
    }
  },
  components: {
    commonHeader,
    commonFooter
  },
  methods: {
    change(idx) {
      this.index = idx;
    }
  }
};
</script>

<style>
.container {
  position: absolute;
  top: 1rem;
  bottom: 1rem;
  left: 0;
  right: 0;
  overflow: scroll;
}
</style>
