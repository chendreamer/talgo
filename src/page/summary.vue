<template>
  <div>
    <el-container class="container">
      <el-header>
        <Header></Header>
      </el-header>
      <div>
        <multimedia-logo pagename="video"></multimedia-logo>
      </div>
      <div class="summary-content">
        <div class="summary-image tc">
          <img :src="summary_posterURL" />
        </div>
        <div class="summary-detail">
          <div class="summary-header">
            <h2 class="summary-title ellipsis">{{ summary_title }}</h2>
            <div class="summary-operation-image">
              <router-link
                :to="{ name: 'player', params: { summaryID: summaryID } }"
                replace
                v-if="summaryType == 'video'"
              >
                <img src="../assets/images/Play.png" />
              </router-link>
              <router-link
                :to="{ name: 'reader', params: { summaryID: summaryID } }"
                replace
                v-else
              >
                <img src="../assets/images/Read.png" />
              </router-link>
              <!-- <router-link :to="videoHref" v-if="summaryType == 'video'">
                <img src="../assets/images/Play.png" />
              </router-link>
              <router-link :to="bookHref" v-else>
                <img src="../assets/images/Read.png" />
              </router-link> -->
            </div>
          </div>

          <div class="summary-list" v-if="summaryType == 'video'">
            <div class="flex-first">
              <p class>
                <em>{{ $t("message.summary_director") }}:</em>
                {{ summary_director }}
              </p>
              <p class>
                <em>{{ $t("message.summary_region") }}:</em>
                {{ summary_region }}
              </p>
              <p class>
                <em>{{ $t("message.summary_length") }}:</em>
                {{ summary_length }}
              </p>
            </div>
            <div class="flex-all">
              <p class>
                <em>{{ $t("message.summary_main_actor") }}:</em>
                {{ summary_mainActor }}
              </p>
              <p class>
                <em>{{ $t("message.summary_type") }}:</em>
                {{ summary_type }}
              </p>
              <p class>
                <em>{{ $t("message.summary_release_time") }}:</em>
                {{ summary_releaseTime }}
              </p>
            </div>
          </div>
          <div class="summary-list" v-else>
            <div class="flex-all">
              <p class>
                <em>{{ $t("message.summary_author") }}:</em>
                {{ summary_author }}
              </p>
              <p class>
                <em>{{ $t("message.summary_publishing_house") }}:</em>
                {{ summary_publishingHouse }}
              </p>
              <p class>
                <em>{{ $t("message.summary_publication_time") }}:</em>
                {{ summary_publicationTime }}
              </p>
            </div>
          </div>

          <p class="review-title" v-if="summaryType == 'video'">
            {{ $t("message.summary_movie_review") }} >
          </p>
          <p class="review-title" v-else>
            {{ $t("message.summary_novel_review") }} >
          </p>
          <p class="review-content">{{ summary_review }}</p>
        </div>
      </div>
    </el-container>
  </div>
</template>

<script>
import axios from "axios";
import i18n from "@/i18n";
import Header from "@/components/Header.vue";
import MultimediaLogo from "@/components/MultimediaLogo.vue";

export default {
  name: "Summary",
  components: { Header, MultimediaLogo },
  props: ["summaryType", "summaryID"],
  data: function () {
    return {
      url: "",
      // summaryID : 1,
      // summaryType : 'video',
      // videoHref: "/play/" + this.summaryID,
      // bookHref: "/read/" + this.summaryID,
      summary_posterURL: "",
      summary_title: "",
      summary_director: "",
      summary_region: "",
      summary_length: "",
      summary_mainActor: "",
      summary_type: "",
      summary_releaseTime: "",
      summary_author: "",
      summary_publishingHouse: "",
      summary_publicationTime: "",
      summary_review: "",
    };
  },
  beforeMount: function () {
    let that = this;
    if (that.summaryType == "video") {
      that.url = that.$store.state.media_server + "/video";
    } else {
      that.url = that.$store.state.media_server + "/book";
    }
  },
  mounted: function () {
    let that = this;
    if (typeof that.summaryID !== "undefined") {
      that.getData();
    }
  },
  methods: {
    getData: function () {
      let that = this;

      axios
        .get(that.url, {
          params: {
            id: that.summaryID,
            lang: i18n.locale,
          },
        })
        .then(function (response) {
          console.log("summary response:");
          console.log(response);
          that.summary_posterURL =
            that.$store.state.media_server +
            response["data"]["data"][0]["poster"];
          that.summary_review = response["data"]["data"][0]["description"];
          if (that.summaryType == "video") {
            that.summary_title = response["data"]["data"][0]["title"];
            that.summary_director = response["data"]["data"][0]["director"];
            that.summary_region = response["data"]["data"][0]["region"];
            that.summary_length = response["data"]["data"][0]["mins"];
            that.summary_mainActor = response["data"]["data"][0]["performer"];
            that.summary_type = response["data"]["data"][0]["navigation"];
            that.summary_releaseTime =
              response["data"]["data"][0]["release_time"];
          } else {
            that.summary_title = response["data"]["data"][0]["title"];
            that.summary_author = response["data"]["data"][0]["author"];
            that.summary_publishingHouse =
              response["data"]["data"][0]["publishing_house"];
            that.summary_publicationTime =
              response["data"]["data"][0]["publishing_time"];
          }
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
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
//公有
.summary-header {
  display: flex;
  align-items: flex-end;
  .summary-title {
    flex: 1;
  }
  .summary-image {
    margin-left: 0.5rem;
  }
}

@media (max-width: 320px) {
  .summary-content {
    > .summary-image {
      > img {
        width: 220px;
      }
    }
  }
  .summary-title {
    color: #f8ab08;
    font-size: 1.1rem;
    font-weight: 100;
    margin-top: 1rem;
  }
  .summary-list {
    display: flex;
    margin-top: 1rem;
    p {
      color: #a5a5a5;
      font-size: 0.7rem;
      margin-top: 0.8rem;
      em {
        font-size: 0.8rem;
        font-style: normal;
      }
    }
    .flex-first {
      max-width: 50%;
      overflow: hidden;
    }
    .flex-all {
      flex: 1;
      overflow: hidden;
      padding-left: 0.8rem;
    }
  }
  .summary-operation-image {
    img {
      width: 66px;
    }
  }
  .review-title {
    color: #f8ab08;
    font-size: 1rem;
    margin-bottom: 0.9rem;
    margin-top: 1.2rem;
  }
  .review-content {
    font-size: 0.8rem;
    color: #eee;
    line-height: 1.2rem;
    margin-bottom: 18px;
  }
}

@media (min-width: 321px) and (max-width: 360px) {
  .summary-content {
    > .summary-image {
      > img {
        width: 240px;
      }
    }
  }
  .summary-title {
    color: #f8ab08;
    font-size: 1.2rem;
    font-weight: 300;
    margin-top: 1rem;
  }
  .summary-list {
    display: flex;
    margin-top: 1rem;
    p {
      color: #a5a5a5;
      font-size: 0.8rem;
      margin-top: 0.8rem;
      em {
        font-size: 0.9rem;
        font-style: normal;
      }
    }
    .flex-first {
      max-width: 50%;
      overflow: hidden;
    }
    .flex-all {
      flex: 1;
      overflow: hidden;
      padding-left: 0.8rem;
    }
  }
  .summary-operation-image {
    img {
      width: 70px;
    }
  }
  .review-title {
    color: #f8ab08;
    font-size: 1.1rem;
    margin-bottom: 1rem;
    margin-top: 1.3rem;
  }
  .review-content {
    font-size: 0.9rem;
    color: #eee;
    line-height: 1.3rem;
    margin-bottom: 18px;
  }
}

@media (min-width: 361px) and (max-width: 420px) {
  .summary-content {
    > .summary-image {
      > img {
        width: 260px;
      }
    }
  }
  .summary-title {
    color: #f8ab08;
    font-size: 1.4rem;
    font-weight: 300;
    margin-top: 1.2rem;
  }
  .summary-list {
    display: flex;
    margin-top: 1rem;
    p {
      color: #a5a5a5;
      font-size: 0.9rem;
      margin-top: 1rem;
      em {
        font-size: 1rem;
        font-style: normal;
      }
    }
    .flex-first {
      max-width: 50%;
      overflow: hidden;
    }
    .flex-all {
      flex: 1;
      overflow: hidden;
      padding-left: 0.8rem;
    }
  }
  .summary-operation-image {
    img {
      width: 80px;
    }
  }
  .review-title {
    color: #f8ab08;
    font-size: 1.25rem;
    margin-bottom: 1rem;
    margin-top: 1.6rem;
  }
  .review-content {
    font-size: 1rem;
    color: #eee;
    line-height: 1.4rem;
    margin-bottom: 18px;
  }
}
@media (min-width: 421px) and (max-width: 520px) {
  .summary-content {
    > .summary-image {
      > img {
        width: 260px;
      }
    }
  }
  .summary-title {
    color: #f8ab08;
    font-size: 1.6rem;
    font-weight: 300;
    margin-top: 1.2rem;
  }
  .summary-list {
    display: flex;
    margin-top: 1rem;
    p {
      color: #a5a5a5;
      font-size: 0.9rem;
      margin-top: 1rem;
      em {
        font-size: 1rem;
        font-style: normal;
      }
    }
    .flex-first {
      max-width: 50%;
      overflow: hidden;
    }
    .flex-all {
      flex: 1;
      overflow: hidden;
      padding-left: 0.8rem;
    }
  }
  .summary-operation-image {
    img {
      width: 90px;
    }
  }
  .review-title {
    color: #f8ab08;
    font-size: 1.4rem;
    margin-bottom: 1rem;
    margin-top: 1.6rem;
  }
  .review-content {
    font-size: 1rem;
    color: #eee;
    line-height: 1.4rem;
    margin-bottom: 18px;
  }
}
@media (min-width: 521px) and (max-width: 640px) {
  .summary-content {
    > .summary-image {
      > img {
        width: 280px;
      }
    }
  }
  .summary-title {
    color: #f8ab08;
    font-size: 1.8rem;
    font-weight: 300;
    margin-top: 1.2rem;
  }
  .summary-list {
    display: flex;
    margin-top: 1rem;
    p {
      color: #a5a5a5;
      font-size: 0.9rem;
      margin-top: 1rem;
      em {
        font-size: 1rem;
        font-style: normal;
      }
    }
    .flex-first {
      max-width: 50%;
      overflow: hidden;
    }
    .flex-all {
      flex: 1;
      overflow: hidden;
      padding-left: 0.8rem;
    }
  }
  .summary-operation-image {
    img {
      width: 100px;
    }
  }
  .review-title {
    color: #f8ab08;
    font-size: 1.5rem;
    margin-bottom: 1rem;
    margin-top: 1.8rem;
  }
  .review-content {
    font-size: 1.1rem;
    color: #eee;
    line-height: 1.5rem;
    margin-bottom: 18px;
  }
}

@media (min-width: 641px) and (max-width: 768px) {
  .summary-content {
    > .summary-image {
      > img {
        width: 280px;
      }
    }
  }
  .summary-title {
    color: #f8ab08;
    font-size: 2rem;
    font-weight: 300;
    margin-top: 1.6rem;
  }
  .summary-list {
    display: flex;
    margin-top: 1rem;
    p {
      color: #a5a5a5;
      font-size: 1rem;
      margin-top: 1rem;
      em {
        font-size: 1.1rem;
        font-style: normal;
      }
    }
    .flex-first {
      max-width: 50%;
      overflow: hidden;
    }
    .flex-all {
      flex: 1;
      overflow: hidden;
      padding-left: 0.8rem;
    }
  }
  .summary-operation-image {
    img {
      width: 100px;
    }
  }
  .review-title {
    color: #f8ab08;
    font-size: 1.5rem;
    margin-bottom: 1rem;
    margin-top: 2rem;
  }
  .review-content {
    font-size: 1.2rem;
    color: #eee;
    line-height: 1.6rem;
    margin-bottom: 18px;
  }
}

@media (min-width: 769px) and (max-width: 999px) {
  .summary-content {
    display: flex;
    > .summary-image {
      width: 32%;
      text-align: right;
      > img {
        width: 240px;
      }
    }
    > .summary-detail {
      padding-left: 1.4rem;
      width: 68%;
    }
  }
  .summary-title {
    color: #f8ab08;
    font-size: 1.7rem;
    font-weight: 300;
  }
  .summary-list {
    display: flex;
    margin-top: 1.5rem;
    p {
      color: #a5a5a5;
      font-size: 1.1rem;
      margin-top: 0.9rem;
      em {
        font-size: 1.4rem;
        font-style: normal;
      }
    }
    .flex-first {
      max-width: 50%;
      overflow: hidden;
    }
    .flex-all {
      flex: 1;
      overflow: hidden;
      padding-left: 1rem;
    }
  }
  .review-title {
    color: #f8ab08;
    font-size: 1.4rem;
    margin-bottom: 1rem;
    margin-top: 1.8rem;
  }
  .summary-operation-image {
    img {
      width: 100px;
    }
  }
  .review-content {
    font-size: 1.1rem;
    color: #eee;
    line-height: 1.5rem;
    margin-bottom: 18px;
  }
}

@media (min-width: 1000px) and (max-width: 1239px) {
  .summary-content {
    display: flex;
    > .summary-image {
      width: 28%;
      text-align: right;
      > img {
        width: 270px;
      }
    }
    > .summary-detail {
      padding-left: 1.6rem;
      width: 72%;
    }
  }
  .summary-title {
    color: #f8ab08;
    font-size: 1.9rem;
    font-weight: 400;
  }
  .summary-list {
    display: flex;
    margin-top: 1.5rem;
    p {
      color: #a5a5a5;
      font-size: 1.1rem;
      margin-top: 0.9rem;
      em {
        font-size: 1.4rem;
        font-style: normal;
      }
    }
    .flex-first {
      max-width: 50%;
      overflow: hidden;
    }
    .flex-all {
      flex: 1;
      overflow: hidden;
      padding-left: 1rem;
    }
  }
  .review-title {
    color: #f8ab08;
    font-size: 1.4rem;
    margin-bottom: 1rem;
    margin-top: 1.8rem;
  }
  .summary-operation-image {
    img {
      width: 120px;
    }
  }
  .review-content {
    font-size: 1.2rem;
    color: #eee;
    line-height: 1.6rem;
    margin-bottom: 18px;
  }
}

@media (min-width: 1240px) {
  .summary-content {
    display: flex;
    > .summary-image {
      width: 30%;
      text-align: right;
      > img {
        width: 280px;
      }
    }
    > .summary-detail {
      padding-left: 2rem;
      width: 70%;
    }
  }
  .summary-title {
    color: #f8ab08;
    font-size: 2rem;

    font-weight: 400;
  }
  .summary-list {
    display: flex;
    margin-top: 2rem;
    p {
      color: #a5a5a5;
      font-size: 1.2rem;
      margin-top: 1rem;
      em {
        font-size: 1.5rem;
        font-style: normal;
      }
    }
    .flex-first {
      max-width: 50%;
      overflow: hidden;
    }
    .flex-all {
      flex: 1;
      overflow: hidden;
      padding-left: 1rem;
    }
  }
  .review-title {
    color: #f8ab08;
    font-size: 1.5rem;
    margin-bottom: 1rem;
    margin-top: 2rem;
  }
  .summary-operation-image {
    img {
      width: 130px;
    }
  }

  .review-content {
    font-size: 1.2rem;
    color: #eee;
    line-height: 1.6rem;
    margin-bottom: 18px;
  }
}
</style>