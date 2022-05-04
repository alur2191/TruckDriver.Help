import { useRef, useState } from 'react';
import classes from './password-reset.module.css';
import { useRouter } from 'next/router';

function PasswordForm({ token, email }) {
    const [message, setMessage] = useState({})
    const newPasswordRef = useRef();
    const confirmPasswordRef = useRef();
    const router = useRouter()

    async function changePasswordHandler(passwordData) {
        const response = await fetch('/api/auth/reset', {
            method: 'PATCH',
            body: JSON.stringify(passwordData),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json().then(() => response.status === 201 && router.replace('/'))
    }

    function submitHandler(event) {
        event.preventDefault();

        const enteredNewPassword = newPasswordRef.current.value;
        const enteredCofirmPassword = confirmPasswordRef.current.value;

        if (enteredCofirmPassword === enteredNewPassword) {
            changePasswordHandler({
                password: enteredNewPassword,
                token,
                email
            });

        } else {
            toggleMessage('red', 'Пароли не совпадают')
        }


    }

    const toggleMessage = (type, message) => {
        setMessage({ type: type, message: message })
        setTimeout(() => {
            setMessage({})
        }, 10000)
    }

    return (
        <form className={classes.main} onSubmit={submitHandler}>
            <h3>Востановить пароль</h3>
            {message.message && <span style={{ color: message.type }}>{message.message}</span>}
            <div className="form-row">
                <div >
                    <label htmlFor='new-password'>Новый Пароль</label>
                    <input type='password' id='new-password' ref={newPasswordRef} />
                </div>
                <div >
                    <label htmlFor='confirm-password'>Подтвердите Пароль</label>
                    <input type='password' id='confirm-password' ref={confirmPasswordRef} />
                </div>
            </div>
            <div >
                <button>Изменить Пароль</button>
            </div>
        </form>
    );
}

export default PasswordForm;