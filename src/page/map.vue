<template>
  <div>
    <el-container>
      <el-header class="bg-color">
        <Header class="container"></Header>
      </el-header>
      <div class="map-content container">
        <div class="train-information">
          <p class="header">{{$t("message.map")}}</p>
          <div class="data-list">
            <div class="data-list-item">
              <p class="title" v-if="!trainNumberStatus">{{$t("message.travelledDistance")}}</p>
              <p class="data" v-if="!trainNumberStatus">{{getTtravelledDistance}}</p>
            </div>
            <div class="data-list-item">
              <p class="title" v-if="!trainNumberStatus">{{$t("message.distanceToGo")}}</p>
              <p class="data" v-if="!trainNumberStatus">{{getDistanceToGo}}</p>
            </div>
            <div class="data-list-item">
              <p class="title">{{$t("message.trainSpeed")}}</p>
              <p class="data">{{getSpeed}}</p>
            </div>
            <div class="data-list-item">
              <p class="title" v-if="!trainNumberStatus">{{$t("message.nextStation")}}</p>
              <p class="data" v-if="!trainNumberStatus">{{getNextStation}}</p>
            </div>
            <div class="data-list-item">
              <p class="title" v-if="!trainNumberStatus">{{$t("message.arrivalTime")}}</p>
              <p class="data" v-if="!trainNumberStatus">{{getArrivalTime}}</p>
            </div>
            <div class="data-list-item">
              <p class="title">{{$t("message.geographicPosition")}}</p>
              <p class="data">{{getGeographicPosition}}</p>
            </div>
            <div class="data-list-item">
              <p
                class="title"
                v-if="!trainNumberStatus && !InformationOfDelayStatus"
              >{{$t("message.informationOfDelay")}}</p>
              <p
                class="data"
                v-if="!trainNumberStatus && !InformationOfDelayStatus"
              >{{getInformationOfDelay}}</p>
            </div>
          </div>
        </div>
        <div id="map"></div>
      </div>
    </el-container>
  </div>
</template>

<script>
import i18n from "@/i18n";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Header from "@/components/Header.vue";
import iconImage from "../static/images/marker-icon-2x.png";
import axios from "axios";
// import iconShadow from "../static/images/marker-shadow.png";

export default {
  components: { Header },
  data: function () {
    return {
      lang: "",
      //iconImage:'require("../static/images/marker-icon-2x.png")'
    };
  },
  mounted: function () {
    var that = this;
    switch (i18n.locale) {
      case "en":
        that.lang = "english";
        break;
      case "es":
        that.lang = "spanish";
        break;
      case "fr":
        that.lang = "france";
        break;
    }

axios
      .get(that.$store.state.media_server + "/heart")
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
        that.$message({
          message: error,
          type: "info",
          center: true,
          // iconClass: "",
          duration: 1800,
        });
      });

    setTimeout(() => {
      var osmUrl =
          this.$store.state.media_server + "/resource/tiles/{z}/{x}/{y}.png", //tiles
        //var osmUrl = "http://localhost/{z}/{x}/{y}.png", //tiles
        osmAttrib =
          '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        osm = L.tileLayer(osmUrl, {
          minZoom: 5,
          maxZoom: 12,
          attribution: osmAttrib,
        });
      //	currentMarker; //当前位置marker
      //纬度，经度
      var map = L.map("map", {
        closePopupOnClick: false, //点击地图不关闭Popup
      })
        .setView([that.getLatitude, that.getLongitude], 7)
        .addLayer(osm);
      //当前位置
      // var _latitude = parseFloat(localStorage.getItem('latitude'));
      // 	var _longitude = parseFloat(localStorage.getItem('longitude'));
      console.log(that.getLatitude);
      console.log(that.getLongitude);
      var myIcon = L.icon({
        iconUrl: iconImage,
        iconSize: [25, 41],
        //iconAnchor: [that.getLatitude, that.getLongitude],
        //popupAnchor: [-3, -76],
        //shadowUrl: iconShadow,
        //shadowSize: [68, 95],
        // shadowAnchor: [22, 94]
      });
      L.marker([that.getLatitude, that.getLongitude], { icon: myIcon }).addTo(
        map
      );
      // var latlngs = [
      //   [40.43, -3.99],
      //   [40.43, -3.96],
      //   [40.42, -3.957],
      //   [40.42, -3.949],
      //   [40.39, -3.94],
      //   [40.37, -3.92],
      //   [40.36, -3.91],
      //   [40.33, -3.89],
      //   [40.37, -3.88],
      //   [40.405, -3.913]
      // ];
      var polyline = L.polyline(that.getTrainNumberGPS, {
        color: "#820063",
        weight: 2,
      }).addTo(map);
      map.fitBounds(polyline.getBounds()); //直接显示成最适宜的缩放比例
    }, 1000);
  },
  computed: {
    trainNumberStatus() {
      return this.$store.state.trainInformation.train_number == "";
    },
    InformationOfDelayStatus() {
      return parseInt(this.$store.state.trainInformation.informationOfDelay) == 0;
    },
    getTtravelledDistance() {
      return this.$store.state.trainInformation.travelledDistance + " Km";
    },
    getDistanceToGo() {
      return this.$store.state.trainInformation.distanceToGo + " Km";
    },
    getSpeed() {
      return this.$store.state.trainInformation.speed + " Km/h";
    },
    getNextStation() {
      if (this.$store.state.trainInformation.nextStation.length == 0) {
        return "null";
      } else {
        return this.searchStation(this.$store.state.trainInformation.nextStation);
      }
    },
    getArrivalTime() {
      return this.$store.state.trainInformation.arrivalTime;
    },
    getGeographicPosition() {
      if (this.$store.state.trainInformation.geographicPosition.length == 0) {
        return "null";
      } else {
        return this.searchStation(this.$store.state.trainInformation.geographicPosition);
      }
    },
    getInformationOfDelay() {
      return this.$store.state.trainInformation.informationOfDelay + " Min";
    },
    getLatitude() {
      return parseFloat(this.$store.state.trainInformation.trainLatitude);
    },
    getLongitude() {
      return parseFloat(this.$store.state.trainInformation.trainLongitude);
    },
    getTrainNumberGPS() {
      return this.$store.state.trainInformation.trainNumberGPS;
    },
  },
  beforeRouteEnter(to, from, next) {
    document
      .querySelector("body")
      .setAttribute("style", "background-color:#FFF");
    next();
  },
  beforeRouteLeave(to, from, next) {
    document.querySelector("body").removeAttribute("style");
    next();
  },
  methods: {
    searchStation: function (array) {
      var _station = "";
      array.forEach((element) => {
        if (element[0] == this.lang) {
          _station = element[1];
        }
      });
      return _station;
    },
  },
};
</script>


<style lang="scss" scoped>
@media (max-width: 320px) {
  #map {
    width: 100%;
    height: 360px;
  }
  .map-content {
    .train-information {
      .header {
        font-size: 1.5rem;
        border-bottom: 2px solid #820063;
        color: #820063;
        padding-left: 0.1rem;
      }
      .data-list {
        display: flex;
        text-align: center;
        flex-wrap: wrap;
        .data-list-item {
          width: 136px;
          margin: 0 0.1rem;
          .title {
            height: 26px;
            line-height: 26px;
            font-size: 0.6rem;
            color: #fff;
            background-color: #820063;
            border-radius: 4px;
            margin-top: 0.4rem;
            margin-bottom: 0.1rem;
          }
          .data {
            border-bottom: 2px solid #820063;
            height: 26px;
            line-height: 26px;
            font-size: 0.6rem;
            color: #820063;
          }
        }
      }
    }
  }
}

@media (min-width: 321px) and (max-width: 360px) {
  #map {
    width: 100%;
    height: 400px;
  }
  .map-content {
    .train-information {
      .header {
        font-size: 1.6rem;
        border-bottom: 2px solid #820063;
        color: #820063;
        padding-left: 0.15rem;
      }
      .data-list {
        display: flex;
        text-align: center;
        flex-wrap: wrap;
        .data-list-item {
          width: 144px;
          margin: 0 0.15rem;
          .title {
            height: 28px;
            line-height: 28px;
            font-size: 0.65rem;
            color: #fff;
            background-color: #820063;
            border-radius: 4px;
            margin-top: 0.45rem;
            margin-bottom: 0.15rem;
          }
          .data {
            border-bottom: 2px solid #820063;
            height: 28px;
            line-height: 28px;
            font-size: 0.65rem;
            color: #820063;
          }
        }
      }
    }
  }
}

@media (min-width: 361px) and (max-width: 420px) {
  #map {
    width: 100%;
    height: 440px;
  }
  .map-content {
    .train-information {
      .header {
        font-size: 1.7rem;
        border-bottom: 2px solid #820063;
        color: #820063;
        padding-left: 0.2rem;
      }
      .data-list {
        display: flex;
        text-align: center;
        flex-wrap: wrap;
        .data-list-item {
          width: 162px;
          margin: 0 0.2rem;
          .title {
            height: 32px;
            line-height: 32px;
            font-size: 0.7rem;
            color: #fff;
            background-color: #820063;
            border-radius: 4px;
            margin-top: 0.5rem;
            margin-bottom: 0.2rem;
          }
          .data {
            border-bottom: 2px solid #820063;
            height: 32px;
            line-height: 32px;
            font-size: 0.7rem;
            color: #820063;
          }
        }
      }
    }
  }
}

@media (min-width: 421px) and (max-width: 520px) {
  #map {
    width: 100%;
    height: 460px;
  }
  .map-content {
    .train-information {
      .header {
        font-size: 1.8rem;
        border-bottom: 2px solid #820063;
        color: #820063;
        padding-left: 0.4rem;
      }
      .data-list {
        display: flex;
        text-align: center;
        flex-wrap: wrap;
        .data-list-item {
          width: 174px;
          margin: 0 0.4rem;
          .title {
            height: 36px;
            line-height: 36px;
            font-size: 0.8rem;
            color: #fff;
            background-color: #820063;
            border-radius: 5px;
            margin-top: 0.7rem;
            margin-bottom: 0.25rem;
          }
          .data {
            border-bottom: 2px solid #820063;
            height: 36px;
            line-height: 36px;
            font-size: .8rem;
            color: #820063;
          }
        }
      }
    }
  }
}

@media (min-width: 521px) and (max-width: 640px) {
  #map {
    width: 100%;
    height: 500px;
  }
  .map-content {
    .train-information {
      .header {
        font-size: 2rem;
        border-bottom: 2px solid #820063;
        color: #820063;
        padding-left: 0.5rem;
      }
      .data-list {
        display: flex;
        text-align: center;
        flex-wrap: wrap;
        .data-list-item {
          width: 220px;
          margin: 0 0.5rem;
          .title {
            height: 36px;
            line-height: 36px;
            font-size: .9rem;
            color: #fff;
            background-color: #820063;
            border-radius: 5px;
            margin-top: 0.7rem;
            margin-bottom: 0.25rem;
          }
          .data {
            border-bottom: 2px solid #820063;
            height: 36px;
            line-height: 36px;
            font-size: .9rem;
            color: #820063;
          }
        }
      }
    }
  }
}

@media (min-width: 641px) and (max-width: 768px) {
  #map {
    width: 100%;
    height: 560px;
  }
  .map-content {
    .train-information {
      .header {
        font-size: 2rem;
        border-bottom: 2px solid #820063;
        color: #820063;
        padding-left: 0.5rem;
      }
      .data-list {
        display: flex;
        text-align: center;
        flex-wrap: wrap;
        .data-list-item {
          width: 280px;
          margin: 0 0.5rem;
          .title {
            height: 36px;
            line-height: 36px;
            font-size: 1rem;
            color: #fff;
            background-color: #820063;
            border-radius: 5px;
            margin-top: 0.7rem;
            margin-bottom: 0.25rem;
          }
          .data {
            border-bottom: 2px solid #820063;
            height: 36px;
            line-height: 36px;
            font-size: 1rem;
            color: #820063;
          }
        }
      }
    }
  }
}

@media (min-width: 769px) and (max-width: 999px) {
  #map {
    width: 66%;
    height: 700px;
    margin-left: 2%;
  }
  .map-content {
    display: flex;
    .train-information {
      width: 32%;
      text-align: center;
      .header {
        font-size: 2rem;
        border-bottom: 2px solid #820063;
        color: #820063;
      }
      .title {
        height: 36px;
        line-height: 36px;
        font-size: 1rem;
        color: #fff;
        background-color: #820063;
        border-radius: 5px;
        margin-top: 0.7rem;
        margin-bottom: 0.25rem;
      }
      .data {
        border-bottom: 2px solid #820063;
        height: 36px;
        line-height: 36px;
        font-size: 1rem;
        color: #820063;
      }
    }
  }
}

@media (min-width: 1000px) and (max-width: 1239px) {
  #map {
    width: 70%;
    height: 760px;
    margin-left: 3%;
  }
  .map-content {
    display: flex;
    .train-information {
      width: 27%;
      text-align: center;
      .header {
        font-size: 2rem;
        border-bottom: 2px solid #820063;
        color: #820063;
      }
      .title {
        height: 40px;
        line-height: 40px;
        font-size: 1rem;
        color: #fff;
        background-color: #820063;
        border-radius: 5px;
        margin-top: 0.7rem;
        margin-bottom: 0.3rem;
      }
      .data {
        border-bottom: 2px solid #820063;
        height: 40px;
        line-height: 40px;
        font-size: 1.1rem;
        color: #820063;
      }
    }
  }
}

@media (min-width: 1240px) {
  #map {
    width: 70%;
    height: 760px;
    margin-left: 3%;
  }

  .map-content {
    display: flex;
    .train-information {
      width: 27%;
      text-align: center;
      .header {
        font-size: 2rem;
        border-bottom: 2px solid #820063;
        color: #820063;
      }
      .title {
        height: 40px;
        line-height: 40px;
        font-size: 1rem;
        color: #fff;
        background-color: #820063;
        border-radius: 5px;
        margin-top: 0.7rem;
        margin-bottom: 0.3rem;
      }
      .data {
        border-bottom: 2px solid #820063;
        height: 40px;
        line-height: 40px;
        font-size: 1.1rem;
        color: #820063;
      }
    }
  }
}
</style>