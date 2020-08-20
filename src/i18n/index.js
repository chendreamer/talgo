import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n);

const messages = {
    en: {
      message: {
        multimedia: 'Multimedia',
        passengerInformation : 'Passenger Information',
        touristInformation : 'Tourist Information',
        map:'Map',
        setting:'Setting',
        video:'Video',
        music:'Music',
        book:'Book',
        travelledDistance:'Travelled Distance',
        distanceToGo:'Distance To Go',
        trainSpeed:'Train Speed',
        nextStation:'Next Station',
        arrivalTime:'Arrival Time',
        geographicPosition:'Geographic Position',
        informationOfDelay:'Information Of Delay',
        trainsetFloorPlan:'Trainset Floor Plan',
        technicalFeatures:'Technical Features',
        view:'View'
      }
    },
    es: {
      message: {
        multimedia: 'Multimedia-es',
        passengerInformation : 'Passenger Information-es',
        touristInformation : 'Tourist Information-es',
        map:'Map-es',
        setting:'Setting-es',
        video:'Video-es',
        music:'Music-es',
        book:'Book-es',
        travelledDistance:'Travelled Distance-es',
        distanceToGo:'Distance To Go-es',
        trainSpeed:'Train Speed-es',
        nextStation:'Next Station-es',
        arrivalTime:'Arrival Time-es',
        geographicPosition:'Geographic Position-es',
        informationOfDelay:'Information Of Delay-es',
        trainsetFloorPlan:'Trainset Floor Plan-es',
        technicalFeatures:'Technical Features-es',
        view:'View-es'
      }
    },
    fr: {
      message: {
        multimedia: 'Multimedia-fr',
        passengerInformation : 'Passenger Information-fr',
        touristInformation : 'Tourist Information-fr',
        map:'Map-fr',
        setting:'Setting-fr',
        video:'Video-fr',
        music:'Music-fr',
        book:'Book-fr',
        travelledDistance:'Travelled Distance-fr',
        distanceToGo:'Distance To Go-fr',
        trainSpeed:'Train Speed-fr',
        nextStation:'Next Station-fr',
        arrivalTime:'Arrival Time-fr',
        geographicPosition:'Geographic Position-fr',
        informationOfDelay:'Information Of Delay-fr',
        trainsetFloorPlan:'Trainset Floor Plan-fr',
        technicalFeatures:'Technical Features-fr',
        view:'View-fr'
      }
    }
  }

const i18n = new VueI18n({
    locale: 'en', // 设置地区
    messages, // 设置地区信息
  })
  

export default i18n;