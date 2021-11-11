import Vue from 'vue'
import Vuex from 'vuex'
import music from './modules/music'
import trainInformation from './modules/trainInformation'
//import mutations from './mutations'
// import actions from './store/actions.js'
// import getters from './store/getters.js'
Vue.use(Vuex);

//media_server: 'http://172.19.6.20',//f070媒体服务器ip
//media_server: 'http://172.19.3.20' //re02媒体服务器ip
//media_server: 'http://172.18.11.20',//f075媒体服务器ip
//media_server: 'http://office.theonecraft.com:22280',//公网媒体服务器ip

//当前媒体服务器ip,只需要改这个IP值
const ip_address = '172.18.11.20';
const state = {
    media_server: 'http://' + ip_address,
    mqtt_server: 'mqtt://' + ip_address + ':21884',//当前mqtt服务器ip'
    // time_define:1200
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
