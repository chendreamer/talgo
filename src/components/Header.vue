<template>
  <div>
    <div class="header-container">
      <div class="train-information">
        <div class="header-content">
          <h2
            class="tc"
            v-if="currentNumber == 1"
          >Welcome to train &nbsp;{{getTrainNum}}. Enjoy your trip.</h2>
          <h2
            class="tc"
            v-else-if="currentNumber == 2"
          >Temperature&nbsp;{{getTemperature}} Speed&nbsp;{{getSpeed}}Km/h</h2>
          <h2 class="tc" v-else-if="currentNumber == 3">Next Station&nbsp;{{getNextStation}}</h2>
          <h2 class="tc" v-else>Final Destination&nbsp;{{getFinalDestination}}</h2>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import mqtt from "mqtt";
import i18n from "@/i18n";

let client;

export default {
  name: "Header",
  data: function () {
    return {
      lang: "",
      currentNumber: 1,
      sd: 0,
      // train_number: this.$store.state.train_number,
      // temperature: this.$store.state.temperature,
      // speed: this.$store.state.speed,
      // nextStation: this.$store.state.nextStation,
      // finalDestination: this.$store.state.finalDestination,
    };
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
  computed: {
    getTrainNum() {
      return this.$store.state.train_number;
    },
    getTemperature() {
      return this.$store.state.temperature;
    },
    getSpeed() {
      return this.$store.state.speed;
    },
    getNextStation() {
      if (this.$store.state.nextStation.length == 0) {
        return "null";
      } else {
        return this.searchStation(this.$store.state.nextStation);
      }
    },
    getFinalDestination() {
      if (this.$store.state.finalDestination.length == 0) {
        return "null";
      } else {
        return this.searchStation(this.$store.state.finalDestination);
      }
    },
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
    client = mqtt.connect(that.$store.state.mqtt_server);

    client.on("connect", function () {
      console.log("mqtt connected!");
      client.subscribe("/hmi/train_number/in"); //车次信息
      client.subscribe("/hmi/destination/in"); //终点站
      client.subscribe("/hmi/next_station/in"); //下一站
      client.subscribe("/tcms/speed/in"); //速度
      client.subscribe("/tcms/temperature/in"); //外温
      client.subscribe("/hmi/initial_station/in"); //起始站
      client.subscribe("/hmi/current_station/in"); //当前站
      client.subscribe("/hmi/trainNumber_GPS/in"); //所有GPS
      client.subscribe("/tcms/gps/in"); //实时GPS坐标
      client.subscribe("/hmi/distance/in"); //已走的距离，距离下一站的距离
      client.subscribe("/hmi/delay_time/in"); //已走的距离，距离下一站的距离
      client.subscribe("/tcms/train_type/in"); //列车类型
    });

    client.on("message", function (topic, message) {
      // if (that.sd < 10) {
      //   that.sd++;
      //   console.log(message.toString());
      // }
      message = JSON.parse(message);
      switch (topic) {
        case "/hmi/train_number/in":
          if (that.$store.state.train_number !== message.train_number) {
            that.$store.state.train_number = message.train_number;
          }
          break;
        case "/hmi/destination/in":
          if (that.$store.state.finalDestination !== message.final_station) {
            that.$store.state.finalDestination = message.final_station;
          }
          break;
        case "/hmi/next_station/in":
          if (that.$store.state.arrivalTime !== message.arrive_time) {
            that.$store.state.arrivalTime = message.arrive_time;
          }
          if (that.$store.state.nextStation !== message.next_station) {
            that.$store.state.nextStation = message.next_station;
          }
          break;
        case "/tcms/speed/in":
          if (that.$store.state.speed !== message.speed) {
            that.$store.state.speed = message.speed;
          }

          break;
        case "/tcms/temperature/in":
          if (that.$store.state.temperature !== message.temperature) {
            that.$store.state.temperature = message.temperature;
          }
          break;
        case "/hmi/distance/in":
          if (that.$store.state.travelledDistance !== message.coveredDistance) {
            that.$store.state.travelledDistance = message.coveredDistance;
          }
          if (that.$store.state.distanceToGo !== message.distancetogo) {
            that.$store.state.distanceToGo = message.distancetogo;
          }
          break;
        case "/hmi/delay_time/in":
          if (that.$store.state.informationOfDelay !== message.delay_time) {
            that.$store.state.informationOfDelay = message.delay_time;
          }
          break;
        case "/hmi/current_station/in":
          if (
            that.$store.state.geographicPosition !== message.current_station
          ) {
            that.$store.state.geographicPosition = message.current_station;
          }
          break;
        case "/tcms/train_type/in":
          if ((that.$store.state.trainType = message.train_type)) {
            that.$store.state.trainType = message.train_type;
          }
          break;
        case "/tcms/gps/in":
          that.$store.state.trainLatitude = message.latitude;
          that.$store.state.trainLongitude = message.longitude;
          // if (that.$store.state.currentGPS != message) {
          //   that.$store.state.currentGPS = message;
          // }
          break;
        case "/hmi/trainNumber_GPS/in":
          that.$store.state.trainNumberGPS = message.trainNumberGps;
          // if (that.$store.state.currentGPS != message) {
          //   that.$store.state.currentGPS = message;
          // }
          break;
        default:
          break;
      }
    });

    var e = document.getElementsByClassName("train-information")[0];
    function whichTransitionEvent() {
      var t,
        el = document.createElement("surface"),
        transitions = {
          transition: "animationiteration",
          OTransition: "webkitAnimationIteration",
          MozTransition: "webkitAnimationIteration",
          WebkitTransition: "webkitAnimationIteration",
        };

      for (t in transitions) {
        if (el.style[t] !== undefined) {
          return transitions[t];
        }
      }
    }

    var transitionEvent = whichTransitionEvent();
    transitionEvent &&
      e.addEventListener(transitionEvent, function () {
        if (that.currentNumber == 4) {
          that.currentNumber = 1;
        } else {
          that.currentNumber++;
        }
      });
  },
  beforeDestroy: function () {
    client.end();
  },
};
</script>


<style lang="scss" scoped>
@media (max-width: 320px) {
  h2 {
    font-size: .8rem;
  }
}

@media (min-width: 321px) and (max-width: 360px) {
  h2 {
    font-size: .8rem;
  }
}

@media (min-width: 361px) and (max-width: 420px) {
  h2 {
    font-size: .9rem;
  }
}

@media (min-width: 421px) and (max-width: 520px) {
  h2 {
    font-size: 1rem;
  }
}

@media (min-width: 521px) and (max-width: 640px) {
  h2 {
    font-size: 1.1rem;
  }
}

@media (min-width: 641px) and (max-width: 768px) {
  h2 {
    font-size: 1rem;
  }
}

@media (min-width: 769px) and (max-width: 992px) {
  h2 {
    font-size: 1.2rem;
  }
}

@media (min-width: 993px) and (max-width: 1200px) {
  h2 {
    font-size: 1.3rem;
  }
}

@media (min-width: 1201px) {
  h2 {
    font-size: 1.1rem;
  }
}
h2 {
  color: white;
}
.header-container {
  height: 40px;
  margin-top: 16px;
  overflow: hidden;
}
.train-information {
  animation-name: slide;
  animation-duration: 5s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

@keyframes slide {
  0% {
    transform: translateY(50px);
  }
  20% {
    transform: translateY(0);
  }
  80% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-50px);
  }
}
</style>