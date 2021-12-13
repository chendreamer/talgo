<template>
  <div>
    <el-container>
      <el-header class="bg-color">
        <Header></Header>
      </el-header>
      <div class="bg-color">
        <multimedia-logo class="container" pagename="trainsetFloorPlan"></multimedia-logo>
      </div>
      <el-main>
        <div class="container">
          <img :src="imagePath" alt />
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import i18n from '@/i18n';
import axios from "axios";
import Header from "@/components/Header.vue";
import MultimediaLogo from "@/components/MultimediaLogo.vue";

export default {
  components: { Header, MultimediaLogo },
  data: function () {
    return {
      imagePath: ""
    };
  },
  mounted: function () {
    let that = this;
    //that.$store.state.media_server + "/trainpic"
    //axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    axios
      .get(that.$store.state.media_server + "/trainpic", {
        params: {
          lang: i18n.locale
        },
      })
      .then(function (response) {
        //console.log(response);
        console.log(that.getTrainType);
        response["data"]["data"].forEach((element, index) => {
          if (response["data"]["data"][index]['type'] == that.getTrainType) {
            that.imagePath = that.$store.state.media_server + response["data"]["data"][index]['filepath'];
            return;
          }
        });
      })
      .catch(function () {
        //console.log(error);
        that.$message({
          message: i18n.tc("message.networkError"),
          type: "info",
          center: true,
          // iconClass: "",
          duration: 1800,
        });
      });
  },
  computed: {
    getTrainType() {
      //070匹配发的列车类型，re02匹配0x10
      if (this.$store.state.media_server.indexOf('172.19.6.20') != -1) {
        return this.$store.state.trainInformation.trainType;
      } else if (this.$store.state.media_server.indexOf('172.19.3.20') != -1) {
        return '0x10';
      } else {
        return '';
      }
    },
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