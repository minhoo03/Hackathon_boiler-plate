import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { registerUser } from '../../../_actions/user_action'

function RegisterPage(props) {

    const dispatch = useDispatch()

    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")
    

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onNameHandler = (event) => {  
        setName(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {  
        setPassword(event.currentTarget.value)
    }

    const onConfirmPasswordHandler = (event) => {  
        setConfirmPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault()

        if(password !== ConfirmPassword) {
            return alert('비밀번호와 비밀번호 확인은 같아야 합니다!')
        }

        let body = {
            email,
            password,
            name
        }

        // component에서 Action으로 보내는 과정 DISPATCH
        dispatch(registerUser(body)).then(res => {
            if(res.payload.success) {
                // App.js {component} 의 전 페이지로 이동
                props.history.push('/login')
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

                <label>Name</label>
                <input type="text" value={name} onChange={onNameHandler} />

                <label>Password</label>
                <input type="password" value={password} onChange={onPasswordHandler} />

                <label>Confirm Password</label>
                <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />
                <br />
                <button>
                    Sign up
                </button>
            </form>
        </div>
    )
}

export default RegisterPage