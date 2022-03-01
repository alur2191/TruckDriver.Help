import { useRef, useState } from 'react';

import classes from './password-form.module.css';

function PasswordForm(props) {
    const [message, setMessage] = useState({})
    const oldPasswordRef = useRef();
    const newPasswordRef = useRef();
    const confirmPasswordRef = useRef();

    function submitHandler(event) {
        event.preventDefault();

        const enteredOldPassword = oldPasswordRef.current.value;
        const enteredNewPassword = newPasswordRef.current.value;
        const enteredCofirmPassword = confirmPasswordRef.current.value;
        enteredCofirmPassword !== enteredNewPassword && toggleMessage('red', 'Пароли не совпадают')
        // optional: Add validation

        props.onChangePassword({
            oldPassword: enteredOldPassword,
            newPassword: enteredNewPassword
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

            <div className="form-row">
                <div>
                    <label htmlFor='old-password'>Текущий Пароль</label>
                    <input type='password' id='old-password' ref={oldPasswordRef} />
                </div>
                <div >
                    <label htmlFor='new-password'>Новый Пароль</label>
                    <input type='password' id='new-password' ref={newPasswordRef} />
                </div>
                <div >
                    <label htmlFor='confirm-password'>Подтвердите Пароль</label>
                    <input type='password' id='confirm-password' ref={confirmPasswordRef} />
                </div>
            </div>
            <div className={classes.action}>
                <button>Изменить Пароль</button>
            </div>
        </form>
    );
}

export default PasswordForm;