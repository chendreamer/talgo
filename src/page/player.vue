<template>
  <div>
    <el-container class="container" id="videoContainer">
      <el-header>
        <Header></Header>
      </el-header>
      <video
        id="myVideo"
        class="video-js"
        width="1000"
        height="800"
        data-setup="{}"
      >
        <source :src="videoPath" type="video/mp4" />
        <track
          id="videoTrack"
          :src="subtitlePath"
          :srclang="getCurrentLang"
          :label="getCurrentLang"
          kind="subtitles"
          default="true"
        />

        <!-- <track
          id="trackEn"
          :src="subtitleEnPath"
          srclang="ru"
          label="ru"
          kind="subtitles"
          :default="setDefault('en')"
        />
        <track
          id="trackEs"
          :src="subtitleEsPath"
          srclang="es"
          label="es"
          kind="subtitles"
          :default="setDefault('es')"
        />
        <track
          id="trackFr"
          :src="subtitleFrPath"
          srclang="uz"
          label="uz"
          kind="subtitles"
          :default="setDefault('fr')"
        /> -->
      </video>
    </el-container>
  </div>
</template>

<script>
// import player from '../components/player'
import "video.js/dist/video-js.css";
import videojs from "video.js";
import axios from "axios";
import i18n from "@/i18n";
import Header from "@/components/Header.vue";

export default {
  name: "player",
  props: ["summaryID"],
  components: { Header },
  data: function () {
    return {
      videoPath: "",
      subtitlePath: "",
      // subtitleEnPath: "",
      // subtitleEsPath: "",
      // subtitleFrPath: "",
    };
  },
  mounted: function () {
    let that = this;
    if (typeof that.summaryID !== "undefined") {
      //console.log(that.$store.state.music.player.paused);
      if (
        typeof that.$store.state.music.player.paused != "undefined" &&
        !that.$store.state.music.player.paused
      ) {
        that.$store.dispatch("music/stopMusic");
        //that.$store.state.music.playingStatus = false;
      }

      console.log("player的summaryID:" + this.summaryID);
      that.getData();
    }
  },
  computed: {
    getCurrentLang: function () {
      return i18n.locale == "es" ?  "es" : (i18n.locale == "en" ? "ru" : "ez");
    },
  },
  methods: {
    // setDefault: function (lang) {
    //   return lang == i18n.locale;
    // },
    getData: function () {
      let that = this;

      axios
        .get(that.$store.state.media_server + "/video", {
          params: {
            id: that.summaryID,
            lang: i18n.locale,
          },
        })
        .then(function (response) {
          console.log(response["data"]["data"]);
          that.videoPath =
            that.$store.state.media_server +
            response["data"]["data"][0]["filepath"];
          console.log(i18n.locale);
          var _subtitlepath = "";
          switch (i18n.locale) {
            case "ru":
              _subtitlepath = response["data"]["data"][0]["subtitlepath_en"];
              break;
            case "es":
              _subtitlepath = response["data"]["data"][0]["subtitlepath_es"];
              break;
            case "uz":
              _subtitlepath = response["data"]["data"][0]["subtitlepath_fr"];
              break;

            default:
              break;
          }

          that.subtitlePath = _subtitlepath.replace(".srt", ".vtt");

          that.$nextTick(function () {
            that.playInit();
          });
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
    playInit: function () {
      var player = videojs(document.getElementById("myVideo"), {
        controls: true, // 是否显示控制条
        preload: "auto",
        autoplay: false,
        fluid: true, // 自适应宽高
        // language: "zh-CN", // 设置语言
        muted: false, // 是否静音
        inactivityTimeout: false,
        controlBar: {
          children: [
            { name: "playToggle" }, // 播放按钮
            { name: "currentTimeDisplay" }, // 当前已播放时间
            { name: "progressControl" }, // 播放进度条
            { name: "durationDisplay" }, // 总时间
            // {
            //   // 倍数播放
            //   name: "playbackRateMenuButton",
            //   playbackRates: [0.5, 1, 1.5, 2, 2.5],
            // },
            {
              name: "volumePanel", // 音量控制
              inline: false, // 不使用水平方式
            },
            { name: "subtitlesButton" }, // 字幕
            { name: "FullscreenToggle" }, // 全屏
          ],
        },
      });
      player.on("ended", function () {
        console.log("play ended!");
      });
    },
  },
};
</script>

<style lang="scss">
.video-js .vjs-big-play-button {
  width: 90px;
  height: 50px;
  left: calc(50% - 45px);
  top: calc(50% - 25px);
}
</style>