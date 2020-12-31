// action.js에서 return한 값은 따로 import하지 않아도,
// type만 import해주면 redux에서 return값을 알아서 처리해 보내줌
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
} from '../_actions/types';
 

//                  전 값, 바뀐 값
export default function(state={},action){
    // 보내는 액션 타입이 다르므로... EX) login_user, register_user
    switch(action.type){
        case REGISTER_USER:
            return {...state, register: action.payload }
        case LOGIN_USER:
            return { ...state, loginSucces: action.payload }
        // 로그인된 유저의 모든 유저 데이터 받음
        case AUTH_USER:
            return {...state, userData: action.payload }
        default:
            return state;
    }
}