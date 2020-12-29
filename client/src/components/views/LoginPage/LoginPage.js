import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../../_actions/user_action'

function LoginPage(props) {
    const dispatch = useDispatch()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {  
        setPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault()

        let body = {
            email,
            password
        }

        // component에서 Action으로 보내는 과정 DISPATCH
        dispatch(loginUser(body)).then(res => {
            if(res.payload.loginSuccess) {
                // App.js {component} 의 전 페이지로 이동
                props.history.push('/')
            } else {
                alert('error')
            }
        })
    }

    return(
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: "100%", height: "100vh"}}>
            <form style={{display: 'flex', flexDirection: 'column'}} onSubmit={onSubmitHandler}>
                <label>Email</label>
                <input type="email" value={email} onChange={onEmailHandler} />

                <label>Password</label>
                <input type="password" value={password} onChange={onPasswordHandler} />
                <br />
                <button>
                    Login
                </button>
            </form>
        </div>
    )
}

export default LoginPage