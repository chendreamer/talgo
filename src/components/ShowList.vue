<template>
  <div>
    <FilterList :module_name="module_name" @navigation="getList"></FilterList>
    <!-- <div v-if="loadingState" class="loading-content tc">
      <img src="../assets/images/loading.gif" alt />
    </div>-->
    <div>
      <div class="show-list df" v-loading="loadingState" element-loading-background="transparent">
        <list-item
          class="show-list-item"
          v-for="(item,index) in listArray"
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
          {{currentPageNum}}
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
import ListItem from "@/components/ListItem.vue";
import FilterList from "@/components/FilterList.vue";

export default {
  props: ["url", "module_name"],
  components: { ListItem, FilterList },
  data: function () {
    return {
      listArray: [],
      currentPageNum: 1,
      perPage: 10,
      totalPage: 0,
      navigationName: "All",
      loadingState: true,
    };
  },
  mounted: function () {
    this.getList();
  },
  methods: {
    getList: function (type) {
      let that = this;
      that.loadingState = true;
      that.listArray.length = 0;
      if (type != undefined) {
        that.currentPageNum = 1;
        that.navigationName = type;
      }

      axios
        .get(that.url, {
          params: {
            navigation: that.navigationName,
            lang: i18n.locale,
            limit:
              (that.currentPageNum - 1) * that.perPage + "," + that.perPage,
          },
        })
        .then(function (response) {
          console.log(response);
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
          //var errorMsg = error.split(':');
          that.$message({
            message: error,
            type: "info",
            center: true,
            // iconClass: "",
            duration: 1800,
          });
        });
    },
    prevPage: function () {
      let that = this;
      if (that.currentPageNum > 1) {
        that.currentPageNum--;
        that.getList();
      }else{
        that.$message({
            message: 'This is first page!',
            type: "info",
            center: true,
            // iconClass: "",
            duration: 1800,
          });
      }
    },
    nextPage: function () {
      let that = this;
      if (that.currentPageNum < that.totalPage) {
        that.currentPageNum++;
        that.getList();
      }else{
        that.$message({
            message: 'This is last page!',
            type: "info",
            center: true,
            // iconClass: "",
            duration: 1800,
          });
      }
    },
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

.show-list {
  flex-wrap: wrap;
}

@media (max-width:320px){
.show-list {
    $width: 120px;
    min-height: $width * 1.6 * 2;
    .show-list-item {
      width: 148px;
      height: 206px;
    }
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

@media (min-width:321px) and (max-width:360px){
.show-list {
    $width: 148px;
    min-height: $width * 1.6 * 2;
    .show-list-item {
      width: 148px;
      height: $width * 1.6;
    }
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
    $width: 118px;
    min-height: $width * 1.6 * 2;
    .show-list-item {
      width: $width;
      height: 206px;
    }
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

@media (min-width:421px) and (max-width:520px){
.show-list {
    min-height: 480px;
    .show-list-item {
      width: 138px;
      height: 240px;
    }
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
    min-height: 440px;
    .show-list-item {
      width: 168px;
      height: 250px;
    }
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
@media (min-width:641px) and (max-width:768px){
.show-list {
    min-height: 500px;
    .show-list-item {
      width: 146px;
      height: 266px;
    }
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

@media (min-width:769px) and (max-width:992px){
.show-list {
    min-height: 460px;
    .show-list-item {
      width: 122px;
      height: 240px;
    }
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

@media (min-width:993px) and (max-width:1200px){
.show-list {
    min-height: 500px;
    .show-list-item {
      width: 136px;
      height: 260px;
    }
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

@media (min-width: 1201px) {
  .show-list {
    $width: 178px;
    min-height: $width * 1.6 * 2;
    .show-list-item {
      width: $width;
      height: 300px;
    }
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






</style>