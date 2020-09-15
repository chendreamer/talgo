<template>
  <div>
    <el-container class="container">
      <el-header>
        <Header></Header>
      </el-header>
      <div>
        <multimedia-logo pagename="video"></multimedia-logo>
      </div>
      <div class="video-content">
        <div class="tc video-content-logo">
          <page-logo pagename="video"></page-logo>
        </div>
        <div class="video-content-list">
          <show-list :url="listURL" module_name="video"></show-list>
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
      listURL: this.$store.state.media_server + "/video",
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@media (max-width: 768px) {
  .video-content {
    .page-logo {
      display: none;
    }
  }
}

@media (min-width: 769px) {
  .video-content {
    display: flex;
  }
}

@media (max-width: 320px) {
  .video-content {
    .video-content-list {
      margin-top: 1rem;
    }
  }
}

@media (min-width: 321px) and (max-width: 360px) {
  .video-content {
    .video-content-list {
      margin-top: 1rem;
    }
  }
}

@media (min-width: 361px) and (max-width: 420px) {
  .video-content {
    .video-content-list {
      margin-top: 1rem;
    }
  }
}

@media (min-width: 421px) and (max-width: 520px) {
  .video-content {
    .video-content-list {
      margin-top: 1rem;
    }
  }
}

@media (min-width: 521px) and (max-width: 640px) {
  .video-content {
    .video-content-list {
      margin-top: 1rem;
    }
  }
}

@media (min-width: 641px) and (max-width: 768px) {
  .video-content {
    .video-content-list {
      margin-top: 1rem;
    }
  }
}

@media (min-width: 769px) and (max-width: 999px) {
  .video-content {
    .video-content-logo {
      width: 212px;
    }
    .video-content-list {
      width: 516px;
    }
  }
}

@media (min-width: 1000px) and (max-width: 1239px) {
  .video-content {
    .video-content-logo {
      width: 224px;
    }
    .video-content-list {
      width: 736px;
    }
  }
}

@media (min-width: 1240px) {
  .video-content {
    .video-content-logo {
      width: 240px;
    }
    .video-content-list {
      width: 960px;
    }
  }
}
</style>