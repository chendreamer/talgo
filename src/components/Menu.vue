<template>
  <div>
      
    <div v-for="(item,index) in menuList" :key="index">
        <router-link :to="item.linkto">
            <img class="menu-img" :src="item.path"/>
            <span>{{item.name}}</span>
            </router-link>
    </div>

  </div>
</template>

<script>
export default {
  name: "Menu",
  data: function() {
    return {
      menuList: [{'name':'Multimedia','linkto':'multimedia','path':require('../assets/images/Multimedia.png')},
      {'name':'Passenger Information','linkto':'passengerInformation','path':require('../assets/images/passenger-Information.png')},
      {'name':'Tourist Information','linkto':'touristInformation','path':require('../assets/images/tourist-Information.png')},
      {'name':'Map','linkto':'map','path':require('../assets/images/map.png')},
      {'name':'Setting','linkto':'setting','path':require('../assets/images/setting.png')}]
    };
  }
};
</script>

<style>
/* .to-multimedia-img{background-image:url(../assets/images/Multimedia.png)}
.to-passenger_information-img{background-image:url(../assets/images/passenger-Information.png)}
.to-tourist_information-img{background-image:url(../assets/images/tourist-Information.png)}
.to-map-img{background-image:url(../assets/images/map.png)}
.to-setting-img{background-image:url(../assets/images/setting.png)} */
.menu-img{display: inline-block;width:52px;height:52px}

</style>