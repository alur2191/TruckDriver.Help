import React, { useRef, useState } from 'react';
import classes from './subscribe.module.css'
export default function Subscribe() {
    // 1. Create a reference to the input so we can fetch/clear it's value.
    const inputEl = useRef(null);
    // 2. Hold a message in state to handle the response from our API.
    const [message, setMessage] = useState('');

    const subscribe = async (e) => {
        e.preventDefault();

        // 3. Send a request to our API with the user's email address.
        const res = await fetch('/api/newsletter/subscribe', {
            body: JSON.stringify({
                email: inputEl.current.value
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        });

        const { error } = await res.json();

        if (error) {
            // 4. If there was an error, update the message in state.
            setMessage(error);

            return;
        }

        // 5. Clear the input value and show a success message.
        inputEl.current.value = '';
        setMessage('Спасибо за подписку!');
    };

    return (
        <form className={classes.main} onSubmit={subscribe}>

            <div>
                <label style={{ marginLeft: 5 }} htmlFor="email-input">{'Email:'}</label>
                <div>
                    <input

                        id="email-input"
                        name="email"
                        placeholder="ваш@email.com"
                        ref={inputEl}
                        required
                        type="email"
                    />
                    <button type="submit">{'Подписаться'}</button>
                </div>
            </div>
            <div>
                {message
                    ? <span style={{ color: "#38AF2B" }}>{message}</span>
                    : `Мы не рассылаем спам и бережно относимся к Вашим адресам.`}
            </div>

        </form>
    );
}