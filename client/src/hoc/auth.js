// hoc : Auth(hoc)안의 다른 component를 넣고... { randing, LoginPage.. 등등 } 이 컴포넌트로 갈 상태가 맞는지 판단
// *예를 들어 로그인한 유저는 로그인 페이지로 못가게 막는다.
// **Auth => 상태 물어보기 => backend => 상태 전달 => auth => 페이지 이동 처리
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { auth } from '../_actions/user_action'

//  App.js           랜딩하는 컴포넌트   ,  null/true/false (아무나, 로그인한, 로그인안한)  ,  어드민만
export default function (SpecificComponent, option, adminRoute = null) {

    function AuthenticationCheck(props){
        // redux를 이용해 로그인 상태 저장 (action, reducer 연결)
        const dispatch = useDispatch()

        useEffect(() => {
            
            // axios.get... action -> reducer 까지 마친 auth()
            dispatch(auth()).then(res => {
                console.log(res.payload)
                
                if(!res.payload.isAuth){
                    // 로그인 하지 않은 상태
                    if(option) {
                        props.history.push('/login')
                    }
                } else if (res.payload.isAuth === true) {
                    // 로그인 한 상태
                    if(adminRoute && !res.isAdmin) { // adminRoute에 일반인이 출입할 경우
                        props.history.push('/')
                    } else {
                        if(option === false) { // 로그인한 유저가 로그인 페이지를 가려하면 막음
                            props.history.push('/')
                        }
                    }
                }
            })
        }, [])

        return (
            <SpecificComponent />
        )
    }

    return AuthenticationCheck
}