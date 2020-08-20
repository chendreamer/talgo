<template>
  <div>
    <el-container>
      <el-header class="bg-color">
        <Header class="container"></Header>
      </el-header>
      <div class="bg-color">
        <multimedia-logo pagename="passenger" class="container"></multimedia-logo>
      </div>
      <el-main class="container">
        <ol>
          <li>
            <div class="list-title">{{$t("message.trainsetFloorPlan")}}</div>
            <div class="list-view">{{$t("message.view")}}</div>
            <router-link to="/trainsetFloorPlan">
              <img src="../assets/images/Right.png" alt />
            </router-link>
          </li>
          <li>
            <div class="list-title">{{$t("message.technicalFeatures")}}</div>
            <div class="list-view">{{$t("message.view")}}</div>
            <router-link to="/technical">
              <img src="../assets/images/Right.png" alt />
            </router-link>
          </li>
        </ol>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import MultimediaLogo from "@/components/MultimediaLogo.vue";

export default {
  components: { Header, MultimediaLogo },
  data: function () {
    return {};
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
  methods: {},
  computed: {},
};
</script>

<style lang="scss" scoped>
@media (max-width: 320px) {
  ol {
    list-style: none;
    margin-top: 40px;
    li {
      display: flex;
      margin-bottom: 1.5rem;
      align-items: center;
      justify-content: space-between;
      > .list-title {
        height: 1.5rem;
        line-height: 1.5rem;
        padding: 0.3rem 0.9rem;
        background-color: #820063;
        font-size: 0.8rem;
        border-radius: 1.5rem;
      }
      > .list-view {
        font-size: 0.9rem;
        color: #820063;
      }
      img {
        width: 1.5rem;
        height: 1.5rem;
      }
    }
  }
}

@media (min-width: 321px) and (max-width: 360px) {
  ol {
    list-style: none;
    margin-top: 50px;
    li {
      display: flex;
      margin-bottom: 1.6rem;
      align-items: center;
      justify-content: space-between;
      > .list-title {
        height: 1.6rem;
        line-height: 1.6rem;
        padding: 0.2rem 1rem;
        background-color: #820063;
        font-size: 0.9rem;
        border-radius: 1.5rem;
      }
      > .list-view {
        font-size: 1rem;
        color: #820063;
      }
      img {
        width: 1.6rem;
        height: 1.6rem;
      }
    }
  }
}

@media (min-width: 361px) and (max-width: 420px) {
  ol {
    list-style: none;
    margin-top: 60px;
    li {
      display: flex;
      margin-bottom: 1.8rem;
      align-items: center;
      justify-content: space-between;
      > .list-title {
        height: 1.8rem;
        line-height: 1.8rem;
        padding: 0.2rem 1.1rem;
        background-color: #820063;
        font-size: 1rem;
        border-radius: 1.5rem;
      }
      > .list-view {
        font-size: 1.1rem;
        color: #820063;
      }
      img {
        width: 1.8rem;
        height: 1.8rem;
      }
    }
  }
}

@media (min-width: 421px) and (max-width: 520px) {
  ol {
    list-style: none;
    margin-top: 60px;
    li {
      display: flex;
      margin-bottom: 2rem;
      align-items: center;
      justify-content: space-between;
      > .list-title {
        height: 2rem;
        line-height: 2rem;
        padding: 0.2rem 1.2rem;
        background-color: #820063;
        font-size: 1rem;
        border-radius: 1.5rem;
      }
      > .list-view {
        font-size: 1.1rem;
        color: #820063;
      }
      img {
        width: 2rem;
        height: 2rem;
      }
    }
  }
}

@media (min-width: 521px) and (max-width: 640px) {
  ol {
    list-style: none;
    // width: 70%;
    // margin: 0 auto;
    margin-top: 60px;
    li {
      display: flex;
      margin-bottom: 2rem;
      align-items: center;
      justify-content: space-between;
      > .list-title {
        height: 2rem;
        line-height: 2rem;
        padding: 0.2rem 1.4rem;
        background-color: #820063;
        font-size: 1.1rem;
        border-radius: 1.5rem;
      }
      > .list-view {
        font-size: 1.2rem;
        color: #820063;
      }
      img {
        width: 2rem;
        height: 2rem;
      }
    }
  }
}

@media (min-width: 641px) and (max-width: 768px) {
  ol {
    list-style: none;
    width: 90%;
    margin: 0 auto;
    margin-top: 100px;
    li {
      display: flex;
      margin-bottom: 2rem;
      align-items: center;
      justify-content: space-between;
      > .list-title {
        height: 2.2rem;
        line-height: 2.2rem;
        padding: 0.3rem 2rem;
        background-color: #820063;
        font-size: 1.4rem;
        border-radius: 1.6rem;
      }
      > .list-view {
        font-size: 1.5rem;
        color: #820063;
      }
    }
  }
}

@media (min-width: 769px) and (max-width: 992px) {
  ol {
    list-style: none;
    width: 80%;
    margin: 0 auto;
    margin-top: 100px;
    li {
      display: flex;
      margin-bottom: 2rem;
      align-items: center;
      justify-content: space-between;
      > .list-title {
        height: 2.2rem;
        line-height: 2.2rem;
        padding: 0.3rem 2rem;
        background-color: #820063;
        font-size: 1.4rem;
        border-radius: 1.6rem;
      }
      > .list-view {
        font-size: 1.5rem;
        color: #820063;
      }
    }
  }
}

@media (min-width: 993px) and (max-width: 1200px) {
  ol {
    list-style: none;
    width: 70%;
    margin: 0 auto;
    margin-top: 100px;
    li {
      display: flex;
      margin-bottom: 2rem;
      align-items: center;
      justify-content: space-between;
      > .list-title {
        height: 2.2rem;
        line-height: 2.2rem;
        padding: 0.3rem 2rem;
        background-color: #820063;
        font-size: 1.4rem;
        border-radius: 1.6rem;
      }
      > .list-view {
        font-size: 1.5rem;
        color: #820063;
      }
    }
  }
}

@media (min-width: 1201px) {
  ol {
    list-style: none;
    width: 70%;
    margin: 0 auto;
    margin-top: 100px;
    li {
      display: flex;
      margin-bottom: 2rem;
      align-items: center;
      justify-content: space-between;
      > .list-title {
        height: 2.2rem;
        line-height: 2.2rem;
        padding: 0.3rem 2rem;
        background-color: #820063;
        font-size: 1.4rem;
        border-radius: 1.6rem;
      }
      > .list-view {
        font-size: 1.5rem;
        color: #820063;
      }
    }
  }
}
</style>