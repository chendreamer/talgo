<template>
  <div>
    <el-container>
      <el-header class="bg-color">
        <Header></Header>
      </el-header>
      <div class="bg-color">
        <multimedia-logo class="container" pagename="technical"></multimedia-logo>
      </div>
      <el-main>
        <div class="container">
          <iframe :src="technicalURL" title="iframe" frameborder="0" width="100%" height="500px"></iframe>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import i18n from "@/i18n";
import axios from "axios";
import Header from "@/components/Header.vue";
import MultimediaLogo from "@/components/MultimediaLogo.vue";

export default {
  components: { Header, MultimediaLogo },
  data: function () {
    return {
      technicalURL: "",
    };
  },
  mounted: function () {
    let that = this;

    axios
      .get(that.$store.state.media_server + "/technical", {
        params: {
          lang: i18n.locale,
        },
      })
      .then(function (response) {
        console.log(response);
        that.technicalURL =
          that.$store.state.media_server + response["data"]["data"][0]["url"];
      })
      .catch(function (error) {
        console.log(error);
        that.$message({
            message: i18n.tc("message.networkError"),
            type: "info",
            center: true,
            // iconClass: "",
            duration: 1800,
          });
      });
  },
  beforeRouteEnter(to, from, next) {
    document
      .querySelector("body")
      .setAttribute("style", "background-color:#FFF");
    next();
  },
  beforeRouteLeave(to, from, next) {
    document.querySelector("body").removeAttribute("style");
    next();
  },
  methods: {},
  computed: {},
};
</script>

<style lang="scss" scoped>
ol {
  list-style: none;
  li {
    display: flex;
  }
  div {
    margin-right: 200px;
  }
}
</style>