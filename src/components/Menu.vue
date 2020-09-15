<template>
  <div>
    <div v-for="(item,index) in menuList" :key="index">
      <router-link :to="item.linkto" class="menu-item">
        <img class="menu-img" :src="item.path" />
        <span>{{item.name}}</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import i18n from "@/i18n";

export default {
  name: "Menu",
  data: function () {
    return {
      menuList: [
        {
          name: i18n.tc("message.multimedia"),
          linkto: "multimedia",
          path: require("../assets/images/Multimedia.png"),
        },
        {
          name: i18n.tc("message.passengerInformation"),
          linkto: "passengerInformation",
          path: require("../assets/images/passenger-Information.png"),
        },
        {
          name: i18n.tc("message.touristInformation"),
          linkto: "touristInformation",
          path: require("../assets/images/tourist-Information.png"),
        },
        {
          name: i18n.tc("message.map"),
          linkto: "map",
          path: require("../assets/images/map.png"),
        },
        {
          name: i18n.tc("message.setting"),
          linkto: "setting",
          path: require("../assets/images/setting.png"),
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
/* .to-multimedia-img{background-image:url(../assets/images/Multimedia.png)}
.to-passenger_information-img{background-image:url(../assets/images/passenger-Information.png)}
.to-tourist_information-img{background-image:url(../assets/images/tourist-Information.png)}
.to-map-img{background-image:url(../assets/images/map.png)}
.to-setting-img{background-image:url(../assets/images/setting.png)} */
.menu-item {
  display: block;
  color: #fff;
  background-color: #9e3084;
  text-decoration: none;
  > .menu-img {
    display: inline-block;
    vertical-align: middle;
  }
}

@media (max-width: 320px) {
  .menu-item {
    padding: .3rem;
    padding-left: .6rem;
    margin-top: .8rem;
    border-radius: 2rem;
    font-size: .9rem;
    > .menu-img {
      width: 1.7rem;
      height: 1.7rem;
      margin-right: .5rem;
    }
  }
}

@media (min-width: 321px) and (max-width: 360px) {
  .menu-item {
    padding: .3rem;
    padding-left: .8rem;
    margin-top: .9rem;
    border-radius: 2rem;
    font-size: 1rem;
    > .menu-img {
      width: 1.8rem;
      height: 1.8rem;
      margin-right: .6rem;
    }
  }
}

@media (min-width: 361px) and (max-width: 420px) {
  .menu-item {
    padding: .4rem;
    padding-left: 1rem;
    margin-top: 1rem;
    border-radius: 2rem;
    font-size: 1.1rem;
    > .menu-img {
      width: 1.9rem;
      height: 1.9rem;
      margin-right: 0.7rem;
    }
  }
}

@media (min-width: 421px) and (max-width: 520px) {
  .menu-item {
    padding: 0.5rem;
    padding-left: 1.2rem;
    margin-top: 1.1rem;
    border-radius: 40px;
    font-size: 1.2rem;
    > .menu-img {
      width: 2rem;
      height: 2rem;
      margin-right: 0.8rem;
    }
  }
}

@media (min-width: 521px) and (max-width: 640px) {
  .menu-item {
    padding: 0.5rem;
    padding-left: 1.4rem;
    margin-top: 1.3rem;
    border-radius: 40px;
    font-size: 1.5rem;
    > .menu-img {
      width: 2.2rem;
      height: 2.2rem;
      margin-right: 0.9rem;
    }
  }
}

@media (min-width: 641px) and (max-width: 768px) {
  .menu-item {
    padding: 0.6rem;
    padding-left: 1.4rem;
    margin-top: 1.4rem;
    border-radius: 40px;
    font-size: 1.55rem;
    > .menu-img {
      width: 2.2rem;
      height: 2.2rem;
      margin-right: 0.9rem;
    }
  }
}

@media (min-width: 769px) and (max-width: 999px) {
  .menu-item {
    padding: 0.6rem;
    padding-left: 1.4rem;
    margin-top: 1.4rem;
    border-radius: 40px;
    font-size: 1.6rem;
    > .menu-img {
      width: 2.2rem;
      height: 2.2rem;
      margin-right: 0.9rem;
    }
  }
}

@media (min-width: 1000px) and (max-width: 1239px) {
  .menu-item {
    padding: 0.65rem;
    padding-left: 1.7rem;
    margin-top: 1.5rem;
    border-radius: 40px;
    font-size: 1.7rem;
    > .menu-img {
      width: 2.3rem;
      height: 2.3rem;
      margin-right: 1rem;
    }
  }
}

@media (min-width: 1240px) {
  .menu-item {
    padding: 0.7rem;
    padding-left: 2rem;
    margin-top: 1.6rem;
    border-radius: 40px;
    font-size: 1.8rem;
    > .menu-img {
      width: 2.5rem;
      height: 2.5rem;
      margin-right: 1.2rem;
    }
  }
}
</style>