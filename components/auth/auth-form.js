import { useState, useRef } from 'react';
import { signIn } from 'next-auth/client'
import { useRouter } from 'next/router';
import classes from './auth-form.module.css';
import { useContext } from "react";
import UserContext from '../../store/user-context'

async function createUser(email,password) {
    

    const response = await fetch('/api/auth/signup',{
        method: 'POST',
        body: JSON.stringify({email,password}),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const data = await response.json()

    if(!response.ok) {
        throw new Error(data.message || 'Something went wrong!')
    }

    return data;
}

function AuthForm() {
    const userCtx = useContext(UserContext)
    const emailInputRef = useRef()
    const passwordInputRef = useRef()

    const [isLogin, setIsLogin] = useState(true);
    const router = useRouter()


    function switchAuthModeHandler() {
        setIsLogin((prevState) => !prevState);
    }

    function submitHandler() {
        setIsLogin((prevState) => !prevState)
    }

    async function submitHandler(event) {
        event.preventDefault()

        const enteredEmail = emailInputRef.current.value
        const enteredPassword = passwordInputRef.current.value

        // optional: Add validation

        if(isLogin) {
            const res = await signIn('credentials', {
                redirect:false,
                email: enteredEmail,
                password: enteredPassword    
            })
            
            if (!res.error){
                const user = await fetch(`/api/user/${enteredEmail}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(enteredEmail),
                })
                
                user.json().then(body => userCtx.setUser({
                    ...body
                }));
    
                router.replace('/')
            }
        } else {
            try{
                const res =  await createUser(enteredEmail, enteredPassword)
            }catch(e){
                console.log(e);
            }
        }
    }

    return (
        <div className={classes.auth}>
            <h3>{isLogin ? 'Авторизация' : 'Регистрация'}</h3>
            <form onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor='email'>Почта</label>
                    <input type='email' id='email' required  ref={emailInputRef}/>
                </div>
                <div className={classes.control}>
                    <label htmlFor='password'>Пароль</label>
                    <input type='password' id='password' required ref={passwordInputRef}/>
                </div>
                <div className={classes.actions}>
                    <button>{isLogin ? 'Войти' : 'Регистрация'}</button>
                    <button
                        type='button'
                        className={classes.toggle}
                        onClick={switchAuthModeHandler}
                    >
                        {isLogin ? 'Регистрация' : 'Войти'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AuthForm;