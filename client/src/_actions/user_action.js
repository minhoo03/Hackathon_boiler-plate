import axios from 'axios'
import { LOGIN_USER, REGISTER_USER, AUTH_USER } from './types'

// req.body = dataTosubmit... 파라미터로 받음
export function loginUser(dataTosubmit) {
    // 서버에 data 날린후 받은 data => res.data
    const request = axios.post('/api/users/login', dataTosubmit)
    .then(res => res.data )

    // return 하여 reducer 로 보내야함
    // reducer : useState처럼 이전값과 들어온 값(액션) 비교 -> 바뀐 값 return
    return {
        // action 모습 ↓
        type: LOGIN_USER, // 액션 이름
        payload: request
    }
}

export function registerUser(dataTosubmit) {
    // 서버에 data 날린후 받은 data => res.data
    const request = axios.post('/api/users/register', dataTosubmit)
    .then(res => res.data )

    // return 하여 reducer 로 보내야함
    // reducer : useState처럼 이전값과 들어온 값(액션) 비교 -> 바뀐 값 return
    return {
        // action 모습 ↓
        type: REGISTER_USER,
        payload: request // 서버에서 넘어온 데이터를 redux store에 받고 관리 가능 (res.payload...)
    }
}

export function auth() {
    // 서버에 data 날린후 받은 data => res.data
    const request = axios.get('/api/users/auth')
    .then(res => res.data )

    return {
        type: AUTH_USER,
        payload: request 
    }
}