<template>
  <div style="height:100%">
    <div class="main-content">
      <div class="select-language">
          <div class="language language-en" language="en" @click="setLang('en')">
            <p>Hello</p>
            <img src="../assets/images/UK.png" />
          </div>
          <div class="language language-fr" language="fr" @click="setLang('es')">
            <p>Halo</p>
            <img src="../assets/images/France.png" />
          </div>
          <div class="language language-sp" language="es" @click="setLang('fr')">
            <p>Bonjour</p>
            <img src="../assets/images/Spain.png" />
          </div>
        
      </div>

      <div class="welcome-slogan">
        <p>welcome</p>
      </div>
    </div>

    <div class="ellipse-lg"></div>
    <div class="ellipse-sm"></div>
  </div>
</template>

<script>
import i18n from "@/i18n";

export default {
  created: function () {
    var that = this;
    document.body.style.height = that.caclHeight() + "px";
    document.body.onresize = function () {
      document.body.style.height = that.caclHeight() + "px";
    };

    //连接mqtt server
    that.$store.dispatch("connectMqttServer");

    // that.$message({
    //         message: 'error',
    //         type: "info",
    //         center: true,
    //         // iconClass: "",
    //         duration: 0,
    //       });
  },
  methods: {
    caclHeight: function () {
      //  var clientHeight = 0;
      //   if (document.body.clientHeight && document.documentElement.clientHeight) {
      //     clientHeight =
      //       document.body.clientHeight < document.documentElement.clientHeight
      //         ? document.body.clientHeight
      //         : document.documentElement.clientHeight;
      //   } else {
      //     clientHeight =
      //       document.body.clientHeight > document.documentElement.clientHeight
      //         ? document.body.clientHeight
      //         : document.documentElement.clientHeight;
      //   }
      return document.documentElement.clientHeight;
    },
    setLang:function(lang){
      //console.log(lang);
      i18n.locale = lang;
      this.$router.push('/home');
    }
  },
  beforeRouteLeave(to, from, next) {
    document.querySelector("body").removeAttribute("style");
    next();
  },
};
</script>

<style scoped>
body {
  background-color: #820063;
  position: relative;
  min-width: 300px;
}
.language:hover {
  cursor: pointer;
  -webkit-box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  -webkit-transform: translate3d(0, -2px, 0);
  transform: translate3d(0, -2px, 0);
}
.language-en {
  background-color: #cd99c1;
}
.language-fr {
  background-color: #cd005e;
}
.language-sp {
  background-color: #344cc1;
}
.language-en p,
.language-fr p,
.language-sp p {
  margin: 0;
  text-align: center;
}
.language {
  overflow: hidden;
}
.ellipse-lg,
.ellipse-sm {
  position: absolute;
  z-index: -1;
  background-color: #8f1a73;
}
@media (max-width: 320px) {
  .select-language {
    width: 100%;
    height: 110px;
    position: absolute;
    bottom: 10%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    border-bottom: 2px solid #a84d92;
    border-top: 2px solid #a84d92;
    background-color: #5b0045;
  }
  .language-en p,
  .language-fr p,
  .language-sp p {
    height: 40px;
    color: #fff;
    line-height: 2.6rem;
  }
  .language-en p,
  .language-fr p {
    font-size: 1rem;
  }
  .language-sp p {
    font-size: 0.8rem;
  }
  .language {
    width: 80px;
    height: 80px;
    border-radius: 40px;
  }
  .language img {
    width: 80px;
    height: 40px;
  }
  .ellipse-lg {
    left: -116px;
    top: -76px;
    width: 300px;
    height: 300px;
    border-radius: 150px;
  }
  .ellipse-sm {
    left: 175px;
    top: 157px;
    width: 80px;
    height: 80px;
    border-radius: 40px;
  }
}
@media (min-width: 321px) and (max-width: 360px) {
  .select-language {
    width: 100%;
    height: 120px;
    position: absolute;
    bottom: 11%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    border-bottom: 2px solid #a84d92;
    border-top: 2px solid #a84d92;
    background-color: #5b0045;
  }
  .language-en p,
  .language-fr p,
  .language-sp p {
    height: 46px;
    color: #fff;
    line-height: 2.9rem;
  }
  .language-en p,
  .language-fr p {
    font-size: 1.1rem;
  }
  .language-sp p {
    font-size: 0.9rem;
  }
  .language {
    width: 92px;
    height: 92px;
    border-radius: 46px;
  }
  .language img {
    width: 92px;
    height: 46px;
  }
  .ellipse-lg {
    left: -101px;
    top: -62px;
    width: 300px;
    height: 300px;
    border-radius: 150px;
  }
  .ellipse-sm {
    left: 188px;
    top: 157px;
    width: 80px;
    height: 80px;
    border-radius: 40px;
  }
}
@media (min-width: 361px) and (max-width: 420px) {
  .select-language {
    width: 100%;
    height: 130px;
    position: absolute;
    bottom: 12%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    border-bottom: 2px solid #a84d92;
    border-top: 2px solid #a84d92;
    background-color: #5b0045;
  }
  .language-en p,
  .language-fr p,
  .language-sp p {
    height: 50px;
    color: #fff;
    line-height: 3.1rem;
  }
  .language-en p,
  .language-fr p {
    font-size: 1.2rem;
  }
  .language-sp p {
    font-size: 1rem;
  }
  .language {
    width: 100px;
    height: 100px;
    border-radius: 50px;
  }
  .language img {
    width: 100px;
    height: 50px;
  }
  .ellipse-lg {
    left: -86px;
    top: -56px;
    width: 340px;
    height: 340px;
    border-radius: 170px;
  }
  .ellipse-sm {
    left: 245px;
    top: 168px;
    width: 120px;
    height: 120px;
    border-radius: 60px;
  }
}
@media (min-width: 421px) and (max-width: 520px) {
  .select-language {
    width: 100%;
    height: 140px;
    position: absolute;
    bottom: 13%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    border-bottom: 2px solid #a84d92;
    border-top: 2px solid #a84d92;
    background-color: #5b0045;
  }
  .language-en p,
  .language-fr p,
  .language-sp p {
    height: 56px;
    color: #fff;
    line-height: 3.3rem;
  }
  .language-en p,
  .language-fr p {
    font-size: 1.2rem;
  }
  .language-sp p {
    font-size: 1rem;
  }
  .language {
    width: 112px;
    height: 112px;
    border-radius: 56px;
  }
  .language img {
    width: 112px;
    height: 56px;
  }
  .ellipse-lg {
    left: -96px;
    top: -66px;
    width: 400px;
    height: 400px;
    border-radius: 200px;
  }
  .ellipse-sm {
    left: 295px;
    top: 228px;
    width: 140px;
    height: 140px;
    border-radius: 70px;
  }
}
@media (min-width: 521px) and (max-width: 640px) {
  .select-language {
    width: 100%;
    height: 150px;
    position: absolute;
    bottom: 14%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    border-bottom: 2px solid #a84d92;
    border-top: 2px solid #a84d92;
    background-color: #5b0045;
  }
  .language-en p,
  .language-fr p,
  .language-sp p {
    height: 59px;
    color: #fff;
    line-height: 3.5rem;
  }
  .language-en p,
  .language-fr p {
    font-size: 1.3rem;
  }
  .language-sp p {
    font-size: 1.1rem;
  }
  .language {
    width: 118px;
    height: 118px;
    border-radius: 59px;
  }
  .language img {
    width: 118px;
    height: 59px;
  }
  .ellipse-lg {
    left: -96px;
    top: -66px;
    width: 460px;
    height: 460px;
    border-radius: 230px;
  }
  .ellipse-sm {
    left: 365px;
    top: 248px;
    width: 140px;
    height: 140px;
    border-radius: 70px;
  }
}
@media (min-width: 641px) and (max-width: 768px) {
  .select-language {
    width: 100%;
    height: 160px;
    position: absolute;
    bottom: 15%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    border-bottom: 2px solid #a84d92;
    border-top: 2px solid #a84d92;
    background-color: #5b0045;
  }
  .language-en p,
  .language-fr p,
  .language-sp p {
    height: 62px;
    color: #fff;
    line-height: 3.7rem;
  }
  .language-en p,
  .language-fr p {
    font-size: 1.4rem;
  }
  .language-sp p {
    font-size: 1.2rem;
  }
  .language {
    width: 124px;
    height: 124px;
    border-radius: 62px;
  }
  .language img {
    width: 124px;
    height: 62px;
  }
  .ellipse-lg {
    left: -71px;
    top: -66px;
    width: 500px;
    height: 500px;
    border-radius: 250px;
  }
  .ellipse-sm {
    left: 425px;
    top: 266px;
    width: 140px;
    height: 140px;
    border-radius: 70px;
  }
}
@media (max-width: 768px) {
  .main-content {
    width: 100%;
    height: 100%;
    z-index: 9;
  }
  .welcome-slogan {
    display: none;
  }
}
@media (min-width: 769px) {
  body {
    min-height: 660px;
  }
  .main-content {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    z-index: 9;
  }
  .select-language {
    width: 300px;
    height: 500px;
    position: relative;
    margin-right: 16px;
  }
  .language-en {
    top: 0;
    right: 0;
  }
  .language-fr {
    top: 34%;
    left: 0;
  }
  .language-sp {
    bottom: 0;
    right: 0;
  }
  .language-en p,
  .language-fr p,
  .language-sp p {
    height: 80px;
    color: #fff;
    line-height: 5.4rem;
  }
  .language-en p,
  .language-fr p {
    font-size: 2.1rem;
  }
  .language-sp p {
    font-size: 1.8rem;
  }
  .language {
    width: 160px;
    height: 160px;
    position: absolute;
    border-radius: 80px;
  }
  .language img {
    width: 160px;
    height: 80px;
  }
  .welcome-slogan {
    width: 250px;
    height: 500px;
    border-bottom: 5px solid #eee;
    border-top: 5px solid #eee;
    border-left: 5px solid #eee;
    border-radius: 250px 0 0 250px;
    text-align: center;
  }
  .welcome-slogan p {
    color: #fff;
    line-height: 500px;
    font-size: 2.4rem;
  }
  .ellipse-lg {
    left: -126px;
    top: -156px;
    width: 660px;
    height: 660px;
    border-radius: 330px;
  }
  .ellipse-sm {
    left: 260px;
    top: 530px;
    width: 140px;
    height: 140px;
    border-radius: 70px;
  }
}
</style>