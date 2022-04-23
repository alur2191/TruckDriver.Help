
import classes from './contact.module.css'
import { useRef, useState } from "react";

function Contact() {
    const [category, setCategory] = useState('')
    const nameRef = useRef()
    const emailRef = useRef()
    const messageRef = useRef()

    const [notification, setNotification] = useState({ status: '', message: '' })

    const submit = async (e) => {
        e.preventDefault()
        const name = nameRef.current.value
        const email = emailRef.current.value
        const message = messageRef.current.value
        // Check if email field is empty
        !nameRef && setNotification({ status: 'error', message: 'Введите свое имя.' })
        !emailRef && setNotification({ status: 'error', message: 'Введите email.' })
        !category && setNotification({ status: 'error', message: 'Выберите категорию' })
        !messageRef && setNotification({ status: 'error', message: 'Введите сообщение.' })

        try {
            let body = {
                name,
                email,
                category,
                message
            };
            const contact = await fetch(`/api/contact`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            if (contact.ok) {
                setNotification({ status: 'success', message: 'Сообщение отправлено.' })
                emailRef.current.value = ''
            }
        } catch (error) {
            console.error(error);
        }
    }
    return (

        <form className={classes.main} onSubmit={submit}>
            <h2>Обратная Связь</h2>
            <div>
                <label htmlFor="fullname"><span className="required">*</span>Полное Имя</label>
                <input ref={nameRef} className="input-md" type="text" placeholder="Полное Имя" id="fullname" required />
            </div>
            <div>
                <label htmlFor="email"><span className="required">*</span>Email</label>
                <input ref={emailRef} className="input-md" type="email" placeholder="Email" id="email" required />
            </div>
            <div>
                <label htmlFor="category"><span className="required">*</span>Категория</label>
                <select
                    name="category"
                    id="category"
                    onChange={e => setCategory(e.target.value)}
                    required
                >
                    <option value="" disabled defaultValue>Категория</option>
                    <option>Неполадки</option>
                    <option>Предложение</option>
                    <option>Жалоба</option>
                    <option>Отзыв</option>
                    <option>Сотрудничество</option>
                    <option>Другое</option>
                </select>
            </div>
            <div>
                <label htmlFor="message"><span className="required">*</span>Сообщение</label>
                <textarea ref={messageRef} name="message" id="message" ></textarea>
            </div>
            <button type="submit">Отправить</button>
        </form>
    )
}

export default Contact;