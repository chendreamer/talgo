<template>
  <div>
    <el-container class="container">
      <el-header>
        <Header></Header>
      </el-header>
      <div>
        <multimedia-logo pagename="music"></multimedia-logo>
      </div>
      <div class="music-content">
        <div class="tc music-content-logo">
          <page-logo pagename="music"></page-logo>
          <!-- <audio :src="musicURL" id="music" controls ></audio> -->
          <music-control></music-control>
        </div>
        <div class="music-content-list">
          <FilterList module_name="audio" @navigation="getList"></FilterList>
          <!-- <div v-if="loadingState" class="loading-content">
            <img src="../assets/images/loading.gif" alt />
          </div>-->
          <div
            class="df music-list-content"
            v-loading="loadingState"
            element-loading-background="transparent"
          >
            <img src="../assets/images/left-arrow.png" @click="prevPage" class="pagination-btn-web" />
            <!-- 歌手列表 -->
            <el-collapse
              class="music-list-collapse flex-1"
              v-if="getNavigationName =='Singer'"
              v-model="activeName"
              accordion
            >
              <el-collapse-item
                :name="index"
                v-for="(item,index) in getSingerOrAlubmArray"
                :key="index"
              >
                <template slot="title">
                  <span class="music-order">{{index+1}}</span>
                  <span class="music-filename ellipsis">{{item.singer}}</span>
                </template>
                <ol class="music-list">
                  <li v-for="(childItem,chilIndex) in item.audio" :key="chilIndex">
                    <span class="music-order">{{chilIndex+1}}</span>
                    <span class="music-filename ellipsis">{{childItem.title}}</span>
                    <img
                      class="list-play-btn"
                      src="../assets/images/media_music_list_pause.png"
                      v-if="childItem.id == getCurrentPlayingID && getPlayingStatus"
                      @click="stopMusic(childItem.id)"
                    />
                    <img
                      class="list-play-btn"
                      src="../assets/images/play_music.png"
                      v-else
                      @click="playMusic(childItem.id,index)"
                    />
                  </li>
                </ol>
              </el-collapse-item>
            </el-collapse>
            <!-- 专辑列表 -->
            <el-collapse
              class="music-list-collapse flex-1"
              v-model="activeName"
              accordion
              v-else-if="getNavigationName =='Album'"
            >
              <el-collapse-item
                :name="index"
                v-for="(item,index) in getSingerOrAlubmArray"
                :key="index"
              >
                <template slot="title">
                  <span class="music-order">{{index+1}}</span>
                  <span class="music-filename ellipsis">{{item.album}}</span>
                </template>
                <ol class="music-list">
                  <li v-for="(childItem,chilIndex) in item.audio" :key="chilIndex">
                    <span class="music-order">{{chilIndex+1}}</span>
                    <span class="music-filename ellipsis">{{childItem.title}}</span>
                    <img
                      class="list-play-btn"
                      src="../assets/images/media_music_list_pause.png"
                      v-if="childItem.id == getCurrentPlayingID && getPlayingStatus"
                      @click="stopMusic(childItem.id)"
                    />
                    <img
                      src="../assets/images/play_music.png"
                      class="list-play-btn"
                      v-else
                      @click="playMusic(childItem.id,index)"
                    />
                  </li>
                </ol>
              </el-collapse-item>
            </el-collapse>
            <!-- 普通类型音乐列表 -->
            <ol class="music-list flex-1" v-else>
              <li v-for="(item,index) in getMusicArray" :key="index">
                <span class="music-order">{{getOrder(index)}}</span>
                <span class="music-filename ellipsis">{{item.title}}</span>
                <img
                  class="list-play-btn"
                  src="../assets/images/media_music_list_pause.png"
                  v-if="item.id == getCurrentPlayingID && getPlayingStatus"
                  @click="stopMusic(item.id)"
                />
                <img
                  class="list-play-btn"
                  src="../assets/images/play_music.png"
                  v-else
                  @click="playMusic(item.id)"
                />
                <!-- :ref="returnRef(item.id)" -->
              </li>
            </ol>
            <img
              src="../assets/images/right-arrow.png"
              @click="nextPage"
              class="pagination-btn-web"
            />
          </div>
          <div class="pagination">
            <div class="pagination-container df">
              <img
                src="../assets/images/left-arrow.png"
                @click="prevPage"
                class="pagination-btn-mobile"
              />
              <div class="music-list-page-decorat-left"></div>
              {{currentPageNum}}
              <div class="music-list-page-decorat-right"></div>
              <img
                src="../assets/images/right-arrow.png"
                @click="nextPage"
                class="pagination-btn-mobile"
              />
            </div>
          </div>
        </div>
      </div>
    </el-container>
    <!-- <audio controls>
  <source :src="path" type="audio/mpeg">
  您的浏览器不支持该音频格式
    </audio>-->
  </div>
</template>

<script>
import axios from "axios";
import i18n from "@/i18n";
import Header from "@/components/Header.vue";
import MultimediaLogo from "@/components/MultimediaLogo.vue";
import PageLogo from "@/components/PageLogo.vue";
import FilterList from "@/components/FilterList.vue";
import MusicControl from "@/components/MusicControl.vue";
import { mapState } from "vuex";

//思路：创建一个数组，用于存放历史请求的接口与参数，每次getlist判断是否有相同的请求记录，有相同的话则不去请求。
//      如果有多个请求，页面只显示最后一次请求的内容，其余返回值则不理会。

//手动执行下一个按钮的事件，把当前播放的列表缓存起来
//低网速下内容切换有问题
//当前播放音乐名省略号

//var left;

export default {
  components: { Header, MultimediaLogo, PageLogo, FilterList,MusicControl },
  data: function () {
    return {
      path: "",
      currentPageNum: 1,
      perPage: 10,
      totalPage: 0,
      loadingState: true,
      url: "",
      activeName: "0",
      musicURL: "",
    };
  },
  mounted: function () {
    //var that = this;
    this.getList("All");

    
    // var pgs = document.getElementsByClassName("pgs");
    // var dotStart = 0,
    //   diff = 0,
    //   _offset = 0;
    // var _left = window.getComputedStyle
    //   ? window.getComputedStyle(divSlider).left
    //   : divSlider.currentStyle.left;
    // divSlider.addEventListener("mousedown", mouseDown, true);

    // divSlider.addEventListener("mouseup", mouseUp, true);

    // function mouseDown() {
    //   var e = e || event;
    //   e.stopPropagation();
    //   that.$store.state.music.seeking = true;
    //   dotStart = e.clientX;
    //   _offset = 0;
    //   _left = window.getComputedStyle
    //     ? window.getComputedStyle(divSlider).left
    //     : divSlider.currentStyle.left;
    //   console.log(e.clientX);

    //   document.addEventListener("mousemove", sliderMove, false);
    // }

    // function mouseUp() {
    //   (dotStart = 0), (diff = 0);
    //   document.removeEventListener("mousemove", sliderMove, false);

    //   var value = (
    //     _offset.slice(0, _offset.length - 2) / pgs[0].clientWidth
    //   ).toFixed(3);
    //   console.log(value);
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
    //   that.$store.state.music.seeking = false;
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
    //   //console.log(diff);
    //   // console.log(pgs.style);

    //   if (diff <= 0) {
    //     //diff = 0;
    //     _offset = 0;
    //   } else if (
    //     parseInt(_left.slice(0, _left.length - 2)) + diff >=
    //     pgs[0].clientWidth - 4
    //   ) {
    //     pgs[0].clientWidth - 4 + "px";
    //     _offset = pgs[0].clientWidth - 4 + "px";
    //   } else {
    //     _offset = parseInt(_left.slice(0, _left.length - 2)) + diff + "px";
    //   }
    //   divSlider.style.left = _offset;

    //   // console.log('-----------------------');
    //   // console.log(diff);
    //   //console.log(parseInt(_left.slice(0,divSlider.style.left.length -2)) + diff + 'px');
    // }
  },
  computed: mapState({
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
    getSingerOrAlubmArray() {
      return this.$store.state.music.singerOrAlubmArray;
    },
    getMusicDuration() {
      return this.$store.state.music.musicDuration;
    },
    getMusicCurrentTime() {
      return this.$store.state.music.musicCurrentTime;
    },
    doneCount: "doneTodosCount",
  }),
  methods: {
    getOrder: function (i) {
      return (this.currentPageNum - 1) * this.perPage + parseInt(i) + 1;
    },
    getList: function (type) {
      let that = this;
      that.loadingState = true;
      if (type != that.$store.state.music.navigationName) {
        that.currentPageNum = 1;
      }

      if (type == "Singer") {
        that.url = that.$store.state.media_server + "/audiosinger";
        that.$store.state.music.singerOrAlubmArray.length = 0;
        that.activeName = "0";
      } else if (type == "Album") {
        that.url = that.$store.state.media_server + "/audioalbum";
        that.$store.state.music.singerOrAlubmArray.length = 0;
        that.activeName = "0";
      } else {
        that.url = that.$store.state.media_server + "/audio";
        that.$store.state.music.musicArray.length = 0;
      }
      that.$store.state.music.navigationName = type;

      axios
        .get(that.url, {
          params: {
            navigation: type,
            lang: i18n.locale,
            limit:
              (that.currentPageNum - 1) * that.perPage + "," + that.perPage,
          },
        })
        .then(function (response) {
          console.log(response);
          that.loadingState = false;
          that.totalPage = Math.ceil(
            parseInt(response["data"]["count_data"]) / that.perPage
          );
          response["data"]["data"].forEach((element) => {
            if (type == "Singer" || type == "Album") {
              that.$store.state.music.singerOrAlubmArray.push(element);
            } else {
              //   if (that.currentPlayingID == -1) {
              //   that.currentPlayingID = element["id"];
              // }
              that.$store.state.music.musicArray.push(element);
            }
          });
          // that.musicURL =
          //   that.$store.state.media_server + that.musicArray[1]["filepath"];

          // that.$nextTick(function () {
          //   console.log(that.musicArray);
          // console.log(that.singerOrAlubmArray);
          //   that.initPlayer();
          // });
        })
        .catch(function (error) {
          console.log(error);

          that.$message({
            message: error,
            type: "info",
            center: true,
            // iconClass: "",
            duration: 1800,
          });
        });
    },
    replacePlayList(index, outIndex) {
      console.log("PlayList changed");
      //此处要深拷贝
      let that = this;
      if (
        that.$store.state.music.navigationName == "Singer" ||
        that.$store.state.music.navigationName == "Album"
      ) {
        console.log([...that.singerOrAlubmArray[outIndex]["audio"]]);
        that.$store.commit({
          type: "music/setPlayList",
          data: [...that.singerOrAlubmArray[outIndex]["audio"]],
        });

        //  that.$store.state.playList = ;
      } else {
        console.log([...that.$store.state.music.musicArray]);
        that.$store.commit({
          type: "music/setPlayList",
          data: [...that.$store.state.music.musicArray],
        });
        //  that.$store.state.playList = [...that.musicArray];
      }
    },
    playMusic: function (index, outIndex) {
      this.$store.dispatch({
        type: "music/playMusic",
        index: index,
        outIndex: outIndex,
      });
    },
    
    // playMusic: function (index, outIndex) {
    //   let that = this;
    //   if (that.getPlayingStatus) {
    //     console.log("重置了！");
    //     that.$store.state.music.player.pause();
    //     that.$store.state.music.playingStatus = false;
    //   }
    //   // console.log(index);
    //   // console.log(that.currentPlayingID);

    //   if (typeof index != "undefined") {
    //     if (index != that.getCurrentPlayingID) {
    //       //如果当前正在播放，先暂停，再重置
    //       that.$store.state.music.player = null;
    //     } else {
    //       //当前有正在播放的歌曲
    //       that.$store.state.music.player.play();
    //       that.$store.state.music.playingStatus = true;
    //       return;
    //     }
    //     that.$store.commit({
    //       type: "music/setCurrentPlayingID",
    //       data: index,
    //     });
    //     that.replacePlayList(index, outIndex);
    //   }
    //   // var _array;
    //   // if (that.navigationName == "Singer" || that.navigationName == "Album") {
    //   //         _array = that.singerOrAlubmArray[outIndex]['audio'];
    //   //       }else {
    //   //         _array = that.musicArray;
    //   //       }
    //   that.$nextTick(function () {
    //     that.$store.dispatch("music/initPlayer");
    //     //console.log(that.playList);

    //     //that.$nextTick(function () {
    //       //console.log(that.currentPlayingID);
    //       //console.log(that.musicURL);

    //     //});
    //   });
    // },
    
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

    prevPage: function () {
      let that = this;
      if (that.currentPageNum > 1) {
        that.currentPageNum--;
        that.getList(that.$store.state.music.navigationName);
      } else {
        that.$message({
          message: "This is first page!",
          type: "info",
          center: true,
          // iconClass: "",
          duration: 1800,
        });
      }
    },
    nextPage: function () {
      let that = this;
      if (that.currentPageNum < that.totalPage) {
        that.currentPageNum++;
        that.getList(that.$store.state.music.navigationName);
      } else {
        that.$message({
          message: "This is last page!",
          type: "info",
          center: true,
          // iconClass: "",
          duration: 1800,
        });
      }
    },
    returnRef: function (i) {
      return "listPlayBtnRef" + i;
    },
    // changePlayStatus:function(){
    //   let that = this;
    //   if (that.$store.state.player.paused) {
    //     that.$store.state.player.play();
    //     that.$store.state.playingStatus = true;
    //   } else {
    //     that.$store.state.player.pause();
    //     that.$store.state.playingStatus = false;
    //   }
    // },
    
  },
};
</script>

<style lang="scss">
.music-list-collapse {
  .el-collapse-item:nth-child(odd) {
    background-color: #9e3084;
  }

  .el-collapse-item__header {
    background-color: transparent;
    color: #fff;
    border: none;
  }

  // background-color: #820063;

  .el-collapse-item__wrap {
    background-color: transparent;
    border-bottom: none;
  }
  .el-collapse-item__content {
    padding-bottom: 0;
  }
  ol {
    list-style: none;
    color: #fff;
  }

  @media (max-width: 320px) {
    .el-collapse-item__content {
      padding-left: 0.4rem;
    }
  }

  @media (min-width: 321px) and (max-width: 360px) {
    .el-collapse-item__content {
      padding-left: 0.4rem;
    }
  }

  @media (min-width: 361px) and (max-width: 420px) {
    .el-collapse-item__content {
      padding-left: 0.8rem;
    }
  }

  @media (min-width: 421px) and (max-width: 520px) {
    .el-collapse-item__content {
      padding-left: 1rem;
    }
  }

  @media (min-width: 521px) and (max-width: 640px) {
    .el-collapse-item__content {
      padding-left: 1.2rem;
    }
  }

  @media (min-width: 641px) and (max-width: 768px) {
    .el-collapse-item__content {
      padding-left: 1.4rem;
    }
  }

  @media (min-width: 769px) and (max-width: 992px) {
    .el-collapse-item__content {
      padding-left: 1.6rem;
    }
  }

  @media (min-width: 993px) and (max-width: 1200px) {
    .el-collapse-item__content {
      padding-left: 1.8rem;
    }
  }

  @media (min-width: 1201px) {
    .el-collapse-item__content {
      padding-left: 2rem;
    }
  }
}
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
// @media (min-width:768px){

// }

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
  .music-list-page-decorat-left,
  .music-list-page-decorat-right {
    display: none;
  }
}

@media (min-width: 769px) and (max-width: 999px) {
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
  .music-list-page-decorat-left,
  .music-list-page-decorat-right {
    display: inline-block;
    width: 30px;
    height: 2px;
    background-color: #fff;
  }
}

@media (min-width: 1000px) and (max-width: 1239px) {
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
  .music-list-page-decorat-left,
  .music-list-page-decorat-right {
    display: inline-block;
    width: 30px;
    height: 2px;
    background-color: #fff;
  }
}

@media (min-width: 1240px) {
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
















