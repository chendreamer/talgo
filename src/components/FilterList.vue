<template>
  <div class="filter-list">
    <div
      v-for="(item, index) in filterData"
      :key="index"
      class="filter-item hover"
      :class="{ checked: ifCheck(index) }"
      @click="trigger(item.origin, index)"
    >
      {{ item.real }}
    </div>
  </div>
</template>

<script>
import axios from "axios";
import i18n from "@/i18n";
import _ from "lodash";

export default {
  name: "FilterList",
  props: ["module_name"],
  data: function () {
    return {
      // ifCheck:true,
      currentChecked: 0,
      filterParam: {
        module: this.module_name,
        lang: i18n.locale,
      },
      filterData: [],
    };
  },
  mounted: function () {
    let that = this;

    axios
      .get(that.$store.state.media_server + "/navigation", {
        params: that.filterParam,
      })
      .then(function (response) {
        response["data"]["data"].forEach((element) => {
          //var a = "filter_" + element.navigation_bar;
          var a = i18n.tc("message.filter_" + element.navigation_bar);
          // switch (element.navigation_bar) {
          //   case "All":
          //     a = i18n.tc("message.filter_" + element.navigation_bar);
          //     break;
          //   case "Romance":
          //     a = i18n.tc("message.filter_romance");
          //     break;
          //   case "Comedy":
          //     a = i18n.tc("message.filter_comedy");
          //     break;
          //   case "Adventure":
          //     a = i18n.tc("message.filter_adventure");
          //     break;
          //   case "Cartoon":
          //     a = i18n.tc("message.filter_cartoon");
          //     break;
          // }
          //console.log(a);
          //展示real ，查询用origin
          that.filterData.push({ origin: element.navigation_bar, real: a });
          //i18n.tc("message.multimedia")
          //that.filterData.push(element);
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  methods: {
    trigger: _.debounce(function (item, index) {
      this.currentChecked = index;
      this.$emit("navigation", item);
    }, 300),
    // trigger: function (item, index) {
    //   this.currentChecked = index;

    //   this.$emit("navigation", item);
    // },
    ifCheck: function (index) {
      return this.currentChecked == index;
    },
  },
};
</script>

<style lang="scss" scoped>
@media (max-width: 320px) {
  .filter-list {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 1rem;
  }
  .filter-item {
    height: 28px;
    line-height: 28px;
    font-size: 0.6rem;
    color: #fff;
    width: 30%;
    background-color: #820063;
    text-align: center;
    border-radius: 14px;
    margin: 0 2% 0.5rem 0;
    border: 1px solid #fff;
    cursor: pointer;
  }
  .checked {
    background-color: #fff;
    color: #820063;
  }
}

@media (min-width: 321px) and (max-width: 360px) {
  .filter-list {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 1rem;
  }
  .filter-item {
    height: 28px;
    line-height: 28px;
    font-size: 0.7rem;
    color: #fff;
    width: 30%;
    background-color: #820063;
    text-align: center;
    border-radius: 14px;
    margin: 0 2% 0.5rem 0;
    border: 1px solid #fff;
    cursor: pointer;
  }
  .checked {
    background-color: #fff;
    color: #820063;
  }
}

@media (min-width: 361px) and (max-width: 420px) {
  .filter-list {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 1rem;
  }
  .filter-item {
    height: 28px;
    line-height: 28px;
    font-size: 0.7rem;
    color: #fff;
    width: 30%;
    background-color: #820063;
    text-align: center;
    border-radius: 14px;
    margin: 0 2% 0.5rem 0;
    border: 1px solid #fff;
    cursor: pointer;
  }
  .checked {
    background-color: #fff;
    color: #820063;
  }
}

@media (min-width: 421px) and (max-width: 520px) {
  .filter-list {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 1rem;
  }
  .filter-item {
    height: 28px;
    line-height: 28px;
    font-size: 0.75rem;
    color: #fff;
    width: 30%;
    background-color: #820063;
    text-align: center;
    border-radius: 14px;
    margin: 0 2% 0.5rem 0;
    border: 1px solid #fff;
    cursor: pointer;
  }
  .checked {
    background-color: #fff;
    color: #820063;
  }
}

@media (min-width: 521px) and (max-width: 640px) {
  .filter-list {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 1rem;
  }
  .filter-item {
    height: 28px;
    line-height: 28px;
    font-size: 0.8rem;
    color: #fff;
    width: 30%;
    background-color: #820063;
    text-align: center;
    border-radius: 14px;
    margin: 0 2% 0.5rem 0;
    border: 1px solid #fff;
    cursor: pointer;
  }
  .checked {
    background-color: #fff;
    color: #820063;
  }
}

@media (min-width: 641px) and (max-width: 768px) {
  .filter-list {
    display: flex;
    justify-content: space-around;
    margin-bottom: 1rem;
  }
  .filter-item {
    height: 40px;
    line-height: 36px;
    font-size: 0.7rem;
    color: #fff;
    width: 18%;
    background-color: #820063;
    text-align: center;
    border-radius: 20px;
    border: 2px solid #fff;
    cursor: pointer;
  }
}

@media (min-width: 769px) and (max-width: 999px) {
  .filter-list {
    display: flex;
    justify-content: space-around;
    margin-bottom: 1rem;
  }
  .filter-item {
    height: 40px;
    line-height: 36px;
    font-size: 0.75rem;
    color: #fff;
    width: 18.5%;
    background-color: #820063;
    text-align: center;
    border-radius: 20px;
    border: 2px solid #fff;
    margin: 0 1px;
    cursor: pointer;
  }
}

@media (min-width: 1000px) and (max-width: 1239px) {
  .filter-list {
    display: flex;
    justify-content: space-around;
    margin-bottom: 1rem;
  }
  .filter-item {
    height: 44px;
    line-height: 40px;
    font-size: 0.9rem;
    color: #fff;
    width: 18.5%;
    background-color: #820063;
    text-align: center;
    border-radius: 22px;
    border: 2px solid #fff;
    margin: 0 1px;
    cursor: pointer;
  }
}

@media (min-width: 1240px) {
  .filter-list {
    display: flex;
    justify-content: space-around;
    margin-bottom: 1rem;
  }
  .filter-item {
    height: 48px;
    line-height: 44px;
    font-size: 1rem;
    color: #fff;
    width: 18.5%;
    background-color: #820063;
    text-align: center;
    border-radius: 22px;
    border: 2px solid #fff;
    margin: 0 2px;
    cursor: pointer;
  }
}

.checked {
  background-color: #fff;
  color: #820063;
}

.filter-item {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
