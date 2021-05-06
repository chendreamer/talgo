<template>
  <div>
    <FilterList :module_name="module_name" @navigation="getList"></FilterList>
    <!-- <div v-if="loadingState" class="loading-content tc">
      <img src="../assets/images/loading.gif" alt />
    </div>-->
    <!-- <div class="bt" @click="cancel()"></div> -->
    <div>
      <div
        class="show-list"
        v-loading="loadingState"
        element-loading-background="transparent"
      >
        <list-item
          class="show-list-item"
          v-for="(item, index) in listArray"
          :key="index"
          :cover_path="item.cover"
          :item_txt="item.title"
          :item_id="item.id"
          :module_name="module_name"
        ></list-item>
      </div>
      <div class="pagination">
        <div class="pagination-container df">
          <img src="../assets/images/left-arrow.png" @click="prevPage" />
          {{ currentPageNum }}
          <img src="../assets/images/right-arrow.png" @click="nextPage" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//最低高度两行
import axios from "axios";
import i18n from "@/i18n";
import _ from "lodash";
import ListItem from "@/components/ListItem.vue";
import FilterList from "@/components/FilterList.vue";
const CancelToken = axios.CancelToken;
let cancel;
//let time=this.$store.state.time_define;
export default {
  props: ["url", "module_name"],
  components: { ListItem, FilterList },
  data: function () {
    return {
      listArray: [],
      currentPageNum: 1,
      perPage: 12,
      totalPage: 0,
      navigationName: "All",
      loadingState: true,
      requestArray: [],
    };
  },
  mounted: function () {
    this.getList();
  },
  methods: {
    cancel: function () {
      cancel("取消查询列表");
    },
    getList: function (type) {
      let that = this;
      that.loadingState = true;
      that.listArray.length = 0;
      if (type != undefined) {
        that.currentPageNum = 1;
        that.navigationName = type;
      }

      var _params = {
        navigation: that.navigationName,
        lang: i18n.locale,
        limit: (that.currentPageNum - 1) * that.perPage + "," + that.perPage,
      };

      console.log(_params);

      that.requestArray.push(_params);
      axios
        .get(that.url, {
          params: _params,
          cancelToken: new CancelToken(function executor(c) {
            cancel = c;
          }),
        })
        .then(function (response) {
          console.log(response);
          console.log(that.requestArray);
          var last = that.requestArray.pop();
          console.log(last);
          that.loadingState = false;
          that.totalPage = Math.ceil(
            parseInt(response["data"]["count_data"]) / that.perPage
          );
          response["data"]["data"].forEach((element) => {
            that.listArray.push(element);
          });
        })
        .catch(function (error) {
          console.log(error);
          //       if (error.response) {
          //   console.log(error.response.data);
          //   console.log(error.response.status);
          //   console.log(error.response.headers);
          // } else {
          //   console.log('Error', error.message);
          // }
          //var errorMsg = error.split(':');
          that.$message({
            message: i18n.tc("message.networkError"),
            type: "info",
            center: true,
            // iconClass: "",
            duration: 1800,
          });
        });

      // 添加请求拦截器
      var myInterceptor1 = axios.interceptors.request.use(
        function (config) {
          // 在发送请求之前做些什么
          console.log("发送请求");
          axios.interceptors.request.eject(myInterceptor1);
          return config;
        },
        function (error) {
          // 对请求错误做些什么
          return Promise.reject(error);
        }
      );

      // 添加响应拦截器
      var myInterceptor2 = axios.interceptors.response.use(
        function (response) {
          // 对响应数据做点什么
          console.log("接受数据");
          console.log(response);
          axios.interceptors.response.eject(myInterceptor2);
          return response;
        },
        function (error) {
          // 对响应错误做点什么
          return Promise.reject(error);
        }
      );
    },
    prevPage: _.throttle(function () {
      let that = this;
      if (that.currentPageNum > 1) {
        that.currentPageNum--;
        that.getList();
      } else {
        that.$message({
          message: i18n.tc("message.firstPageWarning"),
          type: "info",
          center: true,
          duration: 1800,
        });
      }
    }, 1200),
    nextPage: _.throttle(function () {
      let that = this;
      if (that.currentPageNum < that.totalPage) {
        that.currentPageNum++;
        that.getList();
      } else {
        that.$message({
          message: i18n.tc("message.lastPageWarning"),
          type: "info",
          center: true,
          duration: 1800,
        });
      }
    }, 1200),
  },
};
</script>

<style lang="scss">
.el-message .el-icon-info {
  display: none;
  margin-right: 0;
}
</style>

<style lang="scss" scoped>
// .show-list {
//   flex-wrap: wrap;
// }

.bt {
  height: 100px;
  background-color: cadetblue;
}

@media (max-width: 320px) {
  .show-list {
    min-height: 510px;
  }

  .pagination {
    margin-top: 1rem;
    .pagination-container {
      margin: 0 auto;
      width: 70%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      font-size: 1.5rem;
      img {
        width: 1.4rem;
        height: 1.4rem;
      }
    }
  }
}

@media (min-width: 321px) and (max-width: 360px) {
  .show-list {
    min-height: 534px;
  }

  .pagination {
    margin-top: 1rem;
    .pagination-container {
      margin: 0 auto;
      width: 70%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      font-size: 1.8rem;
      img {
        width: 1.6rem;
        height: 1.6rem;
      }
    }
  }
}

@media (min-width: 361px) and (max-width: 420px) {
  .show-list {
    min-height: 576px;
  }

  .pagination {
    margin-top: 1rem;
    .pagination-container {
      margin: 0 auto;
      width: 60%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      font-size: 2rem;
      img {
        width: 1.8rem;
        height: 1.8rem;
      }
    }
  }
}

@media (min-width: 421px) and (max-width: 520px) {
  .show-list {
    min-height: 636px;
  }

  .pagination {
    margin-top: 1rem;
    .pagination-container {
      margin: 0 auto;
      width: 60%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      font-size: 2rem;
      img {
        width: 1.8rem;
        height: 1.8rem;
      }
    }
  }
}

@media (min-width: 521px) and (max-width: 640px) {
  .show-list {
    min-height: 576px;
  }

  .pagination {
    margin-top: 1rem;
    .pagination-container {
      margin: 0 auto;
      width: 60%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      font-size: 2rem;
      img {
        width: 1.8rem;
        height: 1.8rem;
      }
    }
  }
}
@media (min-width: 641px) and (max-width: 768px) {
  .show-list {
    min-height: 546px;
  }

  .pagination {
    margin-top: 1rem;
    .pagination-container {
      margin: 0 auto;
      width: 45%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      font-size: 1.8rem;
      img {
        width: 1.8rem;
        height: 1.8rem;
      }
    }
  }
}

@media (min-width: 769px) and (max-width: 999px) {
  .show-list {
    min-height: 600px;
  }

  .pagination {
    margin-top: 1rem;
    .pagination-container {
      margin: 0 auto;
      width: 45%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      font-size: 1.8rem;
      img {
        width: 1.8rem;
        height: 1.8rem;
      }
    }
  }
}

@media (min-width: 1000px) and (max-width: 1239px) {
  .show-list {
    min-height: 636px;
  }

  .pagination {
    margin-top: 1rem;
    .pagination-container {
      margin: 0 auto;
      width: 45%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      font-size: 1.8rem;
      img {
        width: 1.8rem;
        height: 1.8rem;
      }
    }
  }
}

@media (min-width: 1240px) {
  .show-list {
    min-height: 576px;
  }

  .pagination {
    margin-top: 1rem;
    .pagination-container {
      margin: 0 auto;
      width: 45%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      font-size: 1.8rem;
      img {
        width: 1.8rem;
        height: 1.8rem;
      }
    }
  }
}

.show-list-item {
  display: inline-block;
}
</style>