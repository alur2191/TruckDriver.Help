import { useRef, useState } from 'react';

import classes from './email-form.module.css';

function EmailForm(props) {
    const [message, setMessage] = useState({})
    const emailRef = useRef();
    const passwordRef = useRef();

    function submitHandler(event) {
        event.preventDefault();

        const userPassword = passwordRef.current.value;
        const email = emailRef.current.value;

        // optional: Add validation

        props.onChangeEmail({
            password: userPassword,
            email
        });
    }

    const toggleMessage = (type, message) => {
        setMessage({ type: type, message: message })
        setTimeout(() => {
            setMessage({})
        }, 10000)
    }

    return (
        <form className={classes.main} onSubmit={submitHandler}>
            <span className={!message.message && 'hidden'} style={{ color: message.type }}>{message.message}</span>
            <div className='form-row'>
                <div>
                    <label htmlFor='email'>Новый Email</label>
                    <input type='email' id='email' ref={emailRef} />
                </div>
                <div >
                    <label htmlFor='password'>Пароль</label>
                    <input type='password' id='password' ref={passwordRef} />
                </div>
            </div>

            <div>
                <button>Изменить Email</button>
            </div>
        </form>
    );
}

export default EmailForm;