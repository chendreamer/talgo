<template>
  <div class="Audio">
    <!-- <audio id="audioTag" :src="musicURL"></audio> -->
    <p class="current-music-title ellipsis">{{getCurentPlayingMusicName}}</p>
    <div class="df music-bar">
      <span class="played-time">{{getMusicCurrentTime}}</span>
      <!-- <div class="pgs-play" id="progress"></div>  @mousedown.prevent="dotMouseDown" @mouseup.prevent="dotMouseUp" -->
      <!-- <div class="pgs" @click="changeProgress">
        <div class="dot" id="dot"></div>  :max="getMusicDuration" :value="musicCurrent"  @change="changeCurrentTime"
      </div>-->
      <el-slider
        class="pgb"
        :min="0"
        :max="getMusicDuration"
        :show-tooltip="false"
        :format-tooltip="formatTooltip"
        v-model="musicCurrent"
        @change="changeCurrentTime"
      ></el-slider>
      <span class="audio-time" id="audioTime">{{getMusicDurationTime}}</span>
    </div>

    <div class="controls">
      <img
        src="../assets/images/Last.png"
        class="music-control-btn"
        alt
        id="playLastMusicBtn"
        @click="playLastMusic"
      />
      <img
        v-if="!getPlayingStatus"
        src="../assets/images/Play-music.png"
        class="music-control-btn playPause"
        alt
        id="playPause"
        @click="changePlayStatus"
      />
      <img
        v-else
        src="../assets/images/media_music_pause.png"
        class="music-control-btn playPause"
        alt
        id="playPause"
        @click="stopMusic"
      />
      <img
        src="../assets/images/Next.png"
        class="music-control-btn"
        alt
        id="playnextMusicBtn"
        @click="playNextMusic"
      />
      <!-- <button class="play-pause"  id="playPause">
                  <span class="icon-btn icon-play"></span>
      </button>-->
    </div>
  </div>
</template>


<script>
var dotStart = 0,
  dotLeft = 0;
// dotStart=0,
// dotOffset=0;

export default {
  name: "MusicControl",
  data: function () {
    return {
      newTime: this.getMusicCurrentTime,
      value1: this.newTime,
    };
  },
  mounted: function () {
    //var that = this;
    // var pgs = document.getElementsByClassName("pgs");
    // var divSlider = document.getElementById("dot");
    // var dotStart = 0,
    //   diff = 0,
    //   _offset = 0;
    // var _left = 0;
    // divSlider.addEventListener("mousedown", mouseDown, true);
    // divSlider.addEventListener("mouseup", mouseUp, true);
    // function mouseDown() {
    //   var e = e || event;
    //   e.stopPropagation();
    //   that.$store.state.music.seeking = true;
    //   dotStart = e.clientX;
    //   _offset = 0;
    //   _left = window.getComputedStyle ? window.getComputedStyle(divSlider).left : divSlider.currentStyle.left;
    //   console.log(e.clientX);
    //   document.addEventListener("mousemove", sliderMove, false);
    // }
    // function mouseUp() {
    //   document.removeEventListener("mousemove", sliderMove, false);
    //   that.changeProgress();
    //   that.$store.state.music.seeking = false;
    //   _left = 0;
    //   return;
    //   // (dotStart = 0), (diff = 0);
    //   // document.removeEventListener("mousemove", sliderMove, false);
    //   // var value = (
    //   //   _offset.slice(0, _offset.length - 2) / pgs[0].clientWidth
    //   // ).toFixed(3);
    //   // console.log(value);
    //   // var _arr = that.getMusicDuration.split(":");
    //   // console.log('调整中');
    //   // console.log((parseInt(_arr[0]) * 60 + parseInt(_arr[1])) * value);
    //   // that.$store.commit({
    //   //   type: "music/setMusicCurrentTime",
    //   //   data: (parseInt(_arr[0]) * 60 + parseInt(_arr[1])) * value,
    //   // });
    //   // that.$store.commit({
    //   //   type: "music/resetMusicCurrentTime",
    //   //   data: (parseInt(_arr[0]) * 60 + parseInt(_arr[1])) * value,
    //   // });
    //   // that.$store.state.music.seeking = false;
    //   //   var dot = document.getElementsByClassName("dot");
    //   //   dot[0].style.left =
    //   //     -4 +
    //   //     Math.round(
    //   //       document.getElementsByClassName("pgs")[0].clientWidth * value
    //   //     ) +
    //   //     "px";
    // }
    // function sliderMove(e) {
    //   // 解决拖拽鼠标粘滞的问题
    //   // if (e.preventDefault) {
    //   //     e.preventDefault();
    //   // } else {
    //   //     e.returnValue = false;
    //   // }
    //   //console.log(e.clientX);
    //   diff = e.clientX - dotStart;
    //   console.log(diff);
    //   // console.log(pgs.style);
    //   if (_left + diff <= -4) {
    //     //diff = 0;
    //     _offset = -4 + "px";
    //   } else if (
    //     parseInt(_left.slice(0, _left.length - 2)) + diff >= pgs[0].clientWidth - 4
    //   ) {
    //     _offset = pgs[0].clientWidth - 4 + "px";
    //   } else {
    //     _offset = parseInt(_left.slice(0, _left.length - 2)) + diff + "px";
    //   }
    //   console.log(_offset);
    //   divSlider.style.left = _offset;
    //   // console.log('-----------------------');
    //   // console.log(diff);
    //   //console.log(parseInt(_left.slice(0,divSlider.style.left.length -2)) + diff + 'px');
    // }
  },
  computed: {
    musicProgress: function () {
      return this.$store.state.music.musicDuration;
    },
    getPlayingStatus() {
      return this.$store.state.music.playingStatus;
    },
    getCurrentPlayingID() {
      return this.$store.state.music.currentPlayingID;
    },
    getCurentPlayingMusicName() {
      return this.$store.state.music.curentPlayingMusicName;
    },
    getNavigationName() {
      return this.$store.state.music.navigationName;
    },
    getMusicArray() {
      return this.$store.state.music.musicArray;
    },
    getMusicDuration() {
      console.log(this.$store.state.music.musicDuration);
      return this.$store.state.music.musicDuration;
    },
    musicCurrent: {
      get: function () {
        return this.$store.state.music.musicCurrentTime;
      },
      set: function () {},
    },
    // musicCurrent :function(){
    //     return this.$store.state.music.musicCurrent;
    //   },
    getMusicCurrentTime() {
      return this.transTime(this.$store.state.music.musicCurrentTime);
    },
    getMusicDurationTime() {
      return this.transTime(this.$store.state.music.musicDuration);
    },
    time() {
      return this.$store.state.music.musicCurrentTime;
    },
    // currentTime:{
    //   get:function(){
    //     return this.time;
    //   },
    //   set:function(){

    //   }
    // },
    // currentTime(){

    // },
  },
  watch: {
    // 如果 `question` 发生改变，这个函数就会运行
    newTime: function () {
      this.value1 = this.currentTime;
    },
  },
  methods: {
    dotEnter: function () {
      let that = this;
      var divSlider = document.getElementById("dot");
      divSlider.addEventListener("mousedown", that.dotMouseDown, false);
      divSlider.addEventListener("mouseup", that.dotMouseUp, false);
    },
    dotLeave: function () {
      // let that = this;
      // var divSlider = document.getElementById("dot");
      // divSlider.removeEventListener("mousedown", that.dotMouseDown, false);
      // divSlider.removeEventListener("mouseup", that.dotMouseUp, false);
    },
    dotMouseDown: function (e) {
      let that = this;
      that.$store.state.music.seeking = true;
      dotStart = e.clientX;
      var divSlider = document.getElementById("dot");
      dotLeft = window.getComputedStyle
        ? window.getComputedStyle(divSlider).left
        : divSlider.currentStyle.left;
      // _offset = 0;
      // _left = window.getComputedStyle
      //   ? window.getComputedStyle(divSlider).left
      //   : divSlider.currentStyle.left;
      divSlider.addEventListener("mousemove", that.sliderMove(), false);
    },
    dotMouseUp: function () {
      // let that = this;
      // that.changeProgress();
      // that.$store.state.music.seeking = false;
      // return;
      // var divSlider = document.getElementById("dot");
      // var pgs = document.getElementsByClassName("pgs");
      // var _left = window.getComputedStyle
      //   ? window.getComputedStyle(divSlider).left
      //   : divSlider.currentStyle.left;
      // console.log("end");
      // //document.removeEventListener("mousemove", that.sliderMove, false);
      // var value = (
      //   _left.slice(0, _left.length - 2) / pgs[0].clientWidth
      // ).toFixed(3);
      // console.log(value);
      // var _arr = that.getMusicDuration.split(":");
      // console.log((parseInt(_arr[0]) * 60 + parseInt(_arr[1])) * value);
      // that.$store.commit({
      //   type: "music/setMusicCurrentTime",
      //   data: (parseInt(_arr[0]) * 60 + parseInt(_arr[1])) * value,
      // });
      // that.$store.commit({
      //   type: "music/resetMusicCurrentTime",
      //   data: (parseInt(_arr[0]) * 60 + parseInt(_arr[1])) * value,
      // });
      // that.$store.state.music.seeking = false;
    },
    sliderMove: function (e) {
      e = window.event || e;
      //  if (e.preventDefault) {
      //     e.preventDefault();
      // } else {
      //     e.returnValue = false;
      // }
      console.log(dotLeft);
      //let that = this;
      var divSlider = document.getElementById("dot");
      var pgs = document.getElementsByClassName("pgs");
      var diff = 0,
        _offset = 0;
      console.log(e.clientX);
      console.log(dotStart);
      diff = e.clientX - dotStart;
      console.log(diff);
      if (diff <= -4) {
        //diff = 0;
        _offset = -4;
      } else if (
        parseInt(dotLeft.slice(0, dotLeft.length - 2)) + diff >=
        pgs[0].clientWidth - 4
      ) {
        //pgs[0].clientWidth - 4 + "px";
        _offset = pgs[0].clientWidth - 4 + "px";
      } else {
        _offset = parseInt(dotLeft.slice(0, dotLeft.length - 2)) + diff;
        console.log(_offset);
      }
      console.log(_offset);
      divSlider.style.left = _offset + "px";
    },
    formatTooltip(val) {
      // console.log('3333333----');
      let that = this;
      that.$store.commit({
        type: "music/setMusicCurrentTime",
        data: val,
      });
      return val / 100;
    },
    changeCurrentTime: function (v) {
      let that = this;
      console.log("-------------------");
      console.log(v);
      if (that.$store.state.music.currentPlayingID == -1) {
        return;
      }
      that.$store.state.music.timesplit = v;

      that.$store.commit({
        type: "music/setMusicCurrent",
        data: v,
      });

      // this.$store.state.music.seeking = false;
    },

    // changeProgress: function (e) {
    //   let that = this;
    //   if (that.$store.state.music.currentPlayingID == -1) {
    //     return;
    //   }
    //   var e_ = window.event || e; // 兼容IE，FF事件源
    //   var x = e_.offsetX; // 获取鼠标位置
    //   //console.log(e_);
    //   //console.log(x);
    //   var pgs = document.getElementsByClassName("pgs");
    //   // console.log((x/ pgs[0].clientWidth).toFixed(3));
    //   // console.log(player);
    //   //console.log(that.$store.state);
    //   var value = (x / pgs[0].clientWidth).toFixed(3);
    //   // console.log(value);
    //   // console.log(that.getMusicDuration);
    //   var _arr = that.getMusicDuration.split(":");
    //   console.log((parseInt(_arr[0]) * 60 + parseInt(_arr[1])) * value);
    //   that.$store.commit({
    //     type: "music/setMusicCurrentTime",
    //     data: (parseInt(_arr[0]) * 60 + parseInt(_arr[1])) * value,
    //   });
    //   that.$store.commit({
    //     type: "music/resetMusicCurrentTime",
    //     data: (parseInt(_arr[0]) * 60 + parseInt(_arr[1])) * value,
    //   });
    //   // that.$store.state.music.player.currentTime =
    //   //   that.$store.state.music.player.duration * value;
    //   // console.log('-----------------------');
    //   // console.log(player.currentTime);
    //   // console.log(Math.floor(player.duration));
    //   //console.log(value);
    //   var dot = document.getElementsByClassName("dot");
    //   dot[0].style.left =
    //     -4 +
    //     Math.round(
    //       document.getElementsByClassName("pgs")[0].clientWidth * value
    //     ) +
    //     "px";

    //   // console.log((x/ pgs[0].clientWidth).toFixed(4));
    //   //         document.getElementsByClassName("pgs-play")[0].style.width =
    //   //           value + "%";
    //   //console.log(that);
    //   // document.getElementsByClassName(
    //   //   "played-time"
    //   // )[0].innerHTML = that.$store.getters({
    //   //   'type':'music/transTime',
    //   //   data:that.$store.state.music.player.currentTime,
    //   // });
    // },
    changePlayStatus: function () {
      this.$store.dispatch({
        type: "music/playMusicPrev",
      });
    },
    playLastMusic: function () {
      let that = this;
      if (that.$store.state.music.currentPlayingID == -1) {
        return;
      }
      that.$store.dispatch("music/playLastMusic");
    },
    playNextMusic: function () {
      let that = this;
      if (that.$store.state.music.currentPlayingID == -1) {
        return;
      }
      that.$store.dispatch("music/playNextMusic");
    },
    stopMusic: function () {
      let that = this;
      if (that.$store.state.music.currentPlayingID == -1) {
        return;
      }
      that.$store.dispatch("music/stopMusic");
      //that.$store.state.music.player.pause();
      //that.$store.state.music.playingStatus = false;
      //that.getPlayingStatus = false;
    },
    transTime: function (data) {
      //console.log(state);
      var duration = parseInt(data);
      var minute = parseInt(duration / 60);
      var sec = (duration % 60) + "";
      var isM0 = ":";
      if (minute == 0) {
        minute = "00";
      } else if (minute < 10) {
        minute = "0" + minute;
      }
      if (sec.length == 1) {
        sec = "0" + sec;
      }
      return minute + isM0 + sec;
    },
  },
};
</script>

<style lang="scss" scoped>
@media (max-width: 320px) {
  .music-content-logo {
    width: 100%;
    margin: 0 auto;
  }
  .music-content-list {
    margin-top: 1rem;
  }
  .music-list-content {
    $height: 1.7rem;
    min-height: $height * 10;
    .music-list {
      list-style: none;
      li {
        position: relative;
        height: $height;
        line-height: $height;
        img {
          position: absolute;
          right: 0.4rem;
          top: 0.3rem;
        }
        > .list-play-btn {
          width: 1rem;
          height: 1rem;
        }
      }
      li:nth-child(odd) {
        background-color: #9e3084;
      }
    }
    .music-order {
      font-size: 0.6rem;
      width: 1.8rem;
      display: inline-block;
      text-align: center;
      color: white;
      vertical-align: middle;
    }
    .music-filename {
      display: inline-block;
      font-size: 0.6rem;
      color: white;
      max-width: 210px;
      vertical-align: middle;
    }
  }
  .el-collapse {
    border: none;
  }
  .Audio {
    position: relative;
    width: 100%;
    margin: 0 auto;
  }
  .music-bar {
    justify-content: space-around;
    align-items: center;
    font-size: 0.9rem;
  }
  .pgb {
    width: 140px;
  }
  .pgs {
    background-color: #e3e8ee;
    //text-align: center;
    position: relative;
    // overflow: hidden;
    // border-radius: 5px;
    height: 2px;
    // text-align: left;
    // flex-basis: 150px;
    margin: 0 0.8rem;
    .dot {
      width: 8px;
      height: 8px;
      border-radius: 4px;
      background-color: #4785f9;
      display: inline-block;
      /* margin-top: -3px; */
      position: absolute;
      top: -3px;
      z-index: 2;
      left: -4px;
    }
  }
  .pgs-play {
    position: relative;
    top: -8px;
    left: 0;
    display: inline-block;
    width: 0;
    height: 100%;
    background-color: #4785f9;
    z-index: 1;
  }

  .pgs img {
    width: 100%;
    position: relative;
    z-index: 2;
  }
  .audio-name {
    position: absolute;
    top: 0;
    width: 100%;
    left: 0;
    text-align: center;
    color: #666;
    font-size: 12px;
  }
  .controls {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    padding: 0;
    > .music-control-btn {
      width: 30px;
      height: 30px;
    }
    #playPause {
      width: 45px;
      height: 45px;
      margin-left: 1rem;
      margin-right: 1rem;
    }
  }
  .audio-time {
    display: inline-block;
    vertical-align: middle;
  }

  .music-control-btn {
    width: 35px;
    height: 35px;
  }
  .music-list-page-decorat-left,
  .music-list-page-decorat-right {
    display: none;
  }
}

@media (min-width: 321px) and (max-width: 360px) {
  .music-content-logo {
    width: 94%;
    margin: 0 auto;
  }
  .music-content-list {
    margin-top: 1rem;
  }
  .music-list-content {
    $height: 1.8rem;
    min-height: $height * 10;
    .music-list {
      list-style: none;
      li {
        position: relative;
        height: $height;
        line-height: $height;
        img {
          position: absolute;
          right: 0.5rem;
          top: 0.3rem;
        }
        > .list-play-btn {
          width: 1.1rem;
          height: 1.1rem;
        }
      }
      li:nth-child(odd) {
        background-color: #9e3084;
      }
    }
    .music-order {
      font-size: 0.65rem;
      width: 2rem;
      display: inline-block;
      text-align: center;
      color: white;
      vertical-align: middle;
    }
    .music-filename {
      display: inline-block;
      font-size: 0.65rem;
      color: white;
      max-width: 240px;
      vertical-align: middle;
    }
  }
  .el-collapse {
    border: none;
  }
  .Audio {
    position: relative;
    width: 100%;
    margin: 0 auto;
  }
  .music-bar {
    justify-content: space-between;
    align-items: center;
    font-size: 0.9rem;
  }
  .pgb {
    width: 170px;
  }
  .pgs {
    background-color: #e3e8ee;
    //text-align: center;
    position: relative;
    // overflow: hidden;
    // border-radius: 5px;
    height: 2px;
    // text-align: left;
    // flex-basis: 150px;
    margin: 0 0.8rem;
    .dot {
      width: 8px;
      height: 8px;
      border-radius: 4px;
      background-color: #4785f9;
      display: inline-block;
      /* margin-top: -3px; */
      position: absolute;
      top: -3px;
      z-index: 2;
      left: -4px;
    }
  }
  .pgs-play {
    position: relative;
    top: -8px;
    left: 0;
    display: inline-block;
    width: 0;
    height: 100%;
    background-color: #4785f9;
    z-index: 1;
  }

  .pgs img {
    width: 100%;
    position: relative;
    z-index: 2;
  }
  .audio-name {
    position: absolute;
    top: 0;
    width: 100%;
    left: 0;
    text-align: center;
    color: #666;
    font-size: 12px;
  }
  .controls {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    padding: 0;
    > .music-control-btn {
      width: 30px;
      height: 30px;
    }
    #playPause {
      width: 45px;
      height: 45px;
      margin-left: 1rem;
      margin-right: 1rem;
    }
  }
  .audio-time {
    display: inline-block;
    vertical-align: middle;
  }

  .music-control-btn {
    width: 35px;
    height: 35px;
  }
  .music-list-page-decorat-left,
  .music-list-page-decorat-right {
    display: none;
  }
}

@media (min-width: 361px) and (max-width: 420px) {
  .music-content-logo {
    width: 90%;
    margin: 0 auto;
  }
  .music-content-list {
    margin-top: 1rem;
  }
  .music-list-content {
    $height: 1.9rem;
    min-height: $height * 10;
    .music-list {
      list-style: none;
      li {
        position: relative;
        height: $height;
        line-height: $height;
        img {
          position: absolute;
          right: 0.5rem;
          top: 0.3rem;
        }
        > .list-play-btn {
          width: 1.2rem;
          height: 1.2rem;
        }
      }
      li:nth-child(odd) {
        background-color: #9e3084;
      }
    }
    .music-order {
      font-size: 0.7rem;
      width: 2.4rem;
      display: inline-block;
      text-align: center;
      color: white;
      vertical-align: middle;
    }
    .music-filename {
      display: inline-block;
      font-size: 0.7rem;
      color: white;
      max-width: 255px;
      vertical-align: middle;
    }
  }
  .el-collapse {
    border: none;
  }
  .Audio {
    position: relative;
    width: 100%;
    margin: 0 auto;
  }
  .music-bar {
    justify-content: space-between;
    align-items: center;
    font-size: 0.9rem;
  }
  .pgb {
    width: 190px;
  }
  .pgs {
    background-color: #e3e8ee;
    //text-align: center;
    position: relative;
    // overflow: hidden;
    // border-radius: 5px;
    height: 2px;
    // text-align: left;
    // flex-basis: 150px;
    margin: 0 0.8rem;
    .dot {
      width: 8px;
      height: 8px;
      border-radius: 4px;
      background-color: #4785f9;
      display: inline-block;
      /* margin-top: -3px; */
      position: absolute;
      top: -3px;
      z-index: 2;
      left: -4px;
    }
  }
  .pgs-play {
    position: relative;
    top: -8px;
    left: 0;
    display: inline-block;
    width: 0;
    height: 100%;
    background-color: #4785f9;
    z-index: 1;
  }

  .pgs img {
    width: 100%;
    position: relative;
    z-index: 2;
  }
  .audio-name {
    position: absolute;
    top: 0;
    width: 100%;
    left: 0;
    text-align: center;
    color: #666;
    font-size: 12px;
  }
  .controls {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    padding: 0;
    > .music-control-btn {
      width: 30px;
      height: 30px;
    }
    #playPause {
      width: 45px;
      height: 45px;
      margin-left: 1rem;
      margin-right: 1rem;
    }
  }
  .audio-time {
    display: inline-block;
    vertical-align: middle;
  }

  .music-control-btn {
    width: 35px;
    height: 35px;
  }
  .music-list-page-decorat-left,
  .music-list-page-decorat-right {
    display: none;
  }
}

@media (min-width: 421px) and (max-width: 520px) {
  .music-content-logo {
    width: 80%;
    margin: 0 auto;
  }
  .music-content-list {
    margin-top: 1rem;
  }
  .music-list-content {
    $height: 2rem;
    min-height: $height * 10;
    .music-list {
      list-style: none;
      li {
        position: relative;
        height: $height;
        line-height: $height;
        img {
          position: absolute;
          right: 0.6rem;
          top: 0.3rem;
        }
        > .list-play-btn {
          width: 1.3rem;
          height: 1.3rem;
        }
      }
      li:nth-child(odd) {
        background-color: #9e3084;
      }
    }
    .music-order {
      font-size: 0.8rem;
      width: 2.8rem;
      display: inline-block;
      text-align: center;
      color: white;
      vertical-align: middle;
    }
    .music-filename {
      display: inline-block;
      font-size: 0.8rem;
      color: white;
      max-width: 300px;
      vertical-align: middle;
    }
  }

  .el-collapse {
    border: none;
  }
  .Audio {
    position: relative;
    width: 100%;
    margin: 0 auto;
  }
  .music-bar {
    justify-content: space-between;
    align-items: center;
    font-size: 0.9rem;
  }
  .pgb {
    width: 200px;
  }
  .pgs {
    background-color: #e3e8ee;
    //text-align: center;
    position: relative;
    // overflow: hidden;
    // border-radius: 5px;
    height: 2px;
    // text-align: left;
    // flex-basis: 150px;
    margin: 0 0.8rem;
    .dot {
      width: 8px;
      height: 8px;
      border-radius: 4px;
      background-color: #4785f9;
      display: inline-block;
      /* margin-top: -3px; */
      position: absolute;
      top: -3px;
      z-index: 2;
      left: -4px;
    }
  }
  .pgs-play {
    position: relative;
    top: -8px;
    left: 0;
    display: inline-block;
    width: 0;
    height: 100%;
    background-color: #4785f9;
    z-index: 1;
  }

  .pgs img {
    width: 100%;
    position: relative;
    z-index: 2;
  }
  .audio-name {
    position: absolute;
    top: 0;
    width: 100%;
    left: 0;
    text-align: center;
    color: #666;
    font-size: 12px;
  }
  .controls {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    padding: 0;
    > .music-control-btn {
      width: 30px;
      height: 30px;
    }
    #playPause {
      width: 45px;
      height: 45px;
      margin-left: 1rem;
      margin-right: 1rem;
    }
  }
  .audio-time {
    display: inline-block;
    vertical-align: middle;
  }

  .music-control-btn {
    width: 35px;
    height: 35px;
  }
  .music-list-page-decorat-left,
  .music-list-page-decorat-right {
    display: none;
  }
}

@media (min-width: 521px) and (max-width: 640px) {
  .music-content-logo {
    width: 70%;
    margin: 0 auto;
  }
  .music-content-list {
    margin-top: 1rem;
  }
  .music-list-content {
    $height: 2.1rem;
    min-height: $height * 10;
    .music-list {
      list-style: none;
      li {
        position: relative;
        height: $height;
        line-height: $height;
        img {
          position: absolute;
          right: 0.7rem;
          top: 0.3rem;
        }
        > .list-play-btn {
          width: 1.4rem;
          height: 1.4rem;
        }
      }
      li:nth-child(odd) {
        background-color: #9e3084;
      }
    }
    .music-order {
      font-size: 0.9rem;
      width: 3.2rem;
      display: inline-block;
      text-align: center;
      color: white;
      vertical-align: middle;
    }
    .music-filename {
      display: inline-block;
      font-size: 0.9rem;
      color: white;
      max-width: 380px;
      vertical-align: middle;
    }
  }

  .el-collapse {
    border: none;
  }
  .Audio {
    position: relative;
    width: 100%;
    margin: 0 auto;
  }
  .music-bar {
    justify-content: space-between;
    align-items: center;
    font-size: 0.9rem;
  }
  .pgb {
    width: 210px;
  }
  .pgs {
    background-color: #e3e8ee;
    //text-align: center;
    position: relative;
    // overflow: hidden;
    // border-radius: 5px;
    height: 2px;
    // text-align: left;
    // flex-basis: 150px;
    margin: 0 0.8rem;
    .dot {
      width: 8px;
      height: 8px;
      border-radius: 4px;
      background-color: #4785f9;
      display: inline-block;
      /* margin-top: -3px; */
      position: absolute;
      top: -3px;
      z-index: 2;
      left: -4px;
    }
  }
  .pgs-play {
    position: relative;
    top: -8px;
    left: 0;
    display: inline-block;
    width: 0;
    height: 100%;
    background-color: #4785f9;
    z-index: 1;
  }

  .pgs img {
    width: 100%;
    position: relative;
    z-index: 2;
  }
  .audio-name {
    position: absolute;
    top: 0;
    width: 100%;
    left: 0;
    text-align: center;
    color: #666;
    font-size: 12px;
  }
  .controls {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    padding: 0;
    > .music-control-btn {
      width: 35px;
      height: 35px;
    }
    #playPause {
      width: 50px;
      height: 50px;
      margin-left: 1rem;
      margin-right: 1rem;
    }
  }
  .audio-time {
    display: inline-block;
    vertical-align: middle;
  }

  .music-control-btn {
    width: 40px;
    height: 40px;
  }
  .music-list-page-decorat-left,
  .music-list-page-decorat-right {
    display: none;
  }
}

@media (min-width: 641px) and (max-width: 768px) {
  .music-content-logo {
    width: 60%;
    margin: 0 auto;
  }
  .music-content-list {
    margin-top: 1rem;
  }
  .music-list-content {
    $height: 2.2rem;
    min-height: $height * 10;
    .music-list {
      list-style: none;
      li {
        position: relative;
        height: $height;
        line-height: $height;
        img {
          position: absolute;
          right: 0.8rem;
          top: 0.3rem;
        }
        > .list-play-btn {
          width: 1.5rem;
          height: 1.5rem;
        }
      }
      li:nth-child(odd) {
        background-color: #9e3084;
      }
    }
    .music-order {
      font-size: 1rem;
      width: 3.6rem;
      display: inline-block;
      text-align: center;
      color: white;
      vertical-align: middle;
    }
    .music-filename {
      display: inline-block;
      font-size: 1rem;
      color: white;
      max-width: 470px;
      vertical-align: middle;
    }
  }

  .el-collapse {
    border: none;
  }
  .Audio {
    position: relative;
    width: 100%;
    margin: 0 auto;
  }
  .music-bar {
    justify-content: space-between;
    align-items: center;
    font-size: 0.9rem;
  }
  .pgb {
    width: 240px;
  }
  .pgs {
    background-color: #e3e8ee;
    //text-align: center;
    position: relative;
    // overflow: hidden;
    // border-radius: 5px;
    height: 2px;
    // text-align: left;
    // flex-basis: 150px;
    margin: 0 0.8rem;
    .dot {
      width: 8px;
      height: 8px;
      border-radius: 4px;
      background-color: #4785f9;
      display: inline-block;
      /* margin-top: -3px; */
      position: absolute;
      top: -3px;
      z-index: 2;
      left: -4px;
    }
  }
  .pgs-play {
    position: relative;
    top: -8px;
    left: 0;
    display: inline-block;
    width: 0;
    height: 100%;
    background-color: #4785f9;
    z-index: 1;
  }

  .pgs img {
    width: 100%;
    position: relative;
    z-index: 2;
  }
  .audio-name {
    position: absolute;
    top: 0;
    width: 100%;
    left: 0;
    text-align: center;
    color: #666;
    font-size: 12px;
  }
  .controls {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    padding: 0;
    > .music-control-btn {
      width: 35px;
      height: 35px;
    }
    #playPause {
      width: 50px;
      height: 50px;
      margin-left: 1rem;
      margin-right: 1rem;
    }
  }
  .audio-time {
    display: inline-block;
    vertical-align: middle;
  }

  .music-control-btn {
    width: 40px;
    height: 40px;
  }
  .music-list-page-decorat-left,
  .music-list-page-decorat-right {
    display: none;
  }
}

@media (min-width: 769px) and (max-width: 992px) {
  .music-content {
    display: flex;
  }
  .music-content-logo {
    width: 28%;
  }
  .music-content-list {
    width: 72%;
  }
  .music-list-content {
    $height: 2.4rem;
    min-height: $height * 10;
    .music-list {
      list-style: none;
      li {
        position: relative;
        height: $height;
        line-height: $height;
        img {
          position: absolute;
          right: 0.8rem;
          top: 0.5rem;
        }
        > .list-play-btn {
          width: 1.3rem;
          height: 1.3rem;
        }
      }
      li:nth-child(odd) {
        background-color: #9e3084;
      }
    }
    .music-order {
      font-size: 0.8rem;
      width: 3.2rem;
      display: inline-block;
      text-align: center;
      color: white;
      vertical-align: middle;
    }
    .music-filename {
      display: inline-block;
      font-size: 0.9rem;
      color: white;
      max-width: 320px;
      vertical-align: middle;
    }
  }
  .el-collapse {
    border: none;
  }
  .Audio {
    position: relative;
    width: 100%;
    margin: 0 auto;
  }
  .music-bar {
    justify-content: space-around;
    align-items: center;
    font-size: 0.8rem;
  }
  .pgb {
    width: 96px;
  }
  .pgs {
    background-color: #e3e8ee;
    //text-align: center;
    position: relative;
    // overflow: hidden;
    // border-radius: 5px;
    height: 2px;
    // text-align: left;
    // flex-basis: 150px;
    .dot {
      width: 8px;
      height: 8px;
      border-radius: 4px;
      background-color: #4785f9;
      display: inline-block;
      /* margin-top: -3px; */
      position: absolute;
      top: -3px;
      z-index: 2;
      left: -4px;
    }
  }
  .pgs-play {
    position: relative;
    top: -8px;
    left: 0;
    display: inline-block;
    width: 0;
    height: 100%;
    background-color: #4785f9;
    z-index: 1;
  }

  .pgs img {
    width: 100%;
    position: relative;
    z-index: 2;
  }
  .music-bar {
    justify-content: space-around;
    font-size: 0.8rem;
  }
  .audio-name {
    position: absolute;
    top: 0;
    width: 100%;
    left: 0;
    text-align: center;
    color: #666;
    font-size: 12px;
  }
  .controls {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    padding: 0;
    > .music-control-btn {
      width: 30px;
      height: 30px;
    }
    #playPause {
      width: 45px;
      height: 45px;
      margin-left: 0.7rem;
      margin-right: 0.7rem;
    }
  }
  .audio-time {
    display: inline-block;
    vertical-align: middle;
  }
  .music-list-page-decorat-left,
  .music-list-page-decorat-right {
    display: inline-block;
    width: 30px;
    height: 2px;
    background-color: #fff;
  }
}

@media (min-width: 993px) and (max-width: 1200px) {
  .music-content {
    display: flex;
  }
  .music-content-logo {
    width: 25%;
  }
  .music-content-list {
    width: 75%;
  }
  .music-list-content {
    $height: 2.5rem;
    min-height: $height * 10;
    .music-list {
      list-style: none;
      li {
        position: relative;
        height: $height;
        line-height: $height;
        img {
          position: absolute;
          right: 1rem;
          top: 0.5rem;
        }
        > .list-play-btn {
          width: 1.5rem;
          height: 1.5rem;
        }
      }
      li:nth-child(odd) {
        background-color: #9e3084;
      }
    }
    .music-order {
      font-size: 0.9rem;
      width: 3.6rem;
      display: inline-block;
      text-align: center;
      color: white;
      vertical-align: middle;
    }
    .music-filename {
      display: inline-block;
      font-size: 1rem;
      color: white;
      max-width: 460px;
      vertical-align: middle;
    }
  }
  .el-collapse {
    border: none;
  }
  .Audio {
    position: relative;
    width: 100%;
    margin: 0 auto;
  }
  .music-bar {
    justify-content: space-around;
    align-items: center;
    font-size: 0.9rem;
  }
  .pgb {
    width: 116px;
  }
  .pgs {
    background-color: #e3e8ee;
    //text-align: center;
    position: relative;
    // overflow: hidden;
    // border-radius: 5px;
    height: 2px;
    // text-align: left;
    // flex-basis: 150px;
    .dot {
      width: 8px;
      height: 8px;
      border-radius: 4px;
      background-color: #4785f9;
      display: inline-block;
      /* margin-top: -3px; */
      position: absolute;
      top: -3px;
      z-index: 2;
      left: -4px;
    }
  }
  .pgs-play {
    position: relative;
    top: -8px;
    left: 0;
    display: inline-block;
    width: 0;
    height: 100%;
    background-color: #4785f9;
    z-index: 1;
  }

  .pgs img {
    width: 100%;
    position: relative;
    z-index: 2;
  }
  .audio-name {
    position: absolute;
    top: 0;
    width: 100%;
    left: 0;
    text-align: center;
    color: #666;
    font-size: 12px;
  }
  .controls {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    padding: 0;
    > .music-control-btn {
      width: 35px;
      height: 35px;
    }
    #playPause {
      width: 50px;
      height: 50px;
      margin-left: 1rem;
      margin-right: 1rem;
    }
  }
  .audio-time {
    display: inline-block;
    vertical-align: middle;
  }
  .music-list-page-decorat-left,
  .music-list-page-decorat-right {
    display: inline-block;
    width: 30px;
    height: 2px;
    background-color: #fff;
  }
}

@media (min-width: 1201px) {
  .music-content {
    display: flex;
  }
  .music-content-logo {
    width: 24%;
  }
  .music-content-list {
    width: 76%;
  }
  .music-list-content {
    $height: 2.6rem;
    min-height: $height * 10;
    .music-list {
      list-style: none;
      li {
        position: relative;
        height: $height;
        line-height: $height;
        img {
          position: absolute;
          right: 1.2rem;
          top: 0.5rem;
        }
        > .list-play-btn {
          width: 1.6rem;
          height: 1.6rem;
        }
      }
      li:nth-child(odd) {
        background-color: #9e3084;
      }
    }
    .music-order {
      font-size: 1rem;
      width: 4rem;
      display: inline-block;
      text-align: center;
      color: white;
      vertical-align: middle;
    }
    .music-filename {
      display: inline-block;
      font-size: 1rem;
      color: white;
      max-width: 600px;
      vertical-align: middle;
    }
  }

  .el-collapse {
    border: none;
  }
  .Audio {
    position: relative;
    width: 100%;
    margin: 0 auto;
  }
  .music-bar {
    justify-content: space-around;
    align-items: center;
    font-size: 0.9rem;
  }
  .pgb {
    width: 150px;
  }
  .pgs {
    background-color: #e3e8ee;
    //text-align: center;
    position: relative;
    // overflow: hidden;
    // border-radius: 5px;
    height: 2px;
    // text-align: left;
    // flex-basis: 150px;
    width: 150px;
    .dot {
      width: 8px;
      height: 8px;
      border-radius: 4px;
      background-color: #4785f9;
      display: inline-block;
      /* margin-top: -3px; */
      position: absolute;
      //top: -3px;
      top: 1px;
      z-index: 2;
      left: -4px;
    }
  }
  .pgs-play {
    position: relative;
    top: -8px;
    left: 0;
    display: inline-block;
    width: 0;
    height: 100%;
    background-color: #4785f9;
    z-index: 1;
  }

  .pgs img {
    width: 100%;
    position: relative;
    z-index: 2;
  }
  .audio-name {
    position: absolute;
    top: 0;
    width: 100%;
    left: 0;
    text-align: center;
    color: #666;
    font-size: 12px;
  }
  .controls {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    padding: 0;
    > .music-control-btn {
      width: 35px;
      height: 35px;
    }
    #playPause {
      width: 50px;
      height: 50px;
      margin-left: 1rem;
      margin-right: 1rem;
    }
  }

  .audio-time {
    display: inline-block;
    vertical-align: middle;
  }
  .music-list-page-decorat-left,
  .music-list-page-decorat-right {
    display: inline-block;
    width: 30px;
    height: 2px;
    background-color: #fff;
  }
}

// .pagination {
//   img {
//     width: 2rem;
//     height: 2rem;
//   }
// }
// .pagination-btn-web {
//   width: 2rem;
//   height: 2rem;
//   margin: 200px 5px;
// }
// .pagination-btn-mobile {
//   display: none;
// }

// .play-pause {
//   border: 0;
//   outline: 0;
//   padding: 0;
//   width: 40px;
//   height: 40px;
//   margin: 0 28px;
//   background: none;
//   display: inline-block;
//   vertical-align: middle;
// }
// .controls span {
//   color: #b3b5b7;
//   font-size: 12px;
//   display: inline-block;
//   width: 34px;
// }

.flex-1 {
  flex: 1;
}
.music-list-collapse {
  .music-list {
    li:nth-child(odd) {
      background-color: transparent;
    }
  }
}
</style>