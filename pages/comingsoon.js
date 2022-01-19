import React from "react";
import { useState } from 'react'
import classes from './comingsoon.module.css'
import ReCAPTCHA from "react-google-recaptcha";

function Comingsoon() {
    const [company, setCompany] = useState('')
    const [mcnumber, setMcnumber] = useState('')
    const [usdot, setUsdot] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [position, setPosition] = useState('')

    const submitData = async (e) => {
        
        e.preventDefault()
        if (grecaptcha.getResponse() === '') {
            alert("Please click <I'm not a robot> before sending the job")
        }
        console.log('submitting data');
        try {
            const body = { company,mcnumber,usdot,phone,email,name,position };
            const response = await fetch("/api/user/beta", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            })
            
            console.log(response);
        
        }catch(error) {
            console.error(error);
        }
    };
    return (
        <div className={classes.main}>
            <div className={classes.description}>
                <p>Truckriver.life предоставляем эффективный сервис по размещению вакансий для многих тысяч водителей.Здесь вы можете разместить свои данные - какие траки вы предоставляете, какого года и на какой трансмиссии ,сколько вы платите и метод оплаты - процент с гросса либо с каждой мили! Какие условия для овнеров (собственников траков), и  все ваше рабочее преимущество перед другими компаниями. А также вы сможете разместитесь свои требования для работы в вашей компании - например опыт работы, тип трейлера и эндорсмент, в котором вы нуждайтесь! И только с помощью нашей платформы и фильтров, вы сможете сэкономить много времени, не растрачивая его на  ненужные вопросы и найти правильных людей для вашей компании!</p>
                <p>Запуск бета версии сервиса планируется на конце Января, и на данный момент проводится отбор компаний, которые желают принять участие на нашей платформе в тестовый период. Во время бета тестирования сервис будет предоставлен на бесплатной основе. Компании зарегистрированные до запуска бета версии, получат дополнительный месяц бесплатных услуг после окончания бета тестирования.</p>
                <p>Компания желающая принять участия должна заполнить форму с информацией о себе.. Наша команда рассмотрит заявление для одобрения. Мы свяжемся с вами до запуска веб-приложения, зарегистрируем аккаунт на платформе и отправим инструкцию по размещению объявлений.</p>
            </div>
            <form className={classes.form} onSubmit={submitData}>
                <ReCAPTCHA
                    size="normal"
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                />
                <h3>Компания</h3>
                <div className="form-row">
                    <div>
                        <label htmlFor="name"><span className="required">*</span>Название Компании</label>
                        <input className="input-md" type="text" placeholder="Название Компании" id="name" onChange={(e) =>setCompany(e.target.value)}   required/>
                    </div>
                    <div>
                        <label htmlFor="mc-number"><span className="required">*</span>MC Номер</label>
                        <input className="input-md" type="number" placeholder="########" id="mc-number" onChange={(e) => setMcnumber(e.target.value)}  required/>
                    </div>
                    <div>
                        <label htmlFor="usdot"><span className="required">*</span>USDOT</label>
                        <input className="input-md" type="number" placeholder="########" id="usdot" onChange={(e) => setUsdot(e.target.value)}  required/>
                    </div>
                </div>
                <h3>Контактная Информация</h3>
                <div className="form-row">
                    <div>
                        <label htmlFor="phone"><span className="required">*</span>Телефон</label>
                        <input type="number" placeholder="Телефон" id="phone" onChange={(e) =>setPhone(e.target.value)}   required/>
                    </div>
                    <div>
                        <label htmlFor="email"><span className="required">*</span>Email</label>
                        <input type="email" placeholder="Email" id="email" onChange={(e) =>setEmail(e.target.value)}   required/>
                    </div>
                    <div>
                        <label htmlFor="fullname"><span className="required">*</span>Полное Имя</label>
                        <input type="text" placeholder="Имя" id="fullname" onChange={(e) => setName(e.target.value)} required/>
                    </div>
                    <div>
                        <label htmlFor="position"><span className="required">*</span>Должность</label>
                        <input type="text" placeholder="Должность" id="position" onChange={(e) => setPosition(e.target.value)} required/>
                    </div>
                </div>
                
                <input type="submit" value="Отправить"/>
            </form>
        </div>
    );
}

export default Comingsoon;
