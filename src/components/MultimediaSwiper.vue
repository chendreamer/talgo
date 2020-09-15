<template>
  <div>
    <div class="banner" style="width: 100%;">
      <div class="swiper" id="swiper">
        <div class="current-swiper swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide slide1">
              <router-link to="/video">
                <img :src="videoPicPath" class="to-video" />
              </router-link>
              <router-link to="/play">
                <div class="name to-video">{{$t("message.video")}}</div>
              </router-link>
            </div>
            <div class="swiper-slide slide2">
              <router-link to="/music">
                <img :src="musicPicPath" class="to-music" />
              </router-link>
              <router-link to="/music">
                <div class="name to-music">{{$t("message.music")}}</div>
              </router-link>
            </div>
            <div class="swiper-slide slide3">
              <router-link to="/book">
                <img :src="bookPicPath" class="to-book" />
              </router-link>
              <router-link to="/book">
                <div class="name to-book">{{$t("message.book")}}</div>
              </router-link>
            </div>
          </div>
        </div>
        <div class="swiper-button-prev">
          <img src="../assets/images/left-arrow.png" />
        </div>
        <div class="swiper-button-next">
          <img src="../assets/images/right-arrow.png" />
        </div>
        <div class="split-line-left"></div>
        <div class="split-line-right"></div>

        <div
          id="leftSwiper"
          class="nocurrent-swiper left-swiper swiper-container"
          style="pointer-events: none;"
        >
          <div class="swiper-wrapper">
            <div class="swiper-slide slide3">
              <img :src="bookPicPath" />
              <div class="name">{{$t("message.book")}}</div>
            </div>
            <div class="swiper-slide slide1">
              <img :src="videoPicPath" />
              <div class="name">{{$t("message.video")}}</div>
            </div>
            <div class="swiper-slide slide2">
              <img :src="musicPicPath" />
              <div class="name">{{$t("message.music")}}</div>
            </div>
          </div>
        </div>

        <div
          id="rightSwiper"
          class="nocurrent-swiper right-swiper swiper-container"
          style="pointer-events: none;"
        >
          <div class="swiper-wrapper">
            <div class="swiper-slide slide2">
              <img :src="musicPicPath" />
              <div class="name">{{$t("message.music")}}</div>
            </div>
            <div class="swiper-slide slide3">
              <img :src="bookPicPath" />
              <div class="name">{{$t("message.book")}}</div>
            </div>
            <div class="swiper-slide slide1">
              <img :src="videoPicPath" />
              <div class="name">{{$t("message.video")}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "../assets/style/swiper.min.css";
import Swiper from "swiper";

export default {
  data: function () {
    return {
      videoPicPath: require("../assets/images/video.png"),
      bookPicPath: require("../assets/images/Book.png"),
      musicPicPath: require("../assets/images/Music.png"),
    };
  },
  mounted: function () {
    var currentSwiper = new Swiper(".current-swiper", {
      loop: true,
    });
    currentSwiper.$el
      .parent()
      .find(".swiper-button-next")
      .on("click", function () {
        currentSwiper.slideNext();
      });
    currentSwiper.$el
      .parent()
      .find(".swiper-button-prev")
      .on("click", function () {
        currentSwiper.slidePrev();
      });
    var leftSwiper = new Swiper(".left-swiper", {
      loop: true,
      simulateTouch: false,
    });
    var rightSwiper = new Swiper(".right-swiper", {
      loop: true,
      simulateTouch: false,
    });
    currentSwiper.controller.control = [leftSwiper, rightSwiper];
  },
};
</script>

<style lang="scss" scoped>
// @media (min-width:768px){

// }

@media (max-width: 320px) {
  #leftSwiper,
  #rightSwiper {
    display: none;
  }

  #swiper {
    width: 280px;
    height: 300px;
  }
  .banner {
    padding-top: 10px;
  }
  .current-swiper {
    border-radius: 10px;
    margin: 0 auto;
    position: relative;
    z-index: 99;
    text-align: center;
  }
  .nocurrent-swiper:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 99;
  }
  .nocurrent-swiper .name,
  .nocurrent-swiper img {
    opacity: 0.3;
  }
  .name:before {
    content: "";
    position: absolute;
    width: 30px;
    height: 30px;
    right: 10px;
    top: 0;
    bottom: 0;
    margin: auto;
  }
  .nocurrent-swiper .name:before {
    width: 26px;
    height: 26px;
    background-size: 100% 100%;
  }
  .swiper-button-prev,
  .swiper-button-next {
    width: 1.8rem;
    height: 1.8rem;
    background: none;
  }
  .swiper-button-prev{
    left:0;
  }
  .swiper-button-next{
    right:0;
  }
  .swiper .name {
    position: relative;
    color: #eee;
    height: 50px;
    line-height: 50px;
    font-size: 1.6rem;
    margin-top: 12%;
  }
  .current-swiper,
  .nocurrent-swiper {
    width: 200px;
    height: 100%;
  }
  .current-swiper img,
  .nocurrent-swiper img {
    height: 140px;
    width: 65%;
    margin-top: 20%;
  }
  .split-line-left,
  .split-line-right {
    display: none;
  }
}

@media (min-width: 321px) and (max-width: 360px) {
  #leftSwiper,
  #rightSwiper {
    display: none;
  }

  #swiper {
    width: 300px;
    height: 340px;
  }
  .banner {
    padding-top: 10px;
  }
  .current-swiper {
    border-radius: 10px;
    margin: 0 auto;
    position: relative;
    z-index: 99;
    text-align: center;
  }
  .nocurrent-swiper:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 99;
  }
  .nocurrent-swiper .name,
  .nocurrent-swiper img {
    opacity: 0.3;
  }
  .name:before {
    content: "";
    position: absolute;
    width: 30px;
    height: 30px;
    right: 10px;
    top: 0;
    bottom: 0;
    margin: auto;
  }
  .nocurrent-swiper .name:before {
    width: 26px;
    height: 26px;
    background-size: 100% 100%;
  }
  .swiper-button-prev,
  .swiper-button-next {
    width: 1.8rem;
    height: 1.8rem;
    background: none;
  }
  .swiper .name {
    position: relative;
    color: #eee;
    height: 54px;
    line-height: 54px;
    font-size: 1.8rem;
    margin-top: 12%;
  }
  .current-swiper,
  .nocurrent-swiper {
    width: 200px;
    height: 100%;
  }
  .current-swiper img,
  .nocurrent-swiper img {
    height: 150px;
    width: 70%;
    margin-top: 25%;
  }
  .split-line-left,
  .split-line-right {
    display: none;
  }
}

@media (min-width: 361px) and (max-width: 420px) {
  #leftSwiper,
  #rightSwiper {
    display: none;
  }

  #swiper {
    width: 340px;
    height: 360px;
  }
  .banner {
    padding-top: 10px;
  }
  .current-swiper {
    width: 250px;
    height: 100%;
    border-radius: 10px;
    margin: 0 auto;
    position: relative;
    z-index: 99;
    text-align: center;
  }
  .nocurrent-swiper:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 99;
  }
  .nocurrent-swiper .name,
  .nocurrent-swiper img {
    opacity: 0.3;
  }
  .name:before {
    content: "";
    position: absolute;
    width: 30px;
    height: 30px;
    right: 10px;
    top: 0;
    bottom: 0;
    margin: auto;
  }
  .nocurrent-swiper .name:before {
    width: 26px;
    height: 26px;
    background-size: 100% 100%;
  }
  .swiper-button-prev,
  .swiper-button-next {
    width: 2.2rem;
    height: 2.2rem;
    background: none;
  }
  .swiper .name {
    position: relative;
    color: #eee;
    height: 54px;
    line-height: 54px;
    font-size: 2rem;
    margin-top: 12%;
  }
  .current-swiper,
  .nocurrent-swiper {
    width: 220px;
    height: 100%;
  }
  .current-swiper img,
  .nocurrent-swiper img {
    height: 170px;
    width: 70%;
    margin-top: 30%;
  }
  .split-line-left,
  .split-line-right {
    display: none;
  }
}

@media (min-width: 421px) and (max-width: 520px) {
  #leftSwiper,
  #rightSwiper {
    display: none;
  }

  #swiper {
    width: 380px;
    height: 400px;
  }
  .banner {
    padding-top: 10px;
  }
  .current-swiper {
    width: 250px;
    height: 100%;
    border-radius: 10px;
    margin: 0 auto;
    position: relative;
    z-index: 99;
    text-align: center;
  }
  .nocurrent-swiper:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 99;
  }
  .nocurrent-swiper .name,
  .nocurrent-swiper img {
    opacity: 0.3;
  }
  .name:before {
    content: "";
    position: absolute;
    width: 30px;
    height: 30px;
    right: 10px;
    top: 0;
    bottom: 0;
    margin: auto;
  }
  .nocurrent-swiper .name:before {
    width: 26px;
    height: 26px;
    background-size: 100% 100%;
  }
  .swiper-button-prev,
  .swiper-button-next {
    width: 2.2rem;
    height: 2.2rem;
    background: none;
  }
  .swiper .name {
    position: relative;
    color: #eee;
    height: 54px;
    line-height: 54px;
    font-size: 2.3rem;
    margin-top: 10%;
  }
  .current-swiper,
  .nocurrent-swiper {
    width: 250px;
    height: 100%;
  }
  .current-swiper img,
  .nocurrent-swiper img {
    height: 170px;
    width: 60%;
    margin-top: 30%;
  }
  .split-line-left,
  .split-line-right {
    display: none;
  }
}

@media (min-width: 521px) and (max-width: 640px) {
  #leftSwiper,
  #rightSwiper {
    display: none;
  }

  #swiper {
    width: 480px;
    height: 470px;
  }
  .banner {
    padding-top: 10px;
  }
  .current-swiper {
    width: 280px;
    height: 100%;
    border-radius: 10px;
    margin: 0 auto;
    position: relative;
    z-index: 99;
    text-align: center;
  }
  .nocurrent-swiper:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 99;
  }
  .nocurrent-swiper .name,
  .nocurrent-swiper img {
    opacity: 0.3;
  }
  .name:before {
    content: "";
    position: absolute;
    width: 30px;
    height: 30px;
    right: 10px;
    top: 0;
    bottom: 0;
    margin: auto;
  }
  .nocurrent-swiper .name:before {
    width: 26px;
    height: 26px;
    background-size: 100% 100%;
  }
  .swiper-button-prev,
  .swiper-button-next {
    width: 2.4rem;
    height: 2.4rem;
    background: none;
  }
  .swiper .name {
    position: relative;
    color: #eee;
    height: 60px;
    line-height: 60px;
    font-size: 2.5rem;
    margin-top: 12%;
  }
  .current-swiper,
  .nocurrent-swiper {
    width: 280px;
    height: 100%;
  }
  .current-swiper img,
  .nocurrent-swiper img {
    height: 180px;
    width: 60%;
    margin-top: 36%;
  }
  .split-line-left,
  .split-line-right {
    display: none;
  }
}

@media (min-width: 641px) and (max-width: 768px) {
  #leftSwiper,
  #rightSwiper {
    display: none;
  }

  #swiper {
    width: 520px;
    height: 500px;
  }
  .banner {
    padding-top: 10px;
  }
  .current-swiper {
    width: 280px;
    height: 100%;
    border-radius: 10px;
    margin: 0 auto;
    position: relative;
    z-index: 99;
    text-align: center;
  }
  .nocurrent-swiper {
    width: 300px;
    height: 100%;
    border-radius: 8px;
    text-align: center;
  }
  .nocurrent-swiper:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 99;
  }
  .nocurrent-swiper .name,
  .nocurrent-swiper img {
    opacity: 0.3;
  }
  .name:before {
    content: "";
    position: absolute;
    width: 30px;
    height: 30px;
    right: 10px;
    top: 0;
    bottom: 0;
    margin: auto;
  }
  .nocurrent-swiper .name:before {
    width: 26px;
    height: 26px;
    background-size: 100% 100%;
  }
  .swiper-button-prev,
  .swiper-button-next {
    width: 2.5rem;
    height: 2.5rem;
    background: none;
  }

  .swiper .name {
    position: relative;
    color: #eee;
    height: 60px;
    line-height: 60px;
    font-size: 2.6rem;
    margin-top: 12%;
  }
  .current-swiper,
  .nocurrent-swiper {
    width: 360px;
    height: 100%;
  }
  .current-swiper img,
  .nocurrent-swiper img {
    height: 220px;
    width: 60%;
    margin-top: 30%;
  }
  .split-line-left,
  .split-line-right {
    display: none;
  }
}

@media (min-width: 769px) and (max-width: 999px) {
  #swiper {
    width: 720px;
    height: 440px;
  }
  .banner {
    padding-top: 10px;
  }
  .current-swiper {
    border-radius: 10px;
    z-index: 99;
    text-align: center;
  }
  #leftSwiper {
    position: absolute;
    left: 60px;
    top: 0;
    z-index: 1;
  }
  #rightSwiper {
    position: absolute;
    right: 60px;
    left: auto;
    top: 0;
    z-index: 1;
  }
  .nocurrent-swiper {
    text-align: center;
  }
  .nocurrent-swiper:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 99;
  }
  .nocurrent-swiper .name,
  .nocurrent-swiper img {
    opacity: 0.3;
  }
  .name:before {
    content: "";
    position: absolute;
    width: 30px;
    height: 30px;
    right: 10px;
    top: 0;
    bottom: 0;
    margin: auto;
  }
  .nocurrent-swiper .name:before {
    width: 26px;
    height: 26px;
    background-size: 100% 100%;
  }
  .swiper-button-prev,
  .swiper-button-next {
    width: 2.2rem;
    height: 2.2rem;
    background: none;
  }

  .swiper .name {
    height: 70px;
    line-height: 70px;
    font-size: 1.8rem;
    margin-top: 10%;
    position: relative;
    color: #eee;
  }
  .current-swiper,
  .nocurrent-swiper {
    width: 200px;
    height: 100%;
  }
  .current-swiper img,
  .nocurrent-swiper img {
    height: 155px;
    width: 70%;
    margin-top: 42%;
  }
  .split-line-left,.split-line-right{
    position: absolute;
    width: 4px;
    height: 330px;
    top: 45px;
    background-color: #fff;
    box-shadow: 0 -13px 2px 0 #820063 inset, 0 13px 2px 0 #820063 inset;
  }
  .split-line-left {
    left: 258px;
  }
  .split-line-right {
    right: 258px;
  }
}

@media (min-width: 1000px) and (max-width: 1239px) {
  #swiper {
    width: 960px;
    height: 500px;
  }
  .banner {
    padding-top: 10px;
  }
  .current-swiper {
    border-radius: 10px;
    z-index: 99;
    text-align: center;
  }
  #leftSwiper {
    position: absolute;
    left: 120px;
    top: 0;
    z-index: 1;
  }
  #rightSwiper {
    position: absolute;
    right: 120px;
    left: auto;
    top: 0;
    z-index: 1;
  }
  .nocurrent-swiper {
    text-align: center;
  }
  .nocurrent-swiper:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 99;
  }
  .nocurrent-swiper .name,
  .nocurrent-swiper img {
    opacity: 0.3;
  }
  .name:before {
    content: "";
    position: absolute;
    width: 30px;
    height: 30px;
    right: 10px;
    top: 0;
    bottom: 0;
    margin: auto;
  }
  .nocurrent-swiper .name:before {
    width: 26px;
    height: 26px;
    background-size: 100% 100%;
  }
  .swiper-button-prev,
  .swiper-button-next {
    width: 2.8rem;
    height: 2.8rem;
    background: none;
  }

  .swiper .name {
    height: 80px;
    line-height: 80px;
    font-size: 2.2rem;
    margin-top: 10%;
    position: relative;
    color: #eee;
  }
  .current-swiper,
  .nocurrent-swiper {
    width: 240px;
    height: 100%;
  }
  .current-swiper img,
  .nocurrent-swiper img {
    height: 180px;
    width: 70%;
    margin-top: 40%;
  }
  .split-line-left,.split-line-right{
    position: absolute;
    width: 4px;
    height: 370px;
    top: 65px;
    background-color: #fff;
    box-shadow: 0 -13px 2px 0 #820063 inset, 0 13px 2px 0 #820063 inset;
  }
  .split-line-left {
    left: 358px;
  }
  .split-line-right {
    right: 358px;
  }

}

@media (min-width: 1240px) {
  #swiper {
    width: 1140px;
    height: 660px;
  }
  .banner {
    padding-top: 10px;
  }
  .current-swiper {
    border-radius: 10px;
    z-index: 99;
    text-align: center;
  }
  #leftSwiper {
    position: absolute;
    left: 120px;
    top: 0;
    z-index: 1;
  }
  #rightSwiper {
    position: absolute;
    right: 120px;
    left: auto;
    top: 0;
    z-index: 1;
  }
  .nocurrent-swiper {
    text-align: center;
  }
  .nocurrent-swiper:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 99;
  }
  .nocurrent-swiper .name,
  .nocurrent-swiper img {
    opacity: 0.3;
  }
  .name:before {
    content: "";
    position: absolute;
    width: 30px;
    height: 30px;
    right: 10px;
    top: 0;
    bottom: 0;
    margin: auto;
  }
  .nocurrent-swiper .name:before {
    width: 26px;
    height: 26px;
    background-size: 100% 100%;
  }
  .swiper-button-prev,
  .swiper-button-next {
    width: 3rem;
    height: 3rem;
    background: none;
  }

  .swiper .name {
    height: 80px;
    line-height: 80px;
    font-size: 2.4rem;
    margin-top: 10%;
     position: relative;
     color: #eee;
  }
  .current-swiper,
  .nocurrent-swiper {
    width: 300px;
    height: 100%;
  }
  .current-swiper img,
  .nocurrent-swiper img {
    height: 210px;
    width: 70%;
    margin-top: 64%;
  }
  .split-line-left,.split-line-right{
    position: absolute;
    width: 4px;
    height: 400px;
    top: 170px;
    background-color: #fff;
    box-shadow: 0 -13px 2px 0 #820063 inset, 0 13px 2px 0 #820063 inset;
  }
  .split-line-left {
    left: 418px;
  }
  .split-line-right {
    right: 418px;
  }
}

.swiper-button-next > img,
.swiper-button-prev > img {
  width: 100%;
  height: 100%;
}

.banner .swiper ,.current-swiper{
    margin: 0 auto;
    position: relative;
  }
</style>