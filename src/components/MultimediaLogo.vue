<template>
  <div class="page-title">
    <span v-if="show">
      <img class="header-logo" :src="logoPath" alt />
    </span>
    <span>{{getHeaderTitle}}</span>
    <span></span>
  </div>
</template>


<script>
import i18n from "@/i18n";

export default {
  name: "MultimediaLogo",
  props: ["pagename"],
  data: function () {
    return {
      logoPath: "",
      headerTitle: "",
      show: true,
    };
  },
  mounted: function () {
    switch (this.pagename) {
      case "setting":
        this.logoPath = require("../assets/images/setting.png");
        break;
      case "tourist":
        this.logoPath = require("../assets/images/tourist-Information.png");
        break;
      case "passenger":
        this.logoPath = require("../assets/images/passenger-Information.png");
        break;
      case "multimedia":
        this.logoPath = require("../assets/images/Multimedia.png");
        break;
      case "video":
        this.logoPath = require("../assets/images/Multimedia.png");
        break;
      case "book":
        this.logoPath = require("../assets/images/Multimedia.png");
        break;
      case "music":
        this.logoPath = require("../assets/images/Multimedia.png");
        break;
      default:
        this.show = false;
        break;
    }
  },
  computed: {
    getHeaderTitle: function () {
      var titleMsg = "";
      switch (this.pagename) {
        case "setting":
          titleMsg = i18n.tc("message.setting");
          break;
        case "tourist":
          titleMsg = i18n.tc("message.touristInformation");
          break;
        case "passenger":
          titleMsg = i18n.tc("message.passengerInformation");
          break;
        case "trainsetFloorPlan":
          titleMsg = i18n.tc("message.trainsetFloorPlan");
          break;
        case "technical":
          titleMsg = i18n.tc("message.technicalFeatures");
          break;
        case "multimedia":
          titleMsg = i18n.tc("message.multimedia");
          break;
        case "video":
          titleMsg = i18n.tc("message.multimedia");
          break;
        case "book":
          titleMsg = i18n.tc("message.multimedia");
          break;
        case "music":
          titleMsg = i18n.tc("message.multimedia");
          break;
      }
      return titleMsg;
    },
  },
};
</script>


<style lang="scss" scoped>
// @media (min-width:768px){

// }

@media (max-width: 320px) {
  span {
    font-size: .9rem;
    margin-left: 0.25rem;
  }
  .header-logo {
    width: 1.2rem;
    height: 1.2rem;
    vertical-align: middle;
  }
}

@media (min-width: 321px) and (max-width: 360px) {
  span {
    font-size: 1rem;
    margin-left: 0.3rem;
  }
  .header-logo {
    width: 1.4rem;
    height: 1.4rem;
    vertical-align: middle;
  }
}

@media (min-width: 361px) and (max-width: 420px) {
  span {
    font-size: 1.1rem;
    margin-left: 0.35rem;
  }
  .header-logo {
    width: 1.6rem;
    height: 1.6rem;
    vertical-align: middle;
  }
}

@media (min-width: 421px) and (max-width: 520px) {
  span {
    font-size: 1.3rem;
    margin-left: 0.4rem;
  }
  .header-logo {
    width: 1.7rem;
    height: 1.7rem;
    vertical-align: middle;
  }
}

@media (min-width: 521px) and (max-width: 640px) {
  span {
    font-size: 1.5rem;
    margin-left: 0.5rem;
  }
  .header-logo {
    width: 1.9rem;
    height: 1.9rem;
    vertical-align: middle;
  }
}

@media (min-width: 641px) and (max-width: 768px) {
  span {
    font-size: 1.7rem;
    margin-left: 0.6rem;
  }
  .header-logo {
    width: 2rem;
    height: 2rem;
    vertical-align: middle;
  }
}

@media (min-width: 769px) and (max-width: 999px) {
  span {
    font-size: 1.9rem;
    margin-left: 0.7rem;
  }
  .header-logo {
    width: 2.4rem;
    height: 2.4rem;
    vertical-align: middle;
  }
}

@media (min-width: 1000px) and (max-width: 1239px) {
  span {
    font-size: 2rem;
    margin-left: 0.8rem;
  }

  .header-logo {
    width: 2.4rem;
    height: 2.4rem;
    vertical-align: middle;
  }
}

@media (min-width: 1240px) {
  
  span {
    font-size: 2.1rem;
    margin-left: .9rem;
  }

  .header-logo {
    width: 2.4rem;
    height: 2.4rem;
    vertical-align: middle;
  }
}

@media (max-width: 768px) {
  .page-title {
    padding: 0.3rem 0;
  }
}

@media (min-width: 769px){
.page-title {
    padding: 0.5rem 0;
  }
}

span {
  display: inline-block;
}
</style>