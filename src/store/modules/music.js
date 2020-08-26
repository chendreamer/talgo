const state = {
  player: {},//播放器对象
  playList: [], //播放列表
  currentPlayingID: -1,//当前播放音乐的id
  playingStatus: false, //播放状态 true:播放中  false:暂停
  musicURL: '', //当前播放的音乐地址
  curentPlayingMusicName: "", //当前播放音乐名称 
  musicArray: [], //普通音乐列表
  singerOrAlubmArray: [], //歌手专辑列表
  navigationName: "All",
  media_server: 'http://172.19.6.4',//媒体服务器ip
  musicDuration:'00:00',  //音乐总时长
  musicCurrentTime:'00:00',  //音乐当前时间
}

// getters
const getters = {
  getMusicURL: function (state) {
    var _musicURL = '';
    console.log(state);
    for (let i = 0; i < state.playList.length; i++) {
      if (state.playList[i]["id"] == state.currentPlayingID) {
        _musicURL = state.media_server + state.playList[i]["filepath"];
        break;
      }
    }
    return _musicURL;
  },
  getCurentPlayingMusicName: function (state) {
    var _curentPlayingMusicName = '';
    for (let i = 0; i < state.playList.length; i++) {
      if (state.playList[i]["id"] == state.currentPlayingID) {
        _curentPlayingMusicName = state.playList[i]["title"];
        break;
      }
    }
    return _curentPlayingMusicName;
  },
  transTime : function(data) {
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
}

// mutations
const mutations = {
  setPlayList: function (state, data) {   //设置播放列表
    state.playList = data.data;
  },
  setCurrentPlayingID: function (state, data) {  //设置当前播放音乐
    state.currentPlayingID = data.data;
  },
  setMusicDuration: function (state, data) {  //设置音乐总时长
    state.musicDuration =  getters.transTime(data.data);
  },
  setMusicCurrentTime: function (state, data) {  //设置音乐当前位置时间
    state.musicCurrentTime = getters.transTime(data.data);
  },
  resetMusicCurrentTime:function(state, data){   //重置音乐当前位置
    state.player.currentTime = data.data;
  }
}

// actions
const actions = {
  initPlayer: function (context) {
    //var that = this;

    //console.log(state.playList);
    //console.log(state.currentPlayingID);
    state.player = document.getElementById("audioTag");
    //let playPause = document.getElementsByClassName("playPause");
    var dot = document.getElementsByClassName("dot");
    var pgs = document.getElementsByClassName("pgs");
    var play_time = document.getElementsByClassName("played-time");
    //var audioTime = document.getElementsByClassName("audio-time");
    console.log("init player-----------------------------");
    //console.log(state.player);
    //console.log(playPause);
    state.player.setAttribute('src', getters.getMusicURL(state));
    // playPause.onclick = function () {
    //   if (state.player.paused) {
    //     state.player.play();
    //     state.playingStatus = true;
    //   } else {
    //     state.player.pause();
    //     state.playingStatus = false;
    //   }
    // };
    //连续播放的两首歌内容相同，则重新播放，无需执行player.onloadedmetadata
    if (state.player.readyState) {
      state.player.currentTime = 0;
      state.player.play();
      state.playingStatus = true;
    }

    //console.log(audioTime);
    state.player.onloadedmetadata = function () {
      //audioTime.innerHTML = that.transTime(state.player.duration);
      // context.commit({
      //   type: "transTime",
      //   data: state.player.duration,
      // });
      // context.commit({
      //   type: "setCurrentPlayingID",
      //   data: state.player.duration,
      // });
      context.commit({
        type: "setMusicDuration",
        data: state.player.duration,
      });
      //audioTime[0].innerHTML = getters.transTime(state.player.duration);
      state.curentPlayingMusicName = getters.getCurentPlayingMusicName(state);
      console.log("start play");
      state.player.play();
      state.playingStatus = true;
    };


    state.player.ontimeupdate = function () {
      // console.log(dot);
      // console.log(pgs);
      // console.log(play_time);
      if (dot.length == 0 || pgs.length == 0 || play_time.length == 0) {
        return;
      }
      // var value = Math.round(
      //   (Math.floor(player.currentTime) / Math.floor(player.duration)) * 100,
      //   0
      // );
      // var value = Math.round(
      //   (Math.floor(player.currentTime) / Math.floor(player.duration))* 100,
      //   0
      // );
      var value = (state.player.currentTime / state.player.duration).toFixed(3);
      // console.log('-----------------------');
      // console.log(player.currentTime);
      // console.log(Math.floor(player.duration));
      //console.log(value);

      dot[0].style.left = -4 + Math.round(pgs[0].clientWidth * value) + "px";

      // console.log((x/ pgs[0].clientWidth).toFixed(4));
      //         document.getElementsByClassName("pgs-play")[0].style.width =
      //           value + "%";
      //当前时间
      
      context.commit({
        type: "setMusicCurrentTime",
        data: state.player.currentTime,
      });


      //play_time[0].innerHTML = getters.transTime(state.player.currentTime);
      //总长
      context.commit({
        type: "setMusicDuration",
        data: state.player.duration,
      });
      //audioTime[0].innerHTML = getters.transTime(state.player.duration);


      // context.commit({
      //   type: "transTime",
      //   data: state.player.currentTime,
      // }) ;

      // console.log( context.commit({
      //   type: "transTime",
      //   data: state.player.currentTime,
      // }));


      //transTime(state.player.currentTime);            
    };
    state.player.onended = function () {
      state.playingStatus = false;
      //state.stopMusic();
      context.dispatch("stopMusic");
      context.dispatch("playNextMusic");
      //state.playNextMusic();
    };
  },
  playMusicPrev:function(){
    if(state.currentPlayingID == -1){
      return;
    }
    if (state.player.paused) {
          state.player.play();
          state.playingStatus = true;
        } else {
          state.player.pause();
          state.playingStatus = false;
        }
  },
  playMusic: function (context, data) {
    let that = this;
    console.log(data);
    if (state.getPlayingStatus) {
      console.log("重置了！");
      state.player.pause();
      state.playingStatus = false;
    }

    if (typeof data.index != "undefined") {
      if (data.index != state.currentPlayingID) {
        //如果当前正在播放，先暂停，再重置
        state.player = null;
      } else {
        //当前有正在播放的歌曲
        state.player.play();
        state.playingStatus = true;
        return;
      }
      context.commit({
        type: "setCurrentPlayingID",
        data: data.index,
      });
      console.log(that);
      context.dispatch({
        type: "replacePlayList",
        index: data.index,
        outIndex: data.outIndex
      });
    }
    // that.$nextTick(function () {
    context.dispatch("initPlayer");
    //});
  },
  stopMusic: function () {
    state.player.pause();
    state.playingStatus = false;
    //that.getPlayingStatus = false;
  },
  playLastMusic: function (context) {
    //let that = this;
    //this.$refs.refName.$el.click();
    //console.log(this.$refs);
    //this.$refs.listPlayBtnRef257[0].click();
    for (var i = 0; i < state.playList.length; i++) {
      if (state.currentPlayingID == state.playList[i]["id"]) {
        if (i == 0) {
          state.currentPlayingID = state.playList[state.playList.length - 1][
            "id"
          ];
        } else {
          state.currentPlayingID = state.playList[i - 1]["id"];
        }
        break;
      }
    }
    context.dispatch({
      type: "playMusic"
    });
    //that.$nextTick(function () {
    //  actions.playMusic();
    //});
  },
  playNextMusic: function (context) {
    //let that = this;
    // console.log(this.$refs);
    //this.$refs.listPlayBtnRef257[0].click();
    // console.log("------------------");
    console.log(state.playList);
    console.log(state.currentPlayingID);
    for (var i = 0; i < state.playList.length; i++) {
      if (state.currentPlayingID == state.playList[i]["id"]) {
        if (i == state.playList.length - 1) {
          state.currentPlayingID = state.playList[0]["id"];
        } else {
          state.currentPlayingID = state.playList[i + 1]["id"];
        }
        break;
      }
    }
    //console.log(state.currentPlayingID);
    context.dispatch({
      type: "playMusic"
    });
  },
  replacePlayList(context, index, outIndex) {
    console.log("PlayList changed");
    //此处要深拷贝
    //let that = this;
    if (state.navigationName == "Singer" || state.navigationName == "Album") {
      context.commit({
        type: "setPlayList",
        data: [...state.singerOrAlubmArray[outIndex]["audio"]],
      });
      //  that.$store.state.playList = ;
    } else {
      context.commit({
        type: "setPlayList",
        data: [...state.musicArray],
      });
      //  that.$store.state.playList = [...that.musicArray];
    }
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}