import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

const state = {
  //media_server: 'http://office.theonecraft.com:22280',//媒体服务器ip
  media_server: 'http://172.19.6.4',//媒体服务器ip
  //mqtt_server: 'mqtt://172.19.6.21:21884',//mqtt服务器ip

  //media_server: 'http://172.19.6.20',//现场媒体服务器ip   
  mqtt_server: 'mqtt://172.19.6.20:21884',//现场mqtt服务器ip

  train_number: 'null',//列车号
  temperature: 'null',//温度
  speed: 'null',//速度
  nextStation: [],//下一站
  finalDestination: [],//终点站
  travelledDistance: 'null',//已走的距离，距离下一站的距离
  distanceToGo: 'null',//
  informationOfDelay: 'null',//延时
  geographicPosition: [],
  arrivalTime: 'null',
  trainType: '',
  trainLatitude: 0,
  trainLongitude: 0,
  trainNumberGPS: [],
}

export default new Vuex.Store({
  state
})
