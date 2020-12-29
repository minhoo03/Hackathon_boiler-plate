import axios from 'axios'
import { LOGIN_USER } from './types'

// req.body = dataTosubmit... 파라미터로 받음
export function loginUser(dataTosubmit) {
    // 서버에 data 날린후 받은 data => res.data
    const request = axios.post('/api/users/login', dataTosubmit)
    .then(res => res.data )

    // return 하여 reducer 로 보내야함
    // reducer : useState처럼 이전값과 들어온 값(액션) 비교 -> 바뀐 값 return
    return {
        // action 모습 ↓
        type: LOGIN_USER,
        payload: request
    }
}