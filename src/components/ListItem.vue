<template>
  <div class="list-item">
    <router-link :to="hrefPath">
      <div class="image-cover" :style="{backgroundImage:path}">
        <!-- <img :src="path" alt="Load error" :style="coverStyle"/>
        <div class="image">-->
      </div>
    </router-link>
    <router-link :to="hrefPath">
      <p class="item-txt ellipsis">{{item_txt}}</p>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "ListItem",
  props: ["cover_path", "item_txt", "item_id", "module_name"],
  data: function () {
    return {
      hrefPath: "/summary/" + this.module_name + "/" + this.item_id,
      path: "url(" + this.$store.state.media_server + this.cover_path + ")",
    };
  },
};
</script>

<style lang="scss" scoped>
@media (max-width: 320px) {
  $width: 128px;
  .list-item {
    margin: 0 .3rem 1.2rem;
  }
  .image-cover {
    width: $width;
    height: $width * 1.5;
  }
  .item-txt {
    width: $width;
    font-size: 1rem;
    margin-top: 0.8rem;
  }
}

@media (min-width: 321px) and (max-width: 360px) {
   $width: 136px;
  .list-item {
    margin: 0 .35rem 1.2rem;
  }
  .image-cover {
    width: $width;
    height: $width * 1.5;
  }
  .item-txt {
    width: $width;
    font-size: 1rem;
    margin-top: 0.8rem;
  }
}

@media (min-width: 361px) and (max-width: 420px) {
 $width: 150px;
  .list-item {
    margin: 0 .5rem 1.2rem;
  }
  .image-cover {
    width: $width;
    height: $width * 1.5;
  }
  .item-txt {
    width: $width;
    font-size: 1rem;
    margin-top: 0.8rem;
  }
}

@media (min-width: 421px) and (max-width: 520px) {
   $width: 170px;
  .list-item {
    margin: 0 .5rem 1.2rem;
  }
  .image-cover {
    width: $width;
    height: $width * 1.5;
  }
  .item-txt {
    width: $width;
    font-size: 1rem;
    margin-top: 0.8rem;
  }
}

@media (min-width: 521px) and (max-width: 640px) {
  $width: 150px;
  .list-item {
    margin: 0 .25rem 1.2rem;
  }
  .image-cover {
    width: $width;
    height: $width * 1.5;
  }
  .item-txt {
    width: $width;
    font-size: 1rem;
    margin-top: 0.8rem;
  }
}

@media (min-width: 641px) and (max-width: 768px) {
   $width: 140px;
  .list-item {
    margin: 0 .25rem 1.2rem;
  }
  .image-cover {
    width: $width;
    height: $width * 1.5;
  }
  .item-txt {
    width: $width;
    font-size: 1rem;
    margin-top: 0.8rem;
  }
}

@media (min-width: 769px) and (max-width: 999px) {
  $width: 158px;
  .list-item {
    margin: 0 .35rem 1.2rem;
    // margin-right: 16px;
    // margin-bottom: 1.2rem;
  }
  .image-cover {
    width: $width;
    height: $width * 1.5;
  }
  .item-txt {
    width: $width;
    font-size: 1rem;
    margin-top: 0.8rem;
  }
}

@media (min-width: 1000px) and (max-width: 1239px) {
  $width: 170px;
  .list-item {
    margin: 0 .35rem 1.2rem;
    // margin-right: 16px;
    // margin-bottom: 1.2rem;
  }
  .image-cover {
    width: $width;
    height: $width * 1.5;
  }
  .item-txt {
    width: $width;
    font-size: 1rem;
    margin-top: 0.8rem;
  }
}

@media (min-width: 1240px) {
  $width: 150px;
  .list-item {
    margin: 0 .25rem 1.2rem;
    // margin-right: 10px;
    // margin-bottom: 1.2rem;
  }
  .image-cover {
    width: $width;
    height: $width * 1.5;
  }
  .item-txt {
    width: $width;
    font-size: 1rem;
    margin-top: 0.8rem;
  }
}

.list-item {
  box-sizing: border-box;
}
.item-txt {
  text-align: center;
  color: white;
}
.image-cover {
  //margin: 0 auto;
  background-size: cover;
  background-position: center;
  border-radius: 4px;
}

</style>