import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n);

const messages = {
    en: {
      message: {
        menu:'MENU',
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
        menu:'MENÚ',
        multimedia: 'Multimedia',
        passengerInformation : 'Información del pasajero',
        touristInformation : 'Información turístico',
        map:'Mapa',
        setting:'Ajuste',
        video:'Vídeo',
        music:'Música',
        book:'Libro',
        travelledDistance:'Distancia recorrida',
        distanceToGo:'Distancia para ir',
        trainSpeed:'Velocidad del tren',
        nextStation:'Siguiente estacion',
        arrivalTime:'Hora de llegada',
        geographicPosition:'Posición geográfica',
        informationOfDelay:'Información de retraso',
        trainsetFloorPlan:'Plano de planta de Trainset',
        technicalFeatures:'Características técnicas',
        view:'Ver'
      }
    },
    fr: {
      message: {
        menu:'MENU',
        multimedia: 'Multimédia',
        passengerInformation : 'Passager Information',
        touristInformation : 'Touriste Information',
        map:'Carte',
        setting:'réglage',
        video:'Vidéo',
        music:'La musique',
        book:'Livre',
        travelledDistance:'Distance parcourue',
        distanceToGo:'Distance à parcourir',
        trainSpeed:'Vitesse du train',
        nextStation:'Prochaine station',
        arrivalTime:"Heure d'arrivée",
        geographicPosition:'Position géographique',
        informationOfDelay:'Information de retard',
        trainsetFloorPlan:'Plan de la rame',
        technicalFeatures:'Caractéristiques techniques',
        view:'Vue'
      }
    }
  }

const i18n = new VueI18n({
    locale: 'en', // 设置地区
    messages, // 设置地区信息
  })
  

export default i18n;