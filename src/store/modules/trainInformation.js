import mqtt from "mqtt";

const state = {
    client: {}, //mqtt客户端
    mqtt_server: 'mqtt://172.18.11.20:21884',//f075 mqtt服务器ip
    //mqtt_server: 'mqtt://172.18.3.20:21884',//re02 mqtt服务器ip
    //mqtt_server: 'mqtt://172.18.6.20:21884',//f070 mqtt服务器ip
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
    currentNumber: 1,
}

// getters
const getters = {

}

// mutations
const mutations = {
    setCurrentNumber: function (state, data) {
        state.currentNumber = data;
    }
}

// actions
const actions = {
    connectMqttServer: function () {
        if (state.client.connected) {
            return;
        }

        state.client = mqtt.connect(state.mqtt_server);

        state.client.on("connect", function () {
            console.log("mqtt connected!");
            state.client.subscribe("/hmi/train_number/in"); //车次信息
            state.client.subscribe("/hmi/destination/in"); //终点站
            state.client.subscribe("/hmi/next_station/in"); //下一站
            state.client.subscribe("/tcms/speed/in"); //速度
            state.client.subscribe("/tcms/temperature/in"); //外温
            state.client.subscribe("/hmi/initial_station/in"); //起始站
            state.client.subscribe("/hmi/current_station/in"); //当前站
            state.client.subscribe("/hmi/trainNumber_GPS/in"); //所有GPS
            state.client.subscribe("/tcms/gps/in"); //实时GPS坐标
            state.client.subscribe("/hmi/distance/in"); //已走的距离，距离下一站的距离
            state.client.subscribe("/hmi/delay_time/in"); //已走的距离，距离下一站的距离
            state.client.subscribe("/tcms/train_type/in"); //列车类型
        });

        state.client.on("message", function (topic, message) {
            //console.log(message);
            message = JSON.parse(message);
            //console.log(message);
            switch (topic) {
                case "/hmi/train_number/in":
                    if (state.train_number !== message.train_number) {
                        state.train_number = message.train_number;
                    }
                    break;
                case "/hmi/destination/in":
                    if (state.finalDestination !== message.final_station) {
                        state.finalDestination = message.final_station;
                    }
                    break;
                case "/hmi/next_station/in":
                    if (state.arrivalTime !== message.arrive_time) {
                        state.arrivalTime = message.arrive_time;
                    }
                    if (state.nextStation !== message.next_station) {
                        state.nextStation = message.next_station;
                    }
                    break;
                case "/tcms/speed/in":
                    if (state.speed !== message.speed) {
                        state.speed = message.speed;
                    }

                    break;
                case "/tcms/temperature/in":
                    if (state.temperature !== message.temperature) {
                        state.temperature = message.temperature;
                    }
                    break;
                case "/hmi/distance/in":
                    if (state.travelledDistance !== message.coveredDistance) {
                        state.travelledDistance = message.coveredDistance;
                    }
                    if (state.distanceToGo !== message.distancetogo) {
                        state.distanceToGo = message.distancetogo;
                    }
                    break;
                case "/hmi/delay_time/in":
                    if (state.informationOfDelay !== message.delay_time) {
                        state.informationOfDelay = message.delay_time;
                    }
                    break;
                case "/hmi/current_station/in":
                    if (
                        state.geographicPosition !== message.current_station
                    ) {
                        state.geographicPosition = message.current_station;
                    }
                    break;
                case "/tcms/train_type/in":
                    if ((state.trainType = message.train_type)) {
                        state.trainType = message.train_type;
                    }
                    break;
                case "/tcms/gps/in":
                    state.trainLatitude = message.latitude;
                    state.trainLongitude = message.longitude;
                    // if (state.currentGPS != message) {
                    //   state.currentGPS = message;
                    // }
                    break;
                case "/hmi/trainNumber_GPS/in":
                    // console.log('-------------');
                    // console.log(message);
                    state.trainNumberGPS = message.trainNumberGps;
                    // if (state.currentGPS != message) {
                    //   state.currentGPS = message;
                    // }
                    break;
                default:
                    break;
            }
        });
    }
}

export default {
    //namespaced: true,
    state,
    getters,
    actions,
    mutations
}