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
        <div class="passengerlist">
          <ol>
            <li>
              <div class="list-title tc">{{$t("message.trainsetFloorPlan")}}</div>
            </li>
            <li>
              <div class="list-title tc">{{$t("message.technicalFeatures")}}</div>
            </li>
          </ol>
          <ol>
            <li>
              <div class="list-view">{{$t("message.view")}}</div>
            </li>
            <li>
              <div class="list-view">{{$t("message.view")}}</div>
            </li>
          </ol>
          <ol>
            <li>
              <router-link to="/trainsetFloorPlan">
                <img src="../assets/images/Right.png" alt />
              </router-link>
            </li>
            <li>
              <router-link to="/technical">
                <img src="../assets/images/Right.png" alt />
              </router-link>
            </li>
          </ol>
        </div>
        <!-- <ol>
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
        </ol>-->
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
.passengerlist {
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ol {
    list-style: none;
    li {
      > .list-title {
        background-color: #820063;
      }
      > .list-view {
        color: #820063;
      }
    }
  }
}

@media (max-width: 320px) {
  .passengerlist {
    margin-top: 20px;

    ol {
      li {
        margin-top: 0.7rem;
        > .list-title {
          height: 1.2rem;
          line-height: 1.2rem;
          padding: 0.1rem 0.5rem;
          font-size: 0.65rem;
          border-radius: 1.6rem;
        }
        > .list-view {
          font-size: 0.7rem;
          height: 1.4rem;
          line-height: 1.4rem;
        }
        img {
          width: 1.1rem;
          height: 1.1rem;
        }
      }
    }
  }
}

@media (min-width: 321px) and (max-width: 360px) {
  .passengerlist {
    margin-top: 30px;

    ol {
      li {
        margin-top: 0.8rem;
        > .list-title {
          height: 1.3rem;
          line-height: 1.3rem;
          padding: 0.1rem 0.6rem;
          font-size: 0.7rem;
          border-radius: 1.6rem;
        }
        > .list-view {
          font-size: 0.8rem;
          height: 1.5rem;
          line-height: 1.5rem;
        }
        img {
          width: 1.3rem;
          height: 1.3rem;
        }
      }
    }
  }
}

@media (min-width: 361px) and (max-width: 420px) {
  .passengerlist {
    margin-top: 40px;

    ol {
      li {
        margin-top: 1rem;
        > .list-title {
          height: 1.5rem;
          line-height: 1.5rem;
          padding: 0.2rem 0.7rem;
          font-size: 0.8rem;
          border-radius: 1.6rem;
        }
        > .list-view {
          font-size: 0.9rem;
          height: 1.8rem;
          line-height: 1.8rem;
        }
        img {
          width: 1.5rem;
          height: 1.5rem;
        }
      }
    }
  }
}

@media (min-width: 421px) and (max-width: 520px) {
  .passengerlist {
    margin-top: 50px;

    ol {
      li {
        margin-top: 1rem;
        > .list-title {
          height: 1.6rem;
          line-height: 1.6rem;
          padding: 0.2rem 0.9rem;
          font-size: 0.9rem;
          border-radius: 1.6rem;
        }
        > .list-view {
          font-size: 1rem;
          height: 1.9rem;
          line-height: 1.9rem;
        }
        img {
          width: 1.7rem;
          height: 1.7rem;
        }
      }
    }
  }
}

@media (min-width: 521px) and (max-width: 640px) {
  .passengerlist {
    margin-top: 50px;

    ol {
      li {
        margin-top: 1rem;
        > .list-title {
          height: 1.8rem;
          line-height: 1.8rem;
          padding: 0.25rem 1.2rem;
          font-size: 1rem;
          border-radius: 1.6rem;
        }
        > .list-view {
          font-size: 1.1rem;
          height: 2.1rem;
          line-height: 2.1rem;
        }
        img {
          width: 2rem;
          height: 2rem;
        }
      }
    }
  }
}

@media (min-width: 641px) and (max-width: 768px) {
  .passengerlist {
    margin-top: 60px;

    ol {
      li {
        margin-top: 1.2rem;
        > .list-title {
          height: 2rem;
          line-height: 2rem;
          padding: 0.3rem 1.5rem;
          font-size: 1.2rem;
          border-radius: 1.6rem;
        }
        > .list-view {
          font-size: 1.3rem;
          height: 2.3rem;
          line-height: 2.3rem;
        }
      }
    }
  }
}

@media (min-width: 769px) and (max-width: 999px) {
  .passengerlist {
    margin-top: 80px;

    ol {
      li {
        margin-top: 1.2rem;
        > .list-title {
          height: 2.1rem;
          line-height: 2.1rem;
          padding: 0.3rem 1.6rem;
          font-size: 1.3rem;
          border-radius: 1.6rem;
        }
        > .list-view {
          font-size: 1.4rem;
          height: 2.4rem;
          line-height: 2.4rem;
        }
      }
    }
  }
}

@media (min-width: 1000px) and (max-width: 1239px) {
  .passengerlist {
    width: 85%;
    margin-top: 80px;

    ol {
      li {
        margin-top: 1.2rem;
        > .list-title {
          height: 2.2rem;
          line-height: 2.2rem;
          padding: 0.3rem 2rem;
          font-size: 1.4rem;
          border-radius: 1.6rem;
        }
        > .list-view {
          font-size: 1.5rem;
          height: 2.5rem;
          line-height: 2.5rem;
        }
      }
    }
  }
}

@media (min-width: 1240px) {
  .passengerlist {
    width: 70%;
    margin-top: 80px;

    ol {
      li {
        margin-top: 1.2rem;
        > .list-title {
          height: 2.2rem;
          line-height: 2.2rem;
          padding: 0.3rem 2rem;
          font-size: 1.4rem;
          border-radius: 1.6rem;
        }
        > .list-view {
          font-size: 1.5rem;
          height: 2.5rem;
          line-height: 2.5rem;
        }
      }
    }
  }
}
</style>