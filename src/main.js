import Vue from 'vue';
import App from './App.vue';
import 'normalize.css';
import {container,header,main,rate,collapse,collapseItem,loading,message,row,col,slider} from 'element-ui';
import './assets/style/main.scss';


import router from './router';
import i18n from './i18n';
import store from './store';
//import _ from 'lodash';
//import './assets/js/polyfill.min.js';
//import mqtt from './assets/js/mqtt'
//import './assets/lib/mqtt.min.js' 


// Vue.prototype._ = _ ;

//Vue.use(message);
//Vue.use(mqtt);
Vue.use(row);
Vue.use(col);
Vue.use(container);
Vue.use(header);
Vue.use(main);
Vue.use(rate);
Vue.use(collapse);
Vue.use(collapseItem);
Vue.use(loading);
Vue.use(slider);
Vue.prototype.$message = message;
Vue.config.productionTip = false;




new Vue({
  render: h => h(App),
  router,
  store,
  i18n,
}).$mount('#app')
