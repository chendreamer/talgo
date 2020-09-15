<template>
  <div>
    <el-container>
      <el-header class="bg-color">
        <Header class="container"></Header>
      </el-header>
      <div class="bg-color">
        <multimedia-logo pagename="tourist" class="container"></multimedia-logo>
      </div>
      <div class="filter-list clearfix container">
        <div class="hover prev" v-show="currentChecked != 0" @click="trigger(currentChecked -1)">
          <span class="left"></span>
          <span class="ellipsis">{{filterData[currentChecked-1]}}</span>
        </div>
        <div
          class="hover next"
          v-show="currentChecked != filterData.length -1"
          @click="trigger(currentChecked +1)"
        >
          <span class="ellipsis">{{filterData[currentChecked+1]}}</span>
          <span class="right"></span>
        </div>
        <!-- <div
          v-for="(item,index) in filterData"
          :key="index"
          class="filter-item"
          :class="{checked:ifCheck(index)}"
          @click="trigger(index)"
        >{{item}}</div>-->
      </div>
      <div class="container page">
        <div class="swiper" style="position: relative;">
          <div class="current-swiper swiper-container">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(item,index) in pictureArray" :key="index">
                <img class="swiper-slide" :src="item" />
              </div>
            </div>
          </div>
          <div class="swiper-button-prev"></div>

          <div class="swiper-button-next"></div>
        </div>

        <div class="detile">
          <div class="detile-content">
            <span class="title flex-1 ellipsis">{{headerContent}}</span>
            <el-rate
              v-model="value"
              disabled
              show-score
              text-color="#000"
              :score-template="scoreTemplate"
              id="rate"
            ></el-rate>
          </div>

          <p class="artical-introduction">Introduction</p>
          <p class="artical">{{introduction}}</p>
        </div>
      </div>
    </el-container>
  </div>
</template>

<script>
import axios from "axios";
import i18n from "@/i18n";
import Header from "@/components/Header.vue";
import MultimediaLogo from "@/components/MultimediaLogo.vue";
import "../assets/style/swiper.min.css";
import Swiper from "swiper";

let swiper;
export default {
  components: { Header, MultimediaLogo },
  data: function () {
    return {
      responseData: [],
      pictureArray: [],
      value: 2.0,
      headerContent: "",
      introduction: "",
      filterData: [],
      currentChecked: 0,
    };
  },
  mounted: function () {
    let that = this;
    axios
      .get(that.$store.state.media_server + "/tourist", {
        params: {
          lang: i18n.locale,
        },
      })
      .then(function (response) {
        console.log(response);
        that.responseData = response["data"]["data"];
        that.responseData.forEach((element) => {
          that.filterData.push(element.title);
        });
        that.trigger(0);
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
  methods: {
    swiperInit: function () {
      if (swiper) {
        swiper.destroy();
      }
      swiper = new Swiper(".swiper-container", {
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
    },
    trigger: function (index) {
      let that = this;
      that.currentChecked = index;
      //console.log(index);
      that.pictureArray.length = 0;
      that.responseData[index]["filepath"].forEach((element) => {
        that.pictureArray.push(that.$store.state.media_server + element);
      });
      that.headerContent = that.responseData[index]["title"];
      that.introduction = that.responseData[index]["description"];
      that.value = that.responseData[index]["score"] / 2;

      that.$nextTick(function () {
        that.swiperInit();
      });
    },
    ifCheck: function (index) {
      return this.currentChecked == index;
    },
  },
  computed: {
    scoreTemplate: function () {
      return this.value * 2.0 + "";
    },
  },
};
</script>

<style lang="scss">
@media (max-width: 320px) {
  #rate {
    width: 110px;
    .el-rate__icon {
      font-size: 0.9rem;
    }
    .el-rate__text {
      font-size: 0.8rem;
    }
  }
}

@media (min-width: 321px) and (max-width: 360px) {
  #rate {
    width: 130px;
    .el-rate__icon {
      font-size: 1rem;
    }
    .el-rate__text {
      font-size: 0.9rem;
    }
  }
}

@media (min-width: 361px) and (max-width: 420px) {
  #rate {
    width: 150px;
    .el-rate__icon {
      font-size: 1.1rem;
    }
    .el-rate__text {
      font-size: 1rem;
    }
  }
}

@media (min-width: 421px) and (max-width: 520px) {
  #rate {
    width: 150px;
    .el-rate__icon {
      font-size: 1.1rem;
    }
    .el-rate__text {
      font-size: 1rem;
    }
  }
}

@media (min-width: 521px) and (max-width: 640px) {
  #rate {
    width: 160px;
    .el-rate__icon {
      font-size: 1.3rem;
    }
    .el-rate__text {
      font-size: 1.2rem;
    }
  }
}

@media (min-width: 641px) and (max-width: 768px) {
  #rate {
    width: 180px;
    .el-rate__icon {
      font-size: 1.4rem;
    }
    .el-rate__text {
      font-size: 1.3rem;
    }
  }
}

@media (min-width: 769px) and (max-width: 992px) {
  #rate {
    width: 150px;
    .el-rate__icon {
      font-size: 1.1rem;
    }
    .el-rate__text {
      font-size: 1rem;
    }
  }
}

@media (min-width: 993px) and (max-width: 1200px) {
  #rate {
    width: 160px;
    .el-rate__icon {
      font-size: 1.3rem;
    }
    .el-rate__text {
      font-size: 1.2rem;
    }
  }
}

@media (min-width: 1201px) {
  #rate {
    width: 180px;
    .el-rate__icon {
      font-size: 1.4rem;
    }
    .el-rate__text {
      font-size: 1.3rem;
    }
  }
}

.el-rate__icon {
  margin-right: 0;
}
</style>
<style lang="scss" scoped>
@media (max-width: 320px) {
  .page {
    color: #333;
  }
  .detile-content {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }
  .detile {
    > .df {
      justify-content: space-between;
    }
  }
  .page {
    color: #333;
  }
  .detile-content {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }
  .detile {
    > .df {
      justify-content: space-between;
    }
  }
  .filter-list {
    color: #666;
    line-height: 35px;
    .right,
    .left {
      border: solid #820063;
      border-width: 0 2px 2px 0;
      display: inline-block;
      padding: 5px;
    }
    > div {
      > span {
        max-width: 126px;
        font-size: 0.7rem;
      }
    }
  }
  .title {
    font-size: 1.2rem;
  }
  .artical-introduction {
    font-size: 0.85rem;
    margin-bottom: 0.85rem;
  }
  .artical {
    font-size: 0.65rem;
  }
}

@media (min-width: 321px) and (max-width: 360px) {
  .page {
    color: #333;
  }
  .detile-content {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }
  .detile {
    > .df {
      justify-content: space-between;
    }
  }
  .filter-list {
    color: #666;
    line-height: 35px;
    .right,
    .left {
      border: solid #820063;
      border-width: 0 2px 2px 0;
      display: inline-block;
      padding: 5px;
    }
    > div {
      > span {
        max-width: 130px;
        font-size: 0.7rem;
      }
    }
  }
  .title {
    font-size: 1.3rem;
  }
  .artical-introduction {
    font-size: 0.9rem;
    margin-bottom: 0.9rem;
  }
  .artical {
    font-size: 0.7rem;
  }
}

@media (min-width: 361px) and (max-width: 420px) {
  .page {
    color: #333;
  }
  .detile-content {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }
  .detile {
    > .df {
      justify-content: space-between;
    }
  }
  .filter-list {
    color: #666;
    line-height: 35px;
    .right,
    .left {
      border: solid #820063;
      border-width: 0 2px 2px 0;
      display: inline-block;
      padding: 5px;
    }
    > div {
      > span {
        max-width: 150px;
        font-size: 0.7rem;
      }
    }
  }
  .title {
    font-size: 1.4rem;
  }
  .artical-introduction {
    font-size: 1rem;
    margin-bottom: 1rem;
  }
  .artical {
    font-size: 0.8rem;
  }
}

@media (min-width: 421px) and (max-width: 520px) {
  .page {
    color: #333;
  }
  .detile-content {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }
  .detile {
    > .df {
      justify-content: space-between;
    }
  }
  .filter-list {
    color: #666;
    line-height: 35px;
    .right,
    .left {
      border: solid #820063;
      border-width: 0 2px 2px 0;
      display: inline-block;
      padding: 5px;
    }
    > div {
      > span {
        max-width: 170px;
        font-size: 0.7rem;
      }
    }
  }
  .title {
    font-size: 1.5rem;
  }
  .artical-introduction {
    font-size: 1rem;
    margin-bottom: 1rem;
  }
  .artical {
    font-size: 0.8rem;
  }
}

@media (min-width: 521px) and (max-width: 640px) {
  .page {
    color: #333;
  }
  .detile-content {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }
  .detile {
    > .df {
      justify-content: space-between;
    }
  }
  .filter-list {
    color: #666;
    line-height: 35px;
    .right,
    .left {
      border: solid #820063;
      border-width: 0 3px 3px 0;
      display: inline-block;
      padding: 5px;
    }
    > div {
      > span {
        max-width: 200px;
        font-size: 0.8rem;
      }
    }
  }
  .title {
    font-size: 1.6rem;
  }
  .artical-introduction {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }
  .artical {
    font-size: 0.9rem;
  }
}

@media (min-width: 641px) and (max-width: 768px) {
  .page {
    color: #333;
  }
  .detile-content {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }
  .detile {
    > .df {
      justify-content: space-between;
    }
  }
  .filter-list {
    color: #666;
    line-height: 35px;
    .right,
    .left {
      border: solid #820063;
      border-width: 0 3px 3px 0;
      display: inline-block;
      padding: 5px;
    }
    > div {
      > span {
        max-width: 270px;
        font-size: 0.9rem;
      }
    }
  }
  .title {
    font-size: 1.8rem;
  }
  .artical-introduction {
    font-size: 1.1rem;
    margin-bottom: 1rem;
  }
  .artical {
    font-size: 0.9rem;
  }
}

@media (min-width: 769px) and (max-width: 999px) {
  .swiper {
    width: 45%;
  }
  .page {
    display: flex;
    justify-content: space-around;
    color: #333;
  }
  .detile-content {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }
  .detile {
    width: 50%;
    > .df {
      justify-content: space-between;
    }
  }
  .filter-list {
    color: #666;
    line-height: 35px;
    .right,
    .left {
      border: solid #820063;
      border-width: 0 3px 3px 0;
      display: inline-block;
      padding: 6px;
    }
    > div {
      > span {
        max-width: 300px;
      }
    }
  }
  .title {
    font-size: 1.6rem;
  }
  .artical-introduction {
    font-size: 1.1rem;
    margin-bottom: 1rem;
  }
  .artical {
    font-size: 0.8rem;
  }
}

@media (min-width: 1000px) and (max-width: 1239px) {
  .swiper {
    width: 45%;
  }
  .page {
    display: flex;
    justify-content: space-around;
    color: #333;
  }
  .detile-content {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }
  .detile {
    width: 50%;
    > .df {
      justify-content: space-between;
    }
  }
  .filter-list {
    color: #666;
    line-height: 35px;
    .right,
    .left {
      border: solid #820063;
      border-width: 0 3px 3px 0;
      display: inline-block;
      padding: 6px;
    }
    > div {
      > span {
        max-width: 400px;
      }
    }
  }
  .title {
    font-size: 1.7rem;
  }
  .artical-introduction {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }
  .artical {
    font-size: 0.85rem;
  }
}

@media (min-width: 1240px) {
  .swiper {
    width: 45%;
  }
  .page {
    display: flex;
    justify-content: space-around;
    color: #333;
  }
  .detile-content {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }
  .detile {
    width: 50%;
    > .df {
      justify-content: space-between;
    }
  }
  .filter-list {
    color: #666;
    line-height: 35px;
    .right,
    .left {
      border: solid #820063;
      border-width: 0 3px 3px 0;
      display: inline-block;
      padding: 6px;
    }
    > div {
      > .ellipsis {
        max-width: 400px;
      }
    }
  }
  .title {
    font-size: 1.8rem;
  }
  .artical-introduction {
    font-size: 1.3rem;
    margin-bottom: 1rem;
  }
  .artical {
    font-size: 0.9rem;
  }
}

.right {
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
  margin-right: 0.1rem;
}
.left {
  transform: rotate(135deg);
  -webkit-transform: rotate(135deg);
  margin-left: 0.1rem;
}
.up {
  transform: rotate(-135deg);
  -webkit-transform: rotate(-135deg);
}
.down {
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
}
.checked {
  background-color: #820063;
  color: #fff;
  border: 2px solid #820063;
}
.flex-1 {
  flex: 1;
}
.swiper-wrapper {
  align-items: center;
}
.prev {
  float: left;
  display: flex;
  align-items: center;
}
.next {
  float: right;
  display: flex;
  align-items: center;
}
</style>