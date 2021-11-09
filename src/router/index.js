import Vue from 'vue';
import VueRouter from 'vue-router';
import home from '@/page/home.vue';
import multimedia from '@/page/multimedia.vue';
import map from '@/page/map.vue';
import touristInformation from '@/page/touristInformation.vue';
import setting from '@/page/setting.vue';
import passengerInformation from '@/page/passengerInformation.vue';
import player from '@/page/player.vue';
import reader from '@/page/reader.vue';
import music from '@/page/music.vue';
import book from '@/page/book.vue';
import video from '@/page/video.vue';
import summary from '@/page/summary.vue';
import trainsetFloorPlan from '@/page/trainsetFloorPlan.vue';
import technical from '@/page/technical.vue';
import languageSetting from '@/page/languageSetting.vue';

Vue.use(VueRouter);

const router = new VueRouter({
    //mode: 'history',
    routes: [{
        name: 'languageSetting',
        path: '/languageSetting',
        component: languageSetting
    }, {
        name: 'home',
        path: '/home',
        component: home,
        replace:true
    }, {
        name: 'multimedia',
        path: '/multimedia',
        component: multimedia
    }, {
        name: 'map',
        path: '/map',
        component: map
    }, {
        name: 'touristInformation',
        path: '/touristInformation',
        component: touristInformation
    }, {
        name: 'setting',
        path: '/setting',
        component: setting
    }, {
        name: 'passengerInformation',
        path: '/passengerInformation',
        component: passengerInformation
    }, {
        name: 'player',
        path: '/player',
        component: player,
        props: true
    }, {
        name: 'reader',
        path: '/reader',
        component: reader,
        props: true
    }, {
        name: 'video',
        path: '/video',
        component: video
    }, {
        name: 'music',
        path: '/music',
        component: music
    }, {
        name: 'book',
        path: '/book',
        component: book
    }, {
        name: 'summary',
        path: '/summary',
        component: summary,
        props: true
    }, {
        name: 'trainsetFloorPlan',
        path: '/trainsetFloorPlan',
        component: trainsetFloorPlan
    }, {
        name: 'technical',
        path: '/technical',
        component: technical
    }, {
        name: 'notMatched',
        path: '*',
        redirect: '/home',
        replace:true
    }]
});

// {
//     path:'/summary/:summaryType/:summaryID',
//     component:summary,
//     props: true
// }

//没匹配到会进入*，重定向到home
router.push('/languageSetting');
//router.push('/home');

router.beforeEach((to, from, next) => {
    // console.log('路由变化：');
    // console.log(from);
    // console.log(to);

    if ((from.name == 'video' || from.name == 'book') && (to.name == 'summary' || to.name == 'player' || to.name == 'reader')) {
        //console.log('video => summary');
        //console.log(to.params);
        if (JSON.stringify(to.params) == "{}"){
            //console.log('video => summary传的空值');
            router.go(-1);
        }
    }

    next();
  })

export default router;