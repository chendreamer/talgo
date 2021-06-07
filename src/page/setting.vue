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
            <img v-once class="hover" :src="item[0]" @click="changeLang(index)" alt />
            <span v-once class="hover language-type" @click="changeLang(index)">{{item[1]}}</span>
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
import axios from "axios";
import Header from "@/components/Header.vue";
import MultimediaLogo from "@/components/MultimediaLogo.vue";

//文字选中变粗

export default {
  components: { Header, MultimediaLogo },
  data: function () {
    return {
      languageListArray: [
        // [require("../assets/images/English.png"), "English", 1, "en"],
        // [require("../assets/images/Español.png"), "Español", 0, "es"],
        // [require("../assets/images/Français.png"), "Français", 0, "fr"],
        [require("../assets/images/Russia.png"), "русский", 1, "en"],
        [require("../assets/images/Español.png"), "Español", 0, "es"],
        [require("../assets/images/Uzbekistan.png"), "O'zbek", 0, "fr"],
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
  mounted: function () {
    let that = this;
    axios
      .get(that.$store.state.media_server + "/heart")
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
        that.$message({
          message: i18n.tc("message.networkError"),
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
ol {
  list-style: none;
  margin: 0 auto;
  li {
    align-items: center;
    justify-content: space-between;
    > .language-type {
      color: #820063;
    }
  }
}

@media (min-width: 769px) {
  ol {
    li {
      margin-bottom: 1rem;
      margin-bottom: 1.5rem;
      > .language-type {
        font-size: 1.5rem;
      }
    }
  }
  .checked-circle,
  .checked-circle-fake {
    box-sizing: border-box;
    display: inline-block;
    width: 26px;
    height: 26px;
    border-radius: 13px;
    border: 6px solid;
    vertical-align: middle;
    margin-left: 2rem;
  }
}

@media (max-width: 768px) {
  .checked-circle,
  .checked-circle-fake {
    box-sizing: border-box;
    display: inline-block;
    width: 22px;
    height: 22px;
    border-radius: 11px;
    border: 5px solid;
    vertical-align: middle;
  }
}

@media (max-width: 320px) {
  ol {
    width: 90%;
    margin-top: 30px;
    li {
      margin-bottom: 0.7rem;
      margin-bottom: 1.5rem;
      > .language-type {
        font-size: 1.1rem;
      }
      img {
        width: 70px;
      }
    }
  }
}

@media (min-width: 321px) and (max-width: 360px) {
  ol {
    width: 85%;
    margin-top: 30px;
    li {
      margin-bottom: 0.7rem;
      margin-bottom: 1.5rem;
      > .language-type {
        font-size: 1.2rem;
      }
      img {
        width: 70px;
      }
    }
  }
}

@media (min-width: 361px) and (max-width: 420px) {
  ol {
    width: 80%;
    margin-top: 30px;
    li {
      margin-bottom: 0.7rem;
      margin-bottom: 1.5rem;
      > .language-type {
        font-size: 1.2rem;
      }
      img {
        width: 70px;
      }
    }
  }
}

@media (min-width: 421px) and (max-width: 520px) {
  ol {
    width: 75%;
    margin-top: 30px;
    li {
      margin-bottom: 0.7rem;
      margin-bottom: 1.5rem;
      > .language-type {
        font-size: 1.3rem;
      }
      img {
        width: 75px;
      }
    }
  }
}

@media (min-width: 521px) and (max-width: 640px) {
  ol {
    width: 70%;
    margin-top: 40px;
    li {
      margin-bottom: 0.8rem;
      margin-bottom: 1.5rem;
      > .language-type {
        font-size: 1.3rem;
      }
      img {
        width: 80px;
      }
    }
  }
}

@media (min-width: 641px) and (max-width: 768px) {
  ol {
    width: 60%;
    margin-top: 50px;
    li {
      margin-bottom: 0.8rem;
      margin-bottom: 1.5rem;
      > .language-type {
        font-size: 1.4rem;
      }
      img {
        width: 90px;
      }
    }
  }
}

@media (min-width: 769px) and (max-width: 999px) {
  ol {
    width: 54%;
    margin-top: 80px;
  }
}

@media (min-width: 1000px) and (max-width: 1239px) {
  ol {
    width: 44%;
    margin-top: 90px;
  }
}

@media (min-width: 1240px) {
  ol {
    width: 36%;
    margin-top: 100px;
  }
}

.checked-circle {
  border-color: #820063;
}
.checked-circle-fake {
  border-color: #fff;
}
</style>