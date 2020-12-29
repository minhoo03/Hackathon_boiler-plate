import { LOGIN_USER } from '../_actions/types'


//                  전 값, 바뀐 값
export default function(state={}, action) {
    // 보내는 액션 타입이 다르므로... EX) login_user, register_user
    switch (action.type) {
        case LOGIN_USER : return { ...state, loginSuccess: action.payload} 
        break;

        default: 
            return state;
    }
} 