<template>
    <!-- <ul> -->
        <!-- <common-header bgColor="rgb(33, 150, 243)">
            <span>Movie</span>
        </common-header> -->
        <ul class="container">
            <li v-for="val in arr" v-text="val.index"></li>
        </ul>
        <!-- <common-footer bgColor="rgb(33, 150, 243)"></common-footer> -->
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
          index: 1
        },
        {
          index: 2
        },
        {
          index: 3
        },
        {
          index: 4
        },
        {
          index: 5
        }
      ]
    };
  },
  components: {
    commonHeader,
    commonFooter
  }
};
</script>

<style scoped>
.container li {
  height: 3rem;
  border-bottom: 1px solid;
}
</style>
