import React, {useState,useContext} from 'react'
import classes from "./form.module.css"
import {useSession, getSession} from 'next-auth/client'
import Router from 'next/router';
import UserContext from '../../store/user-context'

const Form = () => {
    const [name, setName] = useState('')
    const [mcnumber, setMcnumber] = useState('')
    const [usdot, setUsdot] = useState('')
    const [phone, setPhone] = useState('')
    const [site, setSite] = useState('')
    const [deposit, setDeposit] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zip, setZip] = useState('')
    const [dispatch24, setDispatch24] = useState(false)
    const [insurance, setInsurance] = useState(false)
    const [manufacturer, setManufacturer] = useState('')
    const [truckLease, setTruckLease] = useState(false)
    const [yearFrom, setYearFrom] = useState('')
    const [yearTo, setYearTo] = useState('')
    const [transmission, setTransmission] = useState('')
    const [trailerType, setTrailerType] = useState('')
    const [trailerLease, setTrailerLease] = useState(false)
    const [trailerYearFrom, setTrailerYearFrom] = useState('')
    const [trailerYearTo, setTrailerYearTo] = useState('')

    const userCtx = useContext(UserContext)

    const [session] = useSession()
    const activeUser =  userCtx.user;
    const submitData = async (e) => {
        
        e.preventDefault();
        try {
            const email = session.user.email
            const body = { name,mcnumber,usdot,phone,site,deposit,city,state,zip,dispatch24,insurance, manufacturer, truckLease, yearFrom, yearTo, transmission, trailerType, trailerLease, trailerYearFrom, trailerYearTo, email};
            const newCompany = await fetch("/api/company/create", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            })
            
            
            newCompany.json().then(body => userCtx.setCompany({
                ...body.company
            }));
            Router.push('/')
            
        } catch (error) {
            console.error(error);
        }
    };
    
    return(
        <div className="container form">
            <form onSubmit={submitData}>
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
                <div className="form-row">
                    <div>
                        <label htmlFor="phone"><span className="required">*</span>Телефон</label>
                        <input type="text" placeholder="Телефон" id="phone" onChange={(e) =>setPhone(e.target.value)}   required/>
                    </div>
                    <div>
                        <label htmlFor="site"><span className="required"></span>Сайт</label>
                        <input type="text" placeholder="Сайт" id="site" onChange={(e) => setSite(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="deposit"><span className="required"></span>Депозит</label>
                        <input type="number" placeholder="Депозит" id="deposit" onChange={(e) => setDeposit(e.target.value)} />
                    </div>
                </div>
                <h3>Расположение</h3>
                <div className="location">
                    <div className="form-column">
                        <label htmlFor="City"><span className="required">*</span>Город</label>
                        <input className="input-md" type="text" placeholder="Город" id="city" onChange={(e) => setCity(e.target.value)}  required/>
                    </div>
                    <div>
                        <label htmlFor="State"><span className="required">*</span>Штат</label>
                        <select name="state" id="state" onChange={(e) => setState(e.target.value)}  required defaultValue="">
                            <option value="" disabled>
                                Выберите Штат
                            </option>
                            <option value="AL">Alabama</option>
                            <option value="AK">Alaska</option>
                            <option value="AZ">Arizona</option>
                            <option value="AR">Arkansas</option>
                            <option value="CA">California</option>
                            <option value="CO">Colorado</option>
                            <option value="CT">Connecticut</option>
                            <option value="DE">Delaware</option>
                            <option value="FL">Florida</option>
                            <option value="GA">Georgia</option>
                            <option value="HI">Hawaii</option>
                            <option value="ID">Idaho</option>
                            <option value="IL">Illinois</option>
                            <option value="IN">Indiana</option>
                            <option value="IA">Iowa</option>
                            <option value="KS">Kansas</option>
                            <option value="KY">Kentucky</option>
                            <option value="LA">Louisiana</option>
                            <option value="ME">Maine</option>
                            <option value="MD">Maryland</option>
                            <option value="MA">Massachusetts</option>
                            <option value="MI">Michigan</option>
                            <option value="MN">Minnesota</option>
                            <option value="MS">Mississippi</option>
                            <option value="MO">Missouri</option>
                            <option value="MT">Montana</option>
                            <option value="NE">Nebraska</option>
                            <option value="NV">Nevada</option>
                            <option value="NH">New Hampshire</option>
                            <option value="NJ">New Jersey</option>
                            <option value="NM">New Mexico</option>
                            <option value="NY">New York</option>
                            <option value="NC">North Carolina</option>
                            <option value="ND">North Dakota</option>
                            <option value="OH">Ohio</option>
                            <option value="OK">Oklahoma</option>
                            <option value="OR">Oregon</option>
                            <option value="PA">Pennsylvania</option>
                            <option value="RI">Rhode Island</option>
                            <option value="SC">South Carolina</option>
                            <option value="SD">South Dakota</option>
                            <option value="TN">Tennessee</option>
                            <option value="TX">Texas</option>
                            <option value="UT">Utah</option>
                            <option value="VT">Vermont</option>
                            <option value="VA">Virginia</option>
                            <option value="WA">Washington</option>
                            <option value="WV">West Virginia</option>
                            <option value="WI">Wisconsin</option>
                            <option value="WY">Wyoming</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="zipcode"><span className="required">*</span>Индекс</label>
                        <input className="input-md" type="number" placeholder="#####" id="zipcode" onChange={(e) => setZip(e.target.value)}  required/>
                    </div>
                </div>
                
                <h3>Данные о Траках</h3>
                <div className={classes.truckRow}>
                    <div>
                        <div>
                            <label htmlFor="truck"><span className="required">*</span>Производитель</label>
                            <select name="truck" id="truck" onChange={(e) => setManufacturer(e.target.value)} required defaultValue="">
                                <option value="" disabled>
                                    Производитель
                                </option>
                                <option value="Volvo">Volvo</option>
                                <option value="Freightliner">Freightliner</option>
                                <option value="Kentworth">Kentworth</option>
                                <option value="Peterbilt">Peterbilt</option>
                                <option value="Western">Western Star</option>
                            </select>
                        </div>
                        <div>
                            <label>Аренда</label>
                            <div>
                                <div>
                                    <input  type="radio" id="truckLease-no" name="truckLease" onChange={(e) => setTruckLease(false)}  checked/>
                                    <label htmlFor="truckLease-no">Нет</label>
                                </div>
                                <div>
                                    <input  type="radio" id="truckLease-yes" name="truckLease" onChange={(e) => setTruckLease(true)} />
                                    <label htmlFor="truckLease-yes">Да</label>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="truckYear"><span className="required">*</span>Годы (От-До)</label>
                            <div className="align-center">
                                <input className="full-width" type="number" placeholder="####" id="truckYearFrom" onChange={(e) => setYearFrom(e.target.value)}/> - 
                                <input className="full-width" type="number" placeholder="####" id="truckYearTo" onChange={(e) => setYearTo(e.target.value)}/>
                            </div>
                        </div>
                        <div className="form-row">
                            <label>Трансмиссия</label>
                            <div className={classes.transmission}>
                                <div>
                                    <input type="checkbox" id="TransmissionAuto" name="endorsement" value="TransmissionAuto"/>
                                    <label htmlFor="TransmissionAuto">Авто.</label>
                                </div>
                                <div>
                                    <input type="checkbox" id="TransmissionManual" name="endorsement" value="TransmissionManual"/>
                                    <label htmlFor="TransmissionManual">Механ.</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button className="add-additional">+ Добавить Еще Одного Производителя</button>
                    </div>
                </div>
                <h3>Данные о Трейлерах</h3>
                <div className={classes.trailerRow}>
                    <div>
                        <div>
                            <label htmlFor="trailer"><span className="required">*</span>Тип Трейлера</label>
                            <select name="trailer" id="trailer" onChange={(e) => setTrailerType(e.target.value)} required defaultValue="">
                                <option value="" disabled>
                                    Тип Трейлера
                                </option>
                                <option value="Dry">Dry Van</option>
                                <option value="Reefer">Reefer</option>
                                <option value="Flatbed">Flatbed</option>
                                <option value="Step Deck">Step Deck</option>
                                <option value="SD (Conestoga)">SD (Conestoga)</option>
                                <option value="Lowboy">Lowboy</option>
                                <option value="Car Hauler"> Car Hauler</option>
                            </select>
                        </div>
                        <div>
                            <label>Аренда</label>
                            <div>
                                <div>
                                    <input  type="radio" id="trailerLease-no" name="trailerLease" onChange={(e) => setTrailerLease(false)}  checked/>
                                    <label htmlFor="trailerLease-no">Нет</label>
                                </div>
                                <div>
                                    <input  type="radio" id="trailerLease-yes" name="trailerLease" onChange={(e) => setTrailerLease(true)} />
                                    <label htmlFor="trailerLease-yes">Да</label>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="trailerYear"><span className="required">*</span>Годы (От-До)</label>
                            <div className="align-center">
                                <input className="full-width" type="number" placeholder="####" id="trailerYearFrom" onChange={(e) => setTrailerYearFrom(e.target.value)}/> - 
                                <input className="full-width" type="number" placeholder="####" id="trailerYearTo" onChange={(e) => setTrailerYearTo(e.target.value)}/>
                            </div>
                        </div>
                        
                    </div>
                    <div>
                        <button className="add-additional">+ Добавить Еще Один Тип</button>
                    </div>
                </div>
                <h3>Дополнительная Информация</h3>
                <div className={classes.additionalInfo}>
                    <div>
                        <label>24/7 Диспетчер</label>
                        <div>
                            <div>
                                <input  type="radio" id="dispatch-no" name="dispatch" onChange={(e) => setDispatch24(false)}  checked/>
                                <label htmlFor="dispatch-no">Нет</label>
                            </div>
                            <div>
                                <input  type="radio" id="dispatch-yes" name="dispatch" onChange={(e) => setDispatch24(true)} />
                                <label htmlFor="dispatch-yes">Да</label>
                            </div>
                        </div>
                    </div>
                    <div className="form-column">
                        <label>Лог бук</label>
                        <div>
                            <div>
                                <input type="checkbox" id="logbookEld" name="logbook" value="logbookEld"/>
                                <label htmlFor="logbookEld">ELD</label>                        </div>
                            <div>
                                <input type="checkbox" id="logbookGlider" name="logbook" value="logbookGlider"/>
                                <label htmlFor="logbookGlider">Glider Kit</label>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label>Рабочая Страховка</label>
                        <div>
                            <div>
                                <input type="radio" id="insuranceNo" name="insurance" onChange={()=>setInsurance(false)} checked/>
                                <label htmlFor="inustranceNo">Нет</label>
                            </div>
                            <div>
                                <input type="radio" id="insuranceYes" name="insurance" onChange={()=>setInsurance(true)}  />
                                <label htmlFor="insuranceYes">Да</label>
                            </div>
                        </div>
                    </div>
                </div>
                <input type="submit" value="Разместить"/>
            </form>
        </div>
    )
}

export default Form;


export async function getServerSideProps(context) {
    const session = await getSession({ req: context.req });

    if (!session) {
    return {
        redirect: {
        destination: '/auth',
        permanent: false,
        },
    };
    }

    return {
    props: { session },
    };
}