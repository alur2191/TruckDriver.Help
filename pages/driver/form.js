import classes from "./form.module.css"

function DriverForm() {
    return(
        <div className="form" >
            <form action="">
                <h3>Персональные Данные</h3>
                <div className="form-row">
                    <div>
                        <label htmlFor="firstname"><span className="required">*</span>Имя</label>
                        <input className="input-md" type="text" placeholder="Имя" id="firstname" required/>
                    </div>
                    <div>
                        <label htmlFor="lastname"><span className="required">*</span>Фамилия</label>
                        <input className="input-md" type="text" placeholder="Фамилия" id="lastname" required/>
                    </div>
                </div>
                <div className="form-row" style={{display:'grid', gridTemplateColumns: '1fr 1fr', formColumnGap: 80}}>
                    <div>
                        <label><span className="required">*</span>Пол</label>
                        <div className="radioRow">
                            <div>
                                <input  type="radio" id="male" name="gender" checked required/>
                                <label htmlFor="male">Мужской</label>
                            </div>
                            <div>
                                <input  type="radio" id="female" name="gender" required/>
                                <label htmlFor="female">Женский</label>
                            </div>
                        </div>
                    </div>
                    <div className={classes.dob} >
                        <div>
                            <label htmlFor="dob"><span className="required">*</span>Дата Рождения</label>
                            <input type="date" placeholder="День Рождения" id="dob" required/>
                        </div>
                    </div>
                </div>
                <h3>Место Жительства</h3>
                <div className="location">
                    <div className="form-column">
                        <label htmlFor="City"><span className="required">*</span>Город</label>
                        <input className="input-md" type="text" placeholder="Город" id="city" required/>
                    </div>
                    <div>
                        <label htmlFor="State"><span className="required">*</span>Штат</label>
                        <select name="state" place id="state" required>
                            <option value="" disabled selected>Выберите штат</option>
                            <option>AL</option>
                            <option>AK</option>
                            <option>AZ</option>
                            <option>AR</option>
                            <option>CA</option>
                            <option>CZ</option>
                            <option>CO</option>
                            <option>CT</option>
                            <option>DE</option>
                            <option>DC</option>
                            <option>FL</option>
                            <option>GA</option>
                            <option>GU</option>
                            <option>HI</option>
                            <option>ID</option>
                            <option>IL</option>
                            <option>IN</option>
                            <option>IA</option>
                            <option>KS</option>
                            <option>KY</option>
                            <option>LA</option>
                            <option>ME</option>
                            <option>MD</option>
                            <option>MA</option>
                            <option>MI</option>
                            <option>MN</option>
                            <option>MS</option>
                            <option>MO</option>
                            <option>MT</option>
                            <option>NE</option>
                            <option>NV</option>
                            <option>NH</option>
                            <option>NJ</option>
                            <option>NM</option>
                            <option>NY</option>
                            <option>NC</option>
                            <option>ND</option>
                            <option>OH</option>
                            <option>OK</option>
                            <option>OR</option>
                            <option>PA</option>
                            <option>PR</option>
                            <option>RI</option>
                            <option>SC</option>
                            <option>SD</option>
                            <option>TN</option>
                            <option>TX</option>
                            <option>UT</option>
                            <option>VT</option>
                            <option>VI</option>
                            <option>VA</option>
                            <option>WA</option>
                            <option>WV</option>
                            <option>WI</option>
                            <option>WY</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="zipcode"><span className="required">*</span>Индекс</label>
                        <input className="input-md" type="number" placeholder="#####" id="zipcode" maxLength="5" required/>
                    </div>
                </div>
                <h3>Контактная Информация</h3>
                <div className="form-row">
                    <div>
                        <label htmlFor="phone"><span className="required">*</span>Основной Телефон</label>
                        <input  className="phone" type="number" placeholder="Основной Телефон" id="phone" required/>
                    </div>
                    <div>
                        <label htmlFor="phone2">Доп. Телефон</label>
                        <input className="phone" type="number" placeholder="Доп. Телефон" id="phone2"/>
                    </div>
                </div>
                <input type="submit" value="Отправить"/>
            </form>
        </div>
    )
}


export default DriverForm;