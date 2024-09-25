import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://203.250.54.143:3000',
    timeout : 10000
})

export default {
    test() {
        return instance.get('/taxi/test')
    },

    login(id:string, pw:string, fcmToken:string) {
        return instance.post('/taxi/login', {userId:id, userPw:pw, fcmToken:fcmToken})
    },

    /*********** */
    // DAY 03 실습
    callAddr(id:String, startAddr:string, startLat:string, startLng:string,endAddr:string, endLat:string, endLng:string) {
        return instance.post('/taxi/call' , {
            userId: id,
            startAddr : startAddr,
            startLat : startLat,
            startLng : startLng,
            endAddr : endAddr,
            endLat : endLat,
            endLng : endLng
        })
    },
    /****************** */

    register(id:string, pw:string, fcmToken:string) {
        return instance.post('/taxi/register', {userId:id, userPw:pw, fcmToken:fcmToken})
    },

    // 리스트 목록 불러오기
    list(id:string) {
        return instance.post('/taxi/list', {userId:id})
    },

    // 호출
    call(id:string, startLat:string, startLng:string, startAddr:string,
        endLat:string, endLng:string, endAddr:string ) {
        
        return instance.post('/taxi/call', {
            userId: id,
            startLat : startLat,
            startLng : startLng,
            startAddr : startAddr,
            endLat : endLat,
            endLng : endLng,
            endAddr : endAddr
        })
    },

    geoCoding(coords:any, key:string) {
        let url = 'https://maps.googleapis.com/maps/api/geocode/json'
        let lat = coords.latitude
        let lng = coords.longitude

        return axios.get(`${url}?latlng=${lat},${lng}&key=${key}&language=ko`)
    }



}