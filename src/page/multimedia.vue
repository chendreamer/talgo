<template>
  <div>
    <div class="banner" style="width: 100%;">
      <div class="swiper" style="width: 1140px;">
        <div class="current-swiper swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide slide1">
              <router-link to="/play">
                <img :src="videoPicPath" class="to-video" />
              </router-link>
              <router-link to="/play">
                <div class="name to-video">video</div>
              </router-link>
            </div>
            <div class="swiper-slide slide2">
              <a href="music-list.html">
                <img :src="musicPicPath" class="to-music" />
              </a>
              <a href="music-list.html">
                <div class="name to-music">music</div>
              </a>
            </div>
            <div class="swiper-slide slide3">
              <a href="book-list.html">
                <img :src="bookPicPath" class="to-book" />
              </a>
              <a href="book-list.html">
                <div class="name to-book">book</div>
              </a>
            </div>
          </div>
        </div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
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
              <div class="name">book</div>
            </div>
            <div class="swiper-slide slide1">
              <img :src="videoPicPath" />
              <div class="name">video</div>
            </div>
            <div class="swiper-slide slide2">
              <img :src="musicPicPath" />
              <div class="name">music</div>
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
              <div class="name">music</div>
            </div>
            <div class="swiper-slide slide3">
              <img :src="bookPicPath" />
              <div class="name">book</div>
            </div>
            <div class="swiper-slide slide1">
              <img :src="videoPicPath" />
              <div class="name">video</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import '../assets/style/swiper.min.css';
import Swiper from "../assets/js/swiper.min.js";

export default {
  data: function() {
    return {
      videoPicPath: require("../assets/images/video.png"),
      bookPicPath: require("../assets/images/Book.png"),
      musicPicPath: require("../assets/images/Music.png")
    };
  },
  mounted: function() {
    var currentSwiper = new Swiper(".current-swiper", {
      loop: true
    });
    currentSwiper.$el
      .parent()
      .find(".swiper-button-next")
      .on("click", function() {
        currentSwiper.slideNext();
      });
    currentSwiper.$el
      .parent()
      .find(".swiper-button-prev")
      .on("click", function() {
        currentSwiper.slidePrev();
      });
    var leftSwiper = new Swiper(".left-swiper", {
      loop: true,
      simulateTouch: false
    });
    var rightSwiper = new Swiper(".right-swiper", {
      loop: true,
      simulateTouch: false
    });
    currentSwiper.controller.control = [leftSwiper, rightSwiper];
  }
};
</script>

<style>
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
  height: 670px;
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
  height: 670px;
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
.swiper-button-prev {
  width: 100px;
  height: 100px;
  background: no-repeat center center;
}
.swiper-button-next {
  width: 100px;
  height: 100px;
  background-size: auto;
}
@media (min-width: 1201px) {
  .swiper.container img {
    height: 245px;
    width: 70%;
    margin-top: 58%;
  }
  .swiper .name {
    height: 80px;
    line-height: 80px;
    font-size: 3.3rem;
    margin-top: 20%;
  }
  .current-swiper,
  .nocurrent-swiper {
    width: 300px;
    height: 670px;
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
  .swiper-button-next,
  .swiper-button-prev {
    width: 88px;
    height: 88px;
    background-size: 100%;
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
</style>