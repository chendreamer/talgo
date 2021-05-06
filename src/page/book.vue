<template>
  <div>
    <el-container class="container">
      <el-header>
        <Header></Header>
      </el-header>
      <div>
        <multimedia-logo pagename="book"></multimedia-logo>
      </div>
      <div class="book-content">
        <div class="book-content-logo tc">
          <page-logo pagename="book"></page-logo>
        </div>
        <div class="book-content-list">
          <show-list :url="listURL" module_name="book"></show-list>
        </div>
      </div>
    </el-container>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import MultimediaLogo from "@/components/MultimediaLogo.vue";
import PageLogo from "@/components/PageLogo.vue";
import ShowList from "@/components/ShowList.vue";

export default {
  components: { Header, MultimediaLogo, PageLogo, ShowList },
  data: function () {
    return {
      listURL: this.$store.state.media_server + "/book",
      user: "peter",
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@media (max-width: 320px) {
  .book-content {
    .page-logo {
      display: none;
    }
    .book-content-list {
      margin-top: 1rem;
    }
  }
}

@media (min-width: 321px) and (max-width: 360px) {
  .book-content {
    .page-logo {
      display: none;
    }
    .book-content-list {
      margin-top: 1rem;
    }
  }
}

@media (min-width: 361px) and (max-width: 420px) {
  .book-content {
    .page-logo {
      display: none;
    }
    .book-content-list {
      margin-top: 1rem;
    }
  }
}

@media (min-width: 421px) and (max-width: 520px) {
  .book-content {
    .page-logo {
      display: none;
    }
    .book-content-list {
      margin-top: 1rem;
    }
  }
}

@media (min-width: 521px) and (max-width: 640px) {
  .book-content {
    .page-logo {
      display: none;
    }
    .book-content-list {
      margin-top: 1rem;
    }
  }
}

@media (min-width: 641px) and (max-width: 768px) {
  .book-content {
    .page-logo {
      display: none;
    }
    .book-content-list {
      margin-top: 1rem;
    }
  }
}

@media (min-width: 769px) and (max-width: 999px) {
  .book-content {
    display: flex;
    .book-content-logo {
      width: 30%;
    }
    .book-content-list {
      width: 70%;
    }
  }
}

@media (min-width: 1000px) and (max-width: 1239px) {
  .book-content {
    display: flex;
    .book-content-logo {
      width: 25%;
    }
    .book-content-list {
      width: 75%;
    }
  }
}

@media (min-width: 1240px) {
  .book-content {
    display: flex;
    .book-content-logo {
      width: 20%;
    }
    .book-content-list {
      width: 80%;
    }
  }
}
</style>