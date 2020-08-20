import Vue from 'vue';
import App from './App.vue';
import 'normalize.css';
import {container,header,main,rate,collapse,collapseItem,loading,message,row,col} from 'element-ui';
import './assets/style/main.scss';


import router from './router';
import i18n from './i18n';
import store from './store';


//import mqtt from './assets/js/mqtt.min.js'


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
Vue.prototype.$message = message;
Vue.config.productionTip = false;




new Vue({
  render: h => h(App),
  router,
  store,
  i18n,
}).$mount('#app')
