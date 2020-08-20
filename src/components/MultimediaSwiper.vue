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
  .banner h1 {
    font-size: 36px;
    text-align: center;
    font-weight: 400;
  }
  .banner h2 {
    font-size: 18px;
    color: #535353;
    text-align: center;
    font-weight: 400;
    margin: 20px 0 60px;
  }
  .banner .swiper {
    width: 1300px;
    margin: 0 auto;
    position: relative;
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
  #leftSwiper {
    position: absolute;
    left: 50px;
    top: 0;
    z-index: 1;
  }
  #rightSwiper {
    position: absolute;
    right: 50px;
    left: auto;
    top: 0;
    z-index: 1;
  }
  .nocurrent-swiper {
    width: 250px;
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
  .title {
    padding-top: 70px;
    margin-left: 45px;
    height: 29px;
    line-height: 29px;
    font-size: 18px;
    color: #666;
  }
  .nocurrent-swiper .title {
    padding-top: 44px;
    margin-left: 30px;
    font-size: 16px;
    height: 25px;
    line-height: 25px;
  }
  .name {
    height: 80px;
    position: relative;
    line-height: 80px;
    font-size: 66px;
    margin-top: 20%;
    color: #eee;
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

  .swiper.container img {
    height: 245px;
    width: 80%;
    margin-top: 25%;
  }
  .swiper .name {
    height: 50px;
    line-height: 50px;
    font-size: 2.2rem;
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
    width: 64%;
    margin-top: 20%;
  }
  #leftSwiper {
    left: 40px;
  }
  #rightSwiper {
    right: 40px;
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
  .banner h1 {
    font-size: 36px;
    text-align: center;
    font-weight: 400;
  }
  .banner h2 {
    font-size: 18px;
    color: #535353;
    text-align: center;
    font-weight: 400;
    margin: 20px 0 60px;
  }
  .banner .swiper {
    width: 1300px;
    margin: 0 auto;
    position: relative;
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
  #leftSwiper {
    position: absolute;
    left: 50px;
    top: 0;
    z-index: 1;
  }
  #rightSwiper {
    position: absolute;
    right: 50px;
    left: auto;
    top: 0;
    z-index: 1;
  }
  .nocurrent-swiper {
    width: 250px;
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
  .title {
    padding-top: 70px;
    margin-left: 45px;
    height: 29px;
    line-height: 29px;
    font-size: 18px;
    color: #666;
  }
  .nocurrent-swiper .title {
    padding-top: 44px;
    margin-left: 30px;
    font-size: 16px;
    height: 25px;
    line-height: 25px;
  }
  .name {
    height: 80px;
    position: relative;
    line-height: 80px;
    font-size: 66px;
    margin-top: 20%;
    color: #eee;
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
    width: 2rem;
    height: 2rem;
    background: none;
  }

  .swiper.container img {
    height: 245px;
    width: 80%;
    margin-top: 25%;
  }
  .swiper .name {
    height: 52px;
    line-height: 52px;
    font-size: 2.3rem;
    margin-top: 12%;
  }
  .current-swiper,
  .nocurrent-swiper {
    width: 220px;
    height: 100%;
  }
  .current-swiper img,
  .nocurrent-swiper img {
    height: 160px;
    width: 66%;
    margin-top: 25%;
  }
  #leftSwiper {
    left: 40px;
  }
  #rightSwiper {
    right: 40px;
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
  .banner h1 {
    font-size: 36px;
    text-align: center;
    font-weight: 400;
  }
  .banner h2 {
    font-size: 18px;
    color: #535353;
    text-align: center;
    font-weight: 400;
    margin: 20px 0 60px;
  }
  .banner .swiper {
    width: 1300px;
    margin: 0 auto;
    position: relative;
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
  #leftSwiper {
    position: absolute;
    left: 50px;
    top: 0;
    z-index: 1;
  }
  #rightSwiper {
    position: absolute;
    right: 50px;
    left: auto;
    top: 0;
    z-index: 1;
  }
  .nocurrent-swiper {
    width: 250px;
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
  .title {
    padding-top: 70px;
    margin-left: 45px;
    height: 29px;
    line-height: 29px;
    font-size: 18px;
    color: #666;
  }
  .nocurrent-swiper .title {
    padding-top: 44px;
    margin-left: 30px;
    font-size: 16px;
    height: 25px;
    line-height: 25px;
  }
  .name {
    height: 80px;
    position: relative;
    line-height: 80px;
    font-size: 66px;
    margin-top: 20%;
    color: #eee;
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

  .swiper.container img {
    height: 245px;
    width: 80%;
    margin-top: 25%;
  }
  .swiper .name {
    height: 54px;
    line-height: 54px;
    font-size: 2.4rem;
    margin-top: 12%;
  }
  .current-swiper,
  .nocurrent-swiper {
    width: 230px;
    height: 100%;
  }
  .current-swiper img,
  .nocurrent-swiper img {
    height: 170px;
    width: 70%;
    margin-top: 30%;
  }
  #leftSwiper {
    left: 40px;
  }
  #rightSwiper {
    right: 40px;
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
  .banner h1 {
    font-size: 36px;
    text-align: center;
    font-weight: 400;
  }
  .banner h2 {
    font-size: 18px;
    color: #535353;
    text-align: center;
    font-weight: 400;
    margin: 20px 0 60px;
  }
  .banner .swiper {
    width: 1300px;
    margin: 0 auto;
    position: relative;
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
  #leftSwiper {
    position: absolute;
    left: 50px;
    top: 0;
    z-index: 1;
  }
  #rightSwiper {
    position: absolute;
    right: 50px;
    left: auto;
    top: 0;
    z-index: 1;
  }
  .nocurrent-swiper {
    width: 250px;
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
  .title {
    padding-top: 70px;
    margin-left: 45px;
    height: 29px;
    line-height: 29px;
    font-size: 18px;
    color: #666;
  }
  .nocurrent-swiper .title {
    padding-top: 44px;
    margin-left: 30px;
    font-size: 16px;
    height: 25px;
    line-height: 25px;
  }
  .name {
    height: 80px;
    position: relative;
    line-height: 80px;
    font-size: 66px;
    margin-top: 20%;
    color: #eee;
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

  .swiper.container img {
    height: 245px;
    width: 80%;
    margin-top: 25%;
  }
  .swiper .name {
    height: 54px;
    line-height: 54px;
    font-size: 2.4rem;
    margin-top: 12%;
  }
  .current-swiper,
  .nocurrent-swiper {
    width: 250px;
    height: 100%;
  }
  .current-swiper img,
  .nocurrent-swiper img {
    height: 180px;
    width: 60%;
    margin-top: 30%;
  }
  #leftSwiper {
    left: 40px;
  }
  #rightSwiper {
    right: 40px;
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
  .banner h1 {
    font-size: 36px;
    text-align: center;
    font-weight: 400;
  }
  .banner h2 {
    font-size: 18px;
    color: #535353;
    text-align: center;
    font-weight: 400;
    margin: 20px 0 60px;
  }
  .banner .swiper {
    width: 1300px;
    margin: 0 auto;
    position: relative;
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
  #leftSwiper {
    position: absolute;
    left: 50px;
    top: 0;
    z-index: 1;
  }
  #rightSwiper {
    position: absolute;
    right: 50px;
    left: auto;
    top: 0;
    z-index: 1;
  }
  .nocurrent-swiper {
    width: 280px;
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
  .title {
    padding-top: 70px;
    margin-left: 45px;
    height: 29px;
    line-height: 29px;
    font-size: 18px;
    color: #666;
  }
  .nocurrent-swiper .title {
    padding-top: 44px;
    margin-left: 30px;
    font-size: 16px;
    height: 25px;
    line-height: 25px;
  }
  .name {
    height: 80px;
    position: relative;
    line-height: 80px;
    font-size: 66px;
    margin-top: 20%;
    color: #eee;
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

  .swiper.container img {
    height: 245px;
    width: 80%;
    margin-top: 25%;
  }
  .swiper .name {
    height: 60px;
    line-height: 60px;
    font-size: 2.8rem;
    margin-top: 12%;
  }
  .current-swiper,
  .nocurrent-swiper {
    width: 280px;
    height: 100%;
  }
  .current-swiper img,
  .nocurrent-swiper img {
    height: 200px;
    width: 60%;
    margin-top: 30%;
  }
  #leftSwiper {
    left: 40px;
  }
  #rightSwiper {
    right: 40px;
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
  .banner h1 {
    font-size: 36px;
    text-align: center;
    font-weight: 400;
  }
  .banner h2 {
    font-size: 18px;
    color: #535353;
    text-align: center;
    font-weight: 400;
    margin: 20px 0 60px;
  }
  .banner .swiper {
    width: 1300px;
    margin: 0 auto;
    position: relative;
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
  #leftSwiper {
    position: absolute;
    left: 50px;
    top: 0;
    z-index: 1;
  }
  #rightSwiper {
    position: absolute;
    right: 50px;
    left: auto;
    top: 0;
    z-index: 1;
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
  .title {
    padding-top: 70px;
    margin-left: 45px;
    height: 29px;
    line-height: 29px;
    font-size: 18px;
    color: #666;
  }
  .nocurrent-swiper .title {
    padding-top: 44px;
    margin-left: 30px;
    font-size: 16px;
    height: 25px;
    line-height: 25px;
  }
  .name {
    height: 80px;
    position: relative;
    line-height: 80px;
    font-size: 66px;
    margin-top: 20%;
    color: #eee;
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

  .swiper.container img {
    height: 245px;
    width: 70%;
    margin-top: 25%;
  }
  .swiper .name {
    height: 60px;
    line-height: 60px;
    font-size: 2.8rem;
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
  #leftSwiper {
    left: 40px;
  }
  #rightSwiper {
    right: 40px;
  }
  .split-line-left,
  .split-line-right {
    display: none;
  }
}

@media (min-width: 769px) and (max-width: 992px) {
  #swiper {
    width: 760px;
    height: 440px;
  }
  .banner {
    padding-top: 10px;
  }
  .banner h1 {
    font-size: 36px;
    text-align: center;
    font-weight: 400;
  }
  .banner h2 {
    font-size: 18px;
    color: #535353;
    text-align: center;
    font-weight: 400;
    margin: 20px 0 60px;
  }
  .banner .swiper {
    width: 760px;
    margin: 0 auto;
    position: relative;
  }
  .current-swiper {
    width: 200px;
    height: 100%;
    border-radius: 10px;
    margin: 0 auto;
    position: relative;
    z-index: 99;
    text-align: center;
  }
  #leftSwiper {
    position: absolute;
    left: 80px;
    top: 0;
    z-index: 1;
  }
  #rightSwiper {
    position: absolute;
    right: 80px;
    left: auto;
    top: 0;
    z-index: 1;
  }
  .nocurrent-swiper {
    width: 200px;
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
  .title {
    padding-top: 70px;
    margin-left: 45px;
    height: 29px;
    line-height: 29px;
    font-size: 18px;
    color: #666;
  }
  .nocurrent-swiper .title {
    padding-top: 44px;
    margin-left: 30px;
    font-size: 16px;
    height: 25px;
    line-height: 25px;
  }
  .name {
    height: 70px;
    position: relative;
    line-height: 70px;
    font-size: 56px;
    margin-top: 18%;
    color: #eee;
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
    width: 2rem;
    height: 2rem;
    background: none;
  }

  .swiper.container img {
    height: 200px;
    width: 70%;
    margin-top: 34%;
  }
  .swiper .name {
    height: 70px;
    line-height: 70px;
    font-size: 3rem;
    margin-top: 18%;
  }
  .current-swiper,
  .nocurrent-swiper {
    width: 200px;
    height: 100%;
  }
  .current-swiper img,
  .nocurrent-swiper img {
    height: 180px;
    width: 80%;
    margin-top: 35%;
  }
  #leftSwiper {
    left: 60px;
  }
  #rightSwiper {
    right: 60px;
  }
  .split-line-left {
    position: absolute;
    width: 3px;
    height: 330px;
    left: 267px;
    top: 45px;
    background-color: #fff;
    box-shadow: 0 -13px 2px 0 #820063 inset, 0 13px 2px 0 #820063 inset;
  }
  .split-line-right {
    position: absolute;
    width: 3px;
    height: 330px;
    right: 267px;
    top: 45px;
    background-color: #fff;
    box-shadow: 0 -13px 2px 0 #820063 inset, 0 13px 2px 0 #820063 inset;
  }
}

@media (min-width: 993px) and (max-width: 1200px) {
  #swiper {
    width: 960px;
    height: 500px;
  }
  .banner {
    padding-top: 10px;
  }
  .banner h1 {
    font-size: 36px;
    text-align: center;
    font-weight: 400;
  }
  .banner h2 {
    font-size: 18px;
    color: #535353;
    text-align: center;
    font-weight: 400;
    margin: 20px 0 60px;
  }
  .banner .swiper {
    width: 940px;
    margin: 0 auto;
    position: relative;
  }
  .current-swiper {
    width: 300px;
    height: 100%;
    border-radius: 10px;
    margin: 0 auto;
    position: relative;
    z-index: 99;
    text-align: center;
  }
  #leftSwiper {
    position: absolute;
    left: 132px;
    top: 0;
    z-index: 1;
  }
  #rightSwiper {
    position: absolute;
    right: 132px;
    left: auto;
    top: 0;
    z-index: 1;
  }
  .nocurrent-swiper {
    width: 240px;
    height: 600px;
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
  .title {
    padding-top: 70px;
    margin-left: 45px;
    height: 29px;
    line-height: 29px;
    font-size: 18px;
    color: #666;
  }
  .nocurrent-swiper .title {
    padding-top: 44px;
    margin-left: 30px;
    font-size: 16px;
    height: 25px;
    line-height: 25px;
  }
  .name {
    height: 80px;
    position: relative;
    line-height: 80px;
    font-size: 66px;
    margin-top: 20%;
    color: #eee;
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

  .swiper.container img {
    height: 245px;
    width: 70%;
    margin-top: 58%;
  }
  .swiper .name {
    height: 80px;
    line-height: 80px;
    font-size: 3rem;
    margin-top: 18%;
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
  #leftSwiper {
    left: 80px;
  }
  #rightSwiper {
    right: 80px;
  }
  .split-line-left {
    position: absolute;
    width: 3px;
    height: 370px;
    left: 340px;
    top: 65px;
    background-color: #fff;
    box-shadow: 0 -13px 2px 0 #820063 inset, 0 13px 2px 0 #820063 inset;
  }
  .split-line-right {
    position: absolute;
    width: 3px;
    height: 370px;
    right: 340px;
    top: 65px;
    background-color: #fff;
    box-shadow: 0 -13px 2px 0 #820063 inset, 0 13px 2px 0 #820063 inset;
  }
}

@media (min-width: 1201px) {
  #swiper {
    width: 1140px;
    height: 660px;
  }
  .banner {
    padding-top: 10px;
  }
  .banner h1 {
    font-size: 36px;
    text-align: center;
    font-weight: 400;
  }
  .banner h2 {
    font-size: 18px;
    color: #535353;
    text-align: center;
    font-weight: 400;
    margin: 20px 0 60px;
  }
  .banner .swiper {
    width: 1300px;
    margin: 0 auto;
    position: relative;
  }
  .current-swiper {
    width: 300px;
    height: 100%;
    border-radius: 10px;
    margin: 0 auto;
    position: relative;
    z-index: 99;
    text-align: center;
  }
  #leftSwiper {
    position: absolute;
    left: 132px;
    top: 0;
    z-index: 1;
  }
  #rightSwiper {
    position: absolute;
    right: 132px;
    left: auto;
    top: 0;
    z-index: 1;
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
  .title {
    padding-top: 70px;
    margin-left: 45px;
    height: 29px;
    line-height: 29px;
    font-size: 18px;
    color: #666;
  }
  .nocurrent-swiper .title {
    padding-top: 44px;
    margin-left: 30px;
    font-size: 16px;
    height: 25px;
    line-height: 25px;
  }
  .name {
    height: 80px;
    position: relative;
    line-height: 80px;
    font-size: 66px;
    margin-top: 20%;
    color: #eee;
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
    width: 3.3rem;
    height: 3.3rem;
    background: none;
  }

  .swiper.container img {
    height: 245px;
    width: 70%;
    margin-top: 58%;
  }
  .swiper .name {
    height: 80px;
    line-height: 80px;
    font-size: 3rem;
    margin-top: 18%;
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
  #leftSwiper {
    left: 122px;
  }
  #rightSwiper {
    right: 122px;
  }
  .split-line-left {
    position: absolute;
    width: 3px;
    height: 400px;
    left: 420px;
    top: 170px;
    background-color: #fff;
    box-shadow: 0 -13px 2px 0 #820063 inset, 0 13px 2px 0 #820063 inset;
  }
  .split-line-right {
    position: absolute;
    width: 3px;
    height: 400px;
    right: 420px;
    top: 170px;
    background-color: #fff;
    box-shadow: 0 -13px 2px 0 #820063 inset, 0 13px 2px 0 #820063 inset;
  }
}

.swiper-button-next > img,
.swiper-button-prev > img {
  width: 100%;
  height: 100%;
}
</style>