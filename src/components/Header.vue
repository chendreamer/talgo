<template>
  <div>
    <div class="header-container">
      <div class="train-information">
        <div class="header-content">
          <h2 class="tc" v-if="getCurrentNumber == 1">
            Welcome to train &nbsp;{{ getTrainNum }}. Enjoy your trip.
          </h2>
          <h2 class="tc" v-else-if="getCurrentNumber == 2">
            Temperature&nbsp;{{getTemperature}}&#8451;&nbsp;&nbsp;&nbsp;&nbsp;Speed&nbsp;{{ getSpeed }}Km/h
          </h2>
          <h2 class="tc" v-else-if="getCurrentNumber == 3">
            Next Station&nbsp;{{ getNextStation }}
          </h2>
          <h2 class="tc" v-else>
            Final Destination&nbsp;{{ getFinalDestination }}
          </h2>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
//import mqtt from "mqtt";
import i18n from "@/i18n";

//let client;

export default {
  name: "Header",
  data: function () {
    return {
      lang: "",
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
      return this.$store.state.trainInformation.train_number;
    },
    getTemperature() {
      return this.$store.state.trainInformation.temperature;
    },
    getSpeed() {
      return this.$store.state.trainInformation.speed;
    },
    getNextStation() {
      if (this.$store.state.trainInformation.nextStation.length == 0) {
        return "null";
      } else {
        return this.searchStation(
          this.$store.state.trainInformation.nextStation
        );
      }
    },
    getFinalDestination() {
      if (this.$store.state.trainInformation.finalDestination.length == 0) {
        return "null";
      } else {
        return this.searchStation(
          this.$store.state.trainInformation.finalDestination
        );
      }
    },
    getCurrentNumber() {
      return this.$store.state.trainInformation.currentNumber;
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
        if (that.getCurrentNumber == 4) {
          that.$store.commit("setCurrentNumber", 1);
        } else {
          that.$store.commit(
            "setCurrentNumber",
            that.$store.state.trainInformation.currentNumber + 1
          );
        }
      });
  },
  beforeDestroy: function () {
    //client.end();
  },
};
</script>


<style lang="scss" scoped>
@media (max-width: 320px) {
  h2 {
    font-size: 0.7rem;
  }
}

@media (min-width: 321px) and (max-width: 360px) {
  h2 {
    font-size: 0.7rem;
  }
}

@media (min-width: 361px) and (max-width: 420px) {
  h2 {
    font-size: 0.8rem;
  }
}

@media (min-width: 421px) and (max-width: 520px) {
  h2 {
    font-size: 0.9rem;
  }
}

@media (min-width: 521px) and (max-width: 640px) {
  h2 {
    font-size: 1rem;
  }
}

@media (min-width: 641px) and (max-width: 768px) {
  h2 {
    font-size: 1rem;
  }
}

@media (min-width: 769px) and (max-width: 999px) {
  h2 {
    font-size: 1.1rem;
  }
}

@media (min-width: 1000px) and (max-width: 1239px) {
  h2 {
    font-size: 1.1rem;
  }
}

@media (min-width: 1240px) {
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