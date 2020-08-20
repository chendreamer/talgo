<template>
  <div class="filter-list">
    <div
      v-for="(item,index) in filterData"
      :key="index"
      class="filter-item hover"
      :class="{checked:ifCheck(index)}"
      @click="trigger(item.navigation_bar,index)"
    >{{item.navigation_bar}}</div>
  </div>
</template>

<script>
import axios from "axios";
import i18n from "@/i18n";

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
        console.log(response);
        response["data"]["data"].forEach((element) => {
          that.filterData.push(element);
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  methods: {
    trigger: function (item, index) {
      this.currentChecked = index;

      this.$emit("navigation", item);
    },
    ifCheck: function (index) {
      return this.currentChecked == index;
    },
  },
};
</script>

<style lang="scss" scoped>

@media (max-width:320px){
.filter-list {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 1rem;
  }
  .filter-item {
    height: 28px;
    line-height: 28px;
    font-size: .75rem;
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

@media (min-width:321px) and (max-width:360px){
.filter-list {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 1rem;
  }
  .filter-item {
    height: 28px;
    line-height: 28px;
    font-size: .85rem;
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
    font-size: 1rem;
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

@media (min-width:421px) and (max-width:520px){
.filter-list {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 1rem;
  }
  .filter-item {
    height: 28px;
    line-height: 28px;
    font-size: .9rem;
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
    font-size: 1rem;
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

@media (min-width:641px) and (max-width:768px){
.filter-list {
    display: flex;
    justify-content: space-around;
    margin-bottom: 1rem;
  }
  .filter-item {
    height: 40px;
    line-height: 36px;
    font-size: .9rem;
    color: #fff;
    width: 18%;
    background-color: #820063;
    text-align: center;
    border-radius: 20px;
    border: 2px solid #fff;
    cursor: pointer;
  }
}

@media (min-width:769px) and (max-width:992px){
.filter-list {
    display: flex;
    justify-content: space-around;
    margin-bottom: 1rem;
  }
  .filter-item {
    height: 40px;
    line-height: 36px;
    font-size: .9rem;
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

@media (min-width:993px) and (max-width:1200px){
.filter-list {
    display: flex;
    justify-content: space-around;
    margin-bottom: 1rem;
  }
  .filter-item {
    height: 44px;
    line-height: 40px;
    font-size: 1.1rem;
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

@media (min-width: 1201px) {
  .filter-list {
    display: flex;
    justify-content: space-around;
    margin-bottom: 1rem;
  }
  .filter-item {
    height: 48px;
    line-height: 44px;
    font-size: 1.2rem;
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
</style>
