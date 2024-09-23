import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://203.250.54.143:3000',
    timeout : 10000
})

export default {
    test() {
        return instance.get('/taxi/test')
    },

    login(id:string, pw:string) {
        return instance.post('/taxi/login', {userId:id, userPw:pw})
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
    }
    /****************** */

}