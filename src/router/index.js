import Vue from 'vue';
import VueRouter from 'vue-router';
import home from '@/page/home.vue';
import multimedia from '@/page/multimedia.vue';
import map from '@/page/map.vue';
import touristInformation from '@/page/touristInformation.vue';
import setting from '@/page/setting.vue';
import passengerInformation from '@/page/passengerInformation.vue';
import play from '@/page/play.vue';
import read from '@/page/read.vue';
import music from '@/page/music.vue';
import book from '@/page/book.vue';
import video from '@/page/video.vue';
import summary from '@/page/summary.vue';
import trainsetFloorPlan from '@/page/trainsetFloorPlan.vue';
import technical from '@/page/technical.vue';
import languageSetting from '@/page/languageSetting.vue';

Vue.use(VueRouter);

const router = new VueRouter({
    routes:[{
        path:'/languageSetting',
        component:languageSetting
    },{
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
        path:'/play/:summaryID',
        component:play,
        props: true
    },{
        path:'/read/:summaryID',
        component:read,
        props: true
    },{
        path:'/video',
        component:video
    },{
        path:'/music',
        component:music
    },{
        path:'/book',
        component:book
    },{
        path:'/summary/:summaryType/:summaryID',
        component:summary,
        props: true
        
    },{
        path:'/trainsetFloorPlan',
        component:trainsetFloorPlan
    },{
        path:'/technical',
        component:technical
    }]
});

router.push('/languageSetting');
//router.push('/home');

export default router;