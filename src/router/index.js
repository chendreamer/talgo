import Vue from 'vue';
import VueRouter from 'vue-router';
import home from '@/page/home.vue';
import multimedia from '@/page/multimedia.vue';
import map from '@/page/map.vue';
import touristInformation from '@/page/touristInformation.vue';
import setting from '@/page/setting.vue';
import passengerInformation from '@/page/passengerInformation.vue';
import play from '@/page/play.vue';

Vue.use(VueRouter);

const router = new VueRouter({
    routes:[{
        path:'/home',
        component:home
    },{
        path:'/multimedia',
        component:multimedia
    },{
        path:'/map',
        component:map
    },{
        path:'/touristInformation',
        component:touristInformation
    },{
        path:'/setting',
        component:setting
    },{
        path:'/passengerInformation',
        component:passengerInformation
    },{
        path:'/play',
        component:play
    }]
});
router.push('/home');

export default router;