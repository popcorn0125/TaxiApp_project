import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://203.250.54.143:3000',
    timeout : 10000
})

export default {
    
    login(id:string, pw:string, fcmToken:string) {
        return instance.post('/driver/login', {userId:id, userPw:pw, fcmToken:fcmToken})
    },

    register(id:string, pw:string, fcmToken:string) {
        return instance.post('/driver/register', {userId:id, userPw:pw, fcmToken:fcmToken})
    },

    // 리스트 목록 불러오기
    list(id:string) {
        return instance.post('/driver/list', {userId:id})
    },

    // 유저가 배차를 요청했을 때 드라이버가 가겠다고 요청
    accept(driverId:string, callId: string, userId:string ) {
        return instance.post('/driver/accept', {
            driverId: driverId,
            callId : callId,
            userId : userId
        })
    }

}