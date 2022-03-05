import React, { useContext } from "react";
import CompanyContext from "../../../store/company-context";
import classes from "./about.module.css";
import Tooltip from "../../ui/tooltip"
function About() {


    const companyCtx = useContext(CompanyContext);

    const { about, setAbout, validation, setValidation } = companyCtx;

    // handle input change
    const handleInputChange = (e) => {
        const { name, value, type } = e.target;
        const handle = () => {
            const list = { ...about };
            type === "number" ? (list[name] = parseInt(value)) : (list[name] = value);
            setAbout(list);
        }

        switch (name) {
            case "mcnumber":
                if (value.length > 8) {
                    return null
                } else {
                    handle()
                }
                break;
            case "usdot":
                if (value.length > 8) {
                    return null
                } else {
                    handle()
                }
                break;
            case "phone":
                if (value.length > 10) {
                    return null
                } else {
                    handle()
                }
                break;
            case "zip":
                if (value.length > 5) {
                    return null
                } else {
                    handle()
                }
                break;
            default:
                handle()
                break;
        }


    };
    const showError = (error) => {
        setTimeout(() => {
            setValidation({})
        }, 10000)
        return <span style={{ color: 'red' }}>{validation[error].message}</span>
    }
    return (
        <div className={classes.main}>
            <p style={{ margin: "0 0 15px 0" }}>Поля помеченные красной звездой (<span style={{ color: 'red' }}>*</span>) обязательны для заполнения.</p>
            <div className='form-row'>
                <div>
                    <label htmlFor='name'>
                        <span className='required'>*</span>Название Компании
                    </label>
                    <input
                        className='input-md'
                        type='text'
                        placeholder='Название Компании'
                        value={about.name || ""}
                        id='name'
                        name="name"
                        onChange={(e) => handleInputChange(e)}
                        required
                    />
                    {validation.name && showError("name")}
                </div>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', position: 'relative', width: '100%', gap: 3 }}>
                        <Tooltip content="Номер MC (Motor Carrier number) является уникальным идентификатором выдающимся компаниям гос. органом FMCSA." direction="top">
                            <i className="bi bi-question-circle-fill tooltip-icon"></i>
                        </Tooltip>
                        <label htmlFor='mcnumber'>MC Номер</label>
                    </div>
                    <input
                        className='input-md'
                        type='number'
                        placeholder='######'
                        name='mcnumber'
                        id='mcnumber'
                        value={about.mcnumber || ""}
                        onChange={(e) => handleInputChange(e)}
                    />
                    {validation.mcnumber && showError("mcnumber")}
                </div>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', position: 'relative', width: '100%', gap: 3 }}>
                        <Tooltip content="Номер USDOT служит уникальным идентификатором при сборе и мониторинге информации о безопасности компании, полученной в ходе аудитов, проверок соответствия, расследований аварий и проверок." direction="top">
                            <i className="bi bi-question-circle-fill tooltip-icon"></i>
                        </Tooltip>
                        <label htmlFor='usdot'>USDOT</label>
                    </div>
                    <input
                        className='input-md'
                        type='number'
                        placeholder='########'
                        name='usdot'
                        id='usdot'
                        value={about.usdot || ""}
                        onChange={(e) => handleInputChange(e)}
                    />
                    {validation.usdot && showError("usdot")}
                </div>
            </div>
            <div className='form-row'>
                <div>
                    <label htmlFor='phone'>
                        <span className='required'>*</span>Телефон
                    </label>
                    <input
                        type='number'
                        placeholder='Телефон'
                        name='phone'
                        id='phone'
                        value={about.phone || ""}
                        onChange={(e) => handleInputChange(e)}
                        required
                    />
                    {validation.phone && showError("phone")}
                </div>
                <div>
                    <label htmlFor='site'>
                        <span className='required'></span>Сайт
                    </label>
                    <input
                        type='text'
                        placeholder='Сайт'
                        name='website'
                        id='site'
                        value={about.website || ""}
                        onChange={(e) => handleInputChange(e)}
                    />
                    {validation.website && showError("website")}
                </div>
            </div>
            <h3>Расположение</h3>
            <div className='location'>
                <div className='form-column'>
                    <label htmlFor='city'>
                        <span className='required'>*</span>Город
                    </label>
                    <input
                        className='input-md'
                        type='text'
                        placeholder='Город'
                        name='city'
                        id='city'
                        value={about.city || ""}
                        onChange={(e) => handleInputChange(e)}
                        required
                    />
                    {validation.city && showError("city")}
                </div>
                <div>
                    <label htmlFor='state'>
                        <span className='required'>*</span>Штат
                    </label>
                    <select
                        name='state'
                        id='state'
                        value={about.state || ""}
                        onChange={(e) => handleInputChange(e)}
                        required
                    >
                        <option value='' disabled>
                            Выберите Штат
                        </option>
                        <option value='AL'>Alabama</option>
                        <option value='AK'>Alaska</option>
                        <option value='AZ'>Arizona</option>
                        <option value='AR'>Arkansas</option>
                        <option value='CA'>California</option>
                        <option value='CO'>Colorado</option>
                        <option value='CT'>Connecticut</option>
                        <option value='DE'>Delaware</option>
                        <option value='FL'>Florida</option>
                        <option value='GA'>Georgia</option>
                        <option value='HI'>Hawaii</option>
                        <option value='ID'>Idaho</option>
                        <option value='IL'>Illinois</option>
                        <option value='IN'>Indiana</option>
                        <option value='IA'>Iowa</option>
                        <option value='KS'>Kansas</option>
                        <option value='KY'>Kentucky</option>
                        <option value='LA'>Louisiana</option>
                        <option value='ME'>Maine</option>
                        <option value='MD'>Maryland</option>
                        <option value='MA'>Massachusetts</option>
                        <option value='MI'>Michigan</option>
                        <option value='MN'>Minnesota</option>
                        <option value='MS'>Mississippi</option>
                        <option value='MO'>Missouri</option>
                        <option value='MT'>Montana</option>
                        <option value='NE'>Nebraska</option>
                        <option value='NV'>Nevada</option>
                        <option value='NH'>New Hampshire</option>
                        <option value='NJ'>New Jersey</option>
                        <option value='NM'>New Mexico</option>
                        <option value='NY'>New York</option>
                        <option value='NC'>North Carolina</option>
                        <option value='ND'>North Dakota</option>
                        <option value='OH'>Ohio</option>
                        <option value='OK'>Oklahoma</option>
                        <option value='OR'>Oregon</option>
                        <option value='PA'>Pennsylvania</option>
                        <option value='RI'>Rhode Island</option>
                        <option value='SC'>South Carolina</option>
                        <option value='SD'>South Dakota</option>
                        <option value='TN'>Tennessee</option>
                        <option value='TX'>Texas</option>
                        <option value='UT'>Utah</option>
                        <option value='VT'>Vermont</option>
                        <option value='VA'>Virginia</option>
                        <option value='WA'>Washington</option>
                        <option value='WV'>West Virginia</option>
                        <option value='WI'>Wisconsin</option>
                        <option value='WY'>Wyoming</option>
                    </select>
                    {validation.state && showError("state")}
                </div>
                <div>
                    <label htmlFor='zip'>
                        <span className='required'>*</span>Индекс
                    </label>
                    <input
                        className='input-md'
                        type='number'
                        placeholder='#####'
                        name='zip'
                        id='zip'
                        value={about.zip || ""}
                        onChange={(e) => handleInputChange(e)}
                        required
                    />
                    {validation.zip && showError("zip")}
                </div>
            </div>
        </div>
    );
}

export default About;
