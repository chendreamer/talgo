<template>
  <div>
    <div id="videoContainer">
      <video id="myVideo" class="video-js" width="640" height="264" data-setup="{}">
        <track :src="pathEn" srclang="en"    label="English" kind="subtitles" default />
        <track :src="pathEs" srclang="es"    label="es" kind="subtitles"  />
        <track :src="pathFr" srclang="fr"    label="fr" kind="subtitles"  />
      </video>
    </div>
  </div>
</template>

<script>
// import player from '../components/player'
import "video.js/dist/video-js.css";
import videojs from "video.js";

export default {
  data: function() {
    return {
        pathEn:("http://localhost/eng.vtt"),
        pathEs:("http://localhost/es.vtt"),
        pathFr:("http://localhost/fr.vtt")
    };
  },
  mounted: function() {
    console.log(videojs);
    var player = videojs(document.getElementById("myVideo"),
      {
        controls: true, // 是否显示控制条
        preload: "auto",
        autoplay: false,
        fluid: true, // 自适应宽高
        language: "zh-CN", // 设置语言
        muted: false, // 是否静音
        inactivityTimeout: false,
        controlBar: {
          children: [
            { name: "playToggle" }, // 播放按钮
            { name: "currentTimeDisplay" }, // 当前已播放时间
            { name: "progressControl" }, // 播放进度条
            { name: "durationDisplay" }, // 总时间
            {
              // 倍数播放
              name: "playbackRateMenuButton",
              playbackRates: [0.5, 1, 1.5, 2, 2.5]
            },
            {
              name: "volumePanel", // 音量控制
              inline: false // 不使用水平方式
            },
            { name: "FullscreenToggle" } // 全屏
          ]
        },
        sources: [
          // 视频源
          {
            src: "http://localhost/china.mp4",
            type: "video/mp4"
          }
        ]
      });
      player.on('ended', function() {
    videojs.log('Awww...over so soon?!');
  });
  }
};
</script>

<style scoped>
#videoContainer {
  width: 800px;
  height: 500px;
  background-color: green;
}
</style>