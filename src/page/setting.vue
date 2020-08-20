<template>
  <div>
    <el-container>
      <el-header class="bg-color">
        <Header class="container"></Header>
      </el-header>
      <div class="bg-color">
        <multimedia-logo pagename="setting" class="container"></multimedia-logo>
      </div>
      <el-main class="container">
        <ol>
          <li class="tc df" v-for="(item,index) in languageListArray" :key="index">
            <img class="hover" :src="item[0]" @click="changeLang(index)" alt />
            <span class="hover language-type" @click="changeLang(index)">{{item[1]}}</span>
            <div class="checked-circle" v-show="item[2]"></div>
            <div class="checked-circle-fake" v-show="!item[2]"></div>
          </li>
        </ol>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import i18n from "@/i18n";
import Header from "@/components/Header.vue";
import MultimediaLogo from "@/components/MultimediaLogo.vue";

//文字选中变粗

export default {
  components: { Header, MultimediaLogo },
  data: function () {
    return {
      languageListArray: [
        [require("../assets/images/English.png"), "English", 1, "en"],
        [require("../assets/images/Español.png"), "Español", 0, "es"],
        [require("../assets/images/Français.png"), "Français", 0, "fr"],
      ],
    };
  },
  beforeMount: function () {
    switch (i18n.locale) {
      case "en":
        this.changeLang(0);
        break;
      case "es":
        this.changeLang(1);
        break;
      case "fr":
        this.changeLang(2);
        break;
    }
  },
  mounted: function () {},
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
    changeLang: function (index) {
      this.languageListArray.forEach((element, i) => {
        this.$set(this.languageListArray[i], 2, index == i ? 1 : 0);
        if (index == i) {
          i18n.locale = element[3];
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@media (min-width: 768px) {
}

@media (max-width: 320px) {
  ol {
    list-style: none;
    width: 100%;
    margin: 0 auto;
    margin-top: 30px;
    li {
      margin-bottom: 1rem;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1.5rem;
      > .language-type {
        font-size: 1.5rem;
        color: #820063;
      }
      img {
        width: 80px;
      }
    }
  }

  .checked-circle {
    box-sizing: border-box;
    display: inline-block;
    width: 26px;
    height: 26px;
    border-radius: 13px;
    border: 6px solid #820063;
    vertical-align: middle;
    margin-left: 1rem;
  }

  .checked-circle-fake {
    box-sizing: border-box;
    display: inline-block;
    width: 26px;
    height: 26px;
    border-radius: 13px;
    border: 6px solid #fff;
    vertical-align: middle;
    margin-left: 1rem;
  }
}

@media (min-width: 321px) and (max-width: 360px) {
  ol {
    list-style: none;
    width: 90%;
    margin: 0 auto;
    margin-top: 40px;
    li {
      margin-bottom: 1rem;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1.5rem;
      > .language-type {
        font-size: 1.6rem;
        color: #820063;
      }
      img {
        width: 90px;
      }
    }
  }

  .checked-circle {
    box-sizing: border-box;
    display: inline-block;
    width: 26px;
    height: 26px;
    border-radius: 13px;
    border: 6px solid #820063;
    vertical-align: middle;
    margin-left: 1.6rem;
  }

  .checked-circle-fake {
    box-sizing: border-box;
    display: inline-block;
    width: 26px;
    height: 26px;
    border-radius: 13px;
    border: 6px solid #fff;
    vertical-align: middle;
    margin-left: 1.6rem;
  }
}

@media (min-width: 361px) and (max-width: 420px) {
  ol {
    list-style: none;
    width: 90%;
    margin: 0 auto;
    margin-top: 50px;
    li {
      margin-bottom: 1rem;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1.5rem;
      > .language-type {
        font-size: 1.6rem;
        color: #820063;
      }
    }
  }

  .checked-circle {
    box-sizing: border-box;
    display: inline-block;
    width: 26px;
    height: 26px;
    border-radius: 13px;
    border: 6px solid #820063;
    vertical-align: middle;
    margin-left: 2rem;
  }

  .checked-circle-fake {
    box-sizing: border-box;
    display: inline-block;
    width: 26px;
    height: 26px;
    border-radius: 13px;
    border: 6px solid #fff;
    vertical-align: middle;
    margin-left: 2rem;
  }
}

@media (min-width: 421px) and (max-width: 520px) {
  ol {
    list-style: none;
    width: 80%;
    margin: 0 auto;
    margin-top: 60px;
    li {
      margin-bottom: 1rem;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1.5rem;
      > .language-type {
        font-size: 1.6rem;
        color: #820063;
      }
    }
  }

  .checked-circle {
    box-sizing: border-box;
    display: inline-block;
    width: 26px;
    height: 26px;
    border-radius: 13px;
    border: 6px solid #820063;
    vertical-align: middle;
    margin-left: 2rem;
  }

  .checked-circle-fake {
    box-sizing: border-box;
    display: inline-block;
    width: 26px;
    height: 26px;
    border-radius: 13px;
    border: 6px solid #fff;
    vertical-align: middle;
    margin-left: 2rem;
  }
}

@media (min-width: 521px) and (max-width: 640px) {
  ol {
    list-style: none;
    width: 70%;
    margin: 0 auto;
    margin-top: 70px;
    li {
      margin-bottom: 1rem;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1.5rem;
      > .language-type {
        font-size: 1.6rem;
        color: #820063;
      }
    }
  }

  .checked-circle {
    box-sizing: border-box;
    display: inline-block;
    width: 26px;
    height: 26px;
    border-radius: 13px;
    border: 6px solid #820063;
    vertical-align: middle;
    margin-left: 2rem;
  }

  .checked-circle-fake {
    box-sizing: border-box;
    display: inline-block;
    width: 26px;
    height: 26px;
    border-radius: 13px;
    border: 6px solid #fff;
    vertical-align: middle;
    margin-left: 2rem;
  }
}

@media (min-width: 641px) and (max-width: 768px) {
  ol {
    list-style: none;
    width: 56%;
    margin: 0 auto;
    margin-top: 70px;
    li {
      margin-bottom: 1rem;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1.5rem;
      > .language-type {
        font-size: 1.6rem;
        color: #820063;
      }
    }
  }

  .checked-circle {
    box-sizing: border-box;
    display: inline-block;
    width: 26px;
    height: 26px;
    border-radius: 13px;
    border: 6px solid #820063;
    vertical-align: middle;
    margin-left: 2rem;
  }

  .checked-circle-fake {
    box-sizing: border-box;
    display: inline-block;
    width: 26px;
    height: 26px;
    border-radius: 13px;
    border: 6px solid #fff;
    vertical-align: middle;
    margin-left: 2rem;
  }
}

@media (min-width: 769px) and (max-width: 992px) {
  ol {
    list-style: none;
    width: 50%;
    margin: 0 auto;
    margin-top: 80px;
    li {
      margin-bottom: 1rem;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1.5rem;
      > .language-type {
        font-size: 1.5rem;
        color: #820063;
      }
    }
  }

  .checked-circle {
    box-sizing: border-box;
    display: inline-block;
    width: 26px;
    height: 26px;
    border-radius: 13px;
    border: 6px solid #820063;
    vertical-align: middle;
    margin-left: 2rem;
  }

  .checked-circle-fake {
    box-sizing: border-box;
    display: inline-block;
    width: 26px;
    height: 26px;
    border-radius: 13px;
    border: 6px solid #fff;
    vertical-align: middle;
    margin-left: 2rem;
  }
}

@media (min-width: 993px) and (max-width: 1200px) {
  ol {
    list-style: none;
    width: 44%;
    margin: 0 auto;
    margin-top: 90px;
    li {
      margin-bottom: 1rem;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1.5rem;
      > .language-type {
        font-size: 1.5rem;
        color: #820063;
      }
    }
  }

  .checked-circle {
    box-sizing: border-box;
    display: inline-block;
    width: 26px;
    height: 26px;
    border-radius: 13px;
    border: 6px solid #820063;
    vertical-align: middle;
    margin-left: 2rem;
  }

  .checked-circle-fake {
    box-sizing: border-box;
    display: inline-block;
    width: 26px;
    height: 26px;
    border-radius: 13px;
    border: 6px solid #fff;
    vertical-align: middle;
    margin-left: 2rem;
  }
}

@media (min-width: 1201px) {
  ol {
    list-style: none;
    width: 40%;
    margin: 0 auto;
    margin-top: 100px;
    li {
      margin-bottom: 1rem;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1.5rem;
      > .language-type {
        font-size: 1.5rem;
        color: #820063;
      }
    }
  }

  .checked-circle {
    box-sizing: border-box;
    display: inline-block;
    width: 26px;
    height: 26px;
    border-radius: 13px;
    border: 6px solid #820063;
    vertical-align: middle;
    margin-left: 2rem;
  }

  .checked-circle-fake {
    box-sizing: border-box;
    display: inline-block;
    width: 26px;
    height: 26px;
    border-radius: 13px;
    border: 6px solid #fff;
    vertical-align: middle;
    margin-left: 2rem;
  }
}
</style>