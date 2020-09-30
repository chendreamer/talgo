<template>
  <div class="page-logo">
    <img class="menu-logo" :src="menu_logo_path" alt="Menu" />
    <p class="menu-logo-txt">{{menu_logo_txt}}</p>
  </div>
</template>


<script>
import i18n from "@/i18n";

export default {
  name: "PageLogo",
  props: ["pagename"],
  data: function () {
    return {
      menu_logo_path: "",
      menu_logo_txt: "",
      logo_array: [
        {
          name: "menu",
          data: [i18n.tc("message.menu"), require("../assets/images/menu.png")],
        },
        {
          name: "video",
          data: [i18n.tc("message.video"), require("../assets/images/video.png")],
        },
        {
          name: "book",
          data: [i18n.tc("message.book"), require("../assets/images/Book.png")],
        },
        {
          name: "music",
          data: [i18n.tc("message.music"), require("../assets/images/Music.png")],
        },
      ],
    };
  },
  beforeMount: function () {
    this.logo_array.forEach((element) => {
      if (this.pagename == element.name) {
        this.menu_logo_path = element.data[1];
        this.menu_logo_txt = element.data[0];
      }
    });
  },
};
</script>


<style lang="scss" scoped>
// @media (min-width:768px){

// }

@media (max-width: 320px) {
  .menu-logo {
    width: 90px;
    margin-top: 20px;
  }
  .menu-logo-txt {
    margin-top: .5rem;
    font-size: 1.7rem;
    font-weight: 100;
  }
}

@media (min-width: 321px) and (max-width: 360px) {
  .menu-logo {
    width: 100px;
    margin-top: 24px;
  }
  .menu-logo-txt {
    margin-top: .6rem;
    font-size: 1.8rem;
    font-weight: 100;
  }
}

@media (min-width: 361px) and (max-width: 420px) {
  .menu-logo {
    width: 110px;
    margin-top: 28px;
  }
  .menu-logo-txt {
    margin-top: .65rem;
    font-size: 1.9rem;
    font-weight: 100;
  }
}

@media (min-width: 421px) and (max-width: 520px) {
  .menu-logo {
    width: 120px;
    margin-top: 32px;
  }
  .menu-logo-txt {
    margin-top: .7rem;
    font-size: 2rem;
    font-weight: 100;
  }
}

@media (min-width: 521px) and (max-width: 640px) {
  .menu-logo {
    width: 130px;
    margin-top: 36px;
  }
  .menu-logo-txt {
    margin-top: .75rem;
    font-size: 2rem;
    font-weight: 100;
  }
}

@media (min-width: 641px) and (max-width: 768px) {
  .menu-logo {
    width: 140px;
    margin-top: 40px;
  }
  .menu-logo-txt {
    margin-top: .8rem;
    font-size: 2.2rem;
    font-weight: 100;
  }
}

@media (min-width: 769px) and (max-width: 999px) {
  .menu-logo {
    width: 120px;
    margin-top: 130px;
  }
  .menu-logo-txt {
    margin-top: .8rem;
    font-size: 1.9rem;
    font-weight: 100;
  }
}

@media (min-width: 1000px) and (max-width: 1239px) {
  .menu-logo {
    width: 140px;
    margin-top: 145px;
  }
  .menu-logo-txt {
    margin-top: .9rem;
    font-size: 2.3rem;
    font-weight: 100;
  }
}

@media (min-width: 1240px) {
  .menu-logo {
    width: 150px;
    margin-top: 155px;
  }
  .menu-logo-txt {
    margin-top: 1rem;
    font-size: 2.5rem;
    font-weight: 100;
  }
}
</style>