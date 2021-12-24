import classes from './comingsoon.module.css'

function Comingsoon() {

    return (
        <div className={classes.main}>
            <div className={classes.description}>
                <p>Truckdriver.life Платформа для поиска работы в траковых компаниях, на условиях,при которых выбор делаете вы, и, так же где Траковые компании могут найти водителей.</p>
                <p>Мы проводим отбор компаний интересующихся принять участие в бета тестировании.  На протяжении всего периода бета тестирования сервис будет предоставлен бесплатно. Компании которые будут одобрены до запуска получат бесплатный сервис на месяц после окончания периода бета тестирования.</p>
                <p>Компания желающая принять участия должна заполнить форму с информацией о компании. Наша команда рассмотрит заявление для одобрения. Мы свяжемся с вами до запуска веб-приложения, зарегистрируем аккаунт на платформе и отправим инструкцию по размещению объявлений.</p>
            </div>
            <form className={classes.form}>
                <h3>Компания</h3>
                <div className="form-row">
                    <div>
                        <label htmlFor="name"><span className="required">*</span>Название Компании</label>
                        <input className="input-md" type="text" placeholder="Название Компании" id="name" onChange={(e) =>setName(e.target.value)}   required/>
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
                        <input type="text" placeholder="Телефон" id="phone" onChange={(e) =>setPhone(e.target.value)}   required/>
                    </div>
                    <div>
                        <label htmlFor="email"><span className="required">*</span>Email</label>
                        <input type="text" placeholder="Email" id="email" onChange={(e) =>setPhone(e.target.value)}   required/>
                    </div>
                    <div>
                        <label htmlFor="fullname"><span className="required">*</span>Полное Имя</label>
                        <input type="text" placeholder="Имя" id="fullname" onChange={(e) => setSite(e.target.value)} required/>
                    </div>
                    <div>
                        <label htmlFor="position"><span className="required">*</span>Должность</label>
                        <input type="number" placeholder="Должность" id="position" onChange={(e) => setDeposit(e.target.value)} required/>
                    </div>
                </div>
                
                <input type="submit" value="Разместить"/>
            </form>
        </div>
    );
}

export default Comingsoon;
