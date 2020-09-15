<template>
  <div>
    <el-container class="container">
      <el-header>
        <Header></Header>
      </el-header>
      <div class="content">
        <div class="tc logo-menu">
          <PageLogo pagename="menu"></PageLogo>
        </div>
        <div class="menu">
          <Menu></Menu>
        </div>
      </div>
    </el-container>
  </div>
</template>

<script>
import Menu from "../components/Menu.vue";
import Header from "../components/Header.vue";
import PageLogo from "../components/PageLogo.vue";

export default {
  name: "Home",
  components: { Menu, Header, PageLogo },
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
// @media (min-width:768px){

// }

@media (max-width: 320px) {
  // .logo-menu {
  //   width: 40%;
  // }
  // .menu {
  //   width: 60%;
  //   padding-left: 25px;
  // }
}

@media (min-width: 321px) and (max-width: 360px) {
  // .logo-menu {
  //   width: 40%;
  // }
  // .menu {
  //   width: 60%;
  //   padding-left: 25px;
  // }
}

@media (min-width: 361px) and (max-width: 420px) {
  // .logo-menu {
  //   width: 40%;
  // }
  // .menu {
  //   width: 60%;
  //   padding-left: 25px;
  // }
}

@media (min-width: 421px) and (max-width: 520px) {
  // .logo-menu {
  //   width: 40%;
  // }
  // .menu {
  //   width: 60%;
  //   padding-left: 25px;
  // }
}

@media (min-width: 521px) and (max-width: 640px) {
  // .logo-menu {
  //   width: 40%;
  // }
  // .menu {
  //   width: 60%;
  //   padding-left: 25px;
  // }
}

@media (min-width: 641px) and (max-width: 768px) {
  // .logo-menu {
  //   width: 40%;
  // }
  // .menu {
  //   width: 60%;
  //   padding-left: 25px;
  // }
}

@media (min-width: 769px) and (max-width: 999px) {
  .content {
    display: flex;
    > .logo-menu {
      width: 33%;
    }
    > .menu {
      width: 64%;
    }
  }
}

@media (min-width: 1000px) and (max-width: 1239px) {
  .content {
    padding-top: 2rem;
    > .logo-menu {
      width: 33%;
    }
    > .menu {
      width: 60%;
    }
  }
}

@media (min-width: 1240px) {
  .content {
    padding-top: 3rem;
    > .logo-menu {
      width: 30%;
    }
    > .menu {
      width: 55%;
    }
  }
}

@media (min-width: 769px) {
  .content {
    display: flex;
    justify-content: center;
  }
}
</style>