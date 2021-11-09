<template>
  <div>
    <el-container class="container">
      <el-header>
        <Header></Header>
      </el-header>
      <div>
        <multimedia-logo pagename="multimedia"></multimedia-logo>
      </div>
      <multimedia-swiper></multimedia-swiper>
    </el-container>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import MultimediaLogo from "@/components/MultimediaLogo.vue";
import MultimediaSwiper from "@/components/MultimediaSwiper.vue";

export default {
  components: { Header, MultimediaLogo, MultimediaSwiper },
  data: function () {
    return {};
  },
};
</script>

<style lang="scss" scoped>
</style>