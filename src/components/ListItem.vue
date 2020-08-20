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
  .image-cover {
    $width: 100px;
    width: $width;
    height: $width * 1.5;
    margin: 0 auto;
    background-size: cover;
  }
  .item-txt {
    text-align: center;
    font-size: .9rem;
    color: white;
    margin-top: 1.2rem;
  }
}

@media (min-width: 321px) and (max-width: 360px) {
  .image-cover {
    $width: 120px;
    width: $width;
    height: $width * 1.5;
    margin: 0 auto;
    background-size: cover;
  }
  .item-txt {
    text-align: center;
    font-size: 1rem;
    color: white;
    margin-top: 1.2rem;
  }
}

@media (min-width: 361px) and (max-width: 420px) {
  .image-cover {
    $width: 100px;
    width: $width;
    height: $width * 1.5;
    margin: 0 auto;
    background-size: cover;
  }
  .item-txt {
    text-align: center;
    font-size: 1rem;
    color: white;
    margin-top: 1.2rem;
  }
}

@media (min-width: 421px) and (max-width: 520px) {
  .image-cover {
    $width: 120px;
    width: $width;
    height: $width * 1.5;
    margin: 0 auto;
    background-size: cover;
  }
  .item-txt {
    text-align: center;
    font-size: .9rem;
    color: white;
    margin-top: 1.1rem;
  }
}

@media (min-width: 521px) and (max-width: 640px) {
  .image-cover {
    $width: 130px;
    width: $width;
    height: $width * 1.5;
    margin: 0 auto;
    background-size: cover;
  }
  .item-txt {
    text-align: center;
    font-size: .9rem;
    color: white;
    margin-top: 1.2rem;
  }
}

@media (min-width: 641px) and (max-width: 768px) {
  .list-item {
    padding: 0 0.25rem;
  }
  .image-cover {
    $width: 136px;
    width: $width;
    height: $width * 1.5;
    margin: 0 auto;
    background-size: cover;
  }
  .item-txt {
    text-align: center;
    font-size: 1rem;
    color: white;
    margin-top: 1.3rem;
  }
}

@media (min-width: 769px) and (max-width: 992px) {
  .list-item {
    padding: 0 0.2rem;
  }
  .image-cover {
    $width: 120px;
    width: $width;
    height: $width * 1.5;
    margin: 0 auto;
    background-size: cover;
  }
  .item-txt {
    text-align: center;
    font-size: 1rem;
    color: white;
    margin-top: 1.2rem;
  }
}

@media (min-width: 993px) and (max-width: 1200px) {
  .list-item {
    padding: 0 0.25rem;
  }
  .image-cover {
    $width: 126px;
    width: $width;
    height: $width * 1.5;
    margin: 0 auto;
    background-size: cover;
  }
  .item-txt {
    text-align: center;
    font-size: 1rem;
    color: white;
    margin-top: 1.3rem;
  }
}

@media (min-width: 1201px) {
  .list-item {
    padding: 0 0.3rem;
  }
  .image-cover {
    $width: 150px;
    width: $width;
    height: $width * 1.5;
    margin: 0 auto;
    background-size: cover;
  }
  .item-txt {
    text-align: center;
    font-size: 1.1rem;
    color: white;
    margin-top: 1.5rem;
  }
}
</style>