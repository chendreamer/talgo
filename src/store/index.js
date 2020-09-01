import Vue from 'vue'
import Vuex from 'vuex'
import music from './modules/music'
import trainInformation from './modules/trainInformation'
//import mutations from './mutations'
// import actions from './store/actions.js'
// import getters from './store/getters.js'
Vue.use(Vuex);

const state = {
  //media_server: 'http://office.theonecraft.com:22280',//媒体服务器ip
  media_server: 'http://172.19.6.4',//媒体服务器ip
  //mqtt_server: 'mqtt://172.19.6.21:21884',//mqtt服务器ip

  ////media_server: 'http://172.19.6.20',//现场媒体服务器ip
}


//把mqtt接收也放到store中
export default new Vuex.Store({
  state,
  modules: {
    music,
    trainInformation
  }
  // getters,
  // actions,
  //mutations
})
