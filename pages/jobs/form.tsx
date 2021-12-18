import React, {useState,useContext} from 'react'
import Router from 'next/router';
import classes from "./form.module.css"
import UserContext from '../../store/user-context'

function JobForm() {
    const [truck, setTruck] = useState(false)
    const [type, setType] = useState('')
    const [pay, setPay] = useState('')
    const [driverGross, setDriverGross] = useState('')
    const [ownerGross, setOwnerGross] = useState('')

    const userCtx = useContext(UserContext)
    const activeUser =  userCtx.user;

    const submitData = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            const email = activeUser.user.email
            const companyId = activeUser.user.company.id
            const body = { truck,type,pay,companyId,email,driverGross,ownerGross};
            await fetch("/api/jobs/create", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
            await Router.push('/');
        } catch (error) {
            console.error(error);
        }
    };

    const selectType = (e) => {
        setType(e.target.value)
    }
    return(
        <div className="container form">
        <form onSubmit={submitData}>
            <h3>Разместить Объявление</h3>
            <div className="form-row">
                <div>
                    <label>Тип Водителя</label>
                    <div className={classes.driver}>
                        <div>
                            <input  type="radio" id="truck-driver" name="truck" onChange={(e) => setTruck(false)} checked/>
                            <label htmlFor="truck-driver">Без Трака</label>
                        </div>
                        <div>
                            <input  type="radio" id="truck-owner" name="truck" onChange={(e) => setTruck(true)}/>
                            <label htmlFor="truck-owner">С Траком (Owner)</label>
                        </div>
                    </div>
                </div>
                
                <div className={classes.type}>  
                    <label htmlFor="type"><span className="required">*</span>Тип Работы</label>
                    <select name="type" id="type" onChange={selectType} required defaultValue="">
                        <option value="" disabled>Трейлер</option>
                        <option value="Dry Van">Dry Van</option>
                        <option value="Reefer">Reefer</option>
                        <option value="Flatbed">Flatbed</option>
                        <option value="Step Deck">Step Deck</option>
                        <option value="Step Deck (Conestoga)">Step Deck (Conestoga)</option>
                        <option value="Lowboy">Lowboy</option>
                        <option value="Car Hauler">Car Hauler</option>
                    </select>
                </div>
                <div className={classes.pay}>
                    <label htmlFor="pay"><span className="required">*</span>Центов За Милю</label>
                    <div className="align-center">$0.<input className="input-md" type="text" placeholder="##" id="pay" name="pay" onChange={(e) =>setPay(e.target.value)}/></div>
                </div>
            </div>
            <div className="form-row">
                    <div>
                        <label htmlFor="grossPay"><span className="required">*</span>Оплата(Gross)</label>
                        <input className="input-md" type="number" placeholder="Оплата(Gross)" id="grossPay" onChange={(e) =>setDriverGross(e.target.value)} />%
                    </div>
                    <div>
                        <label htmlFor="owner-gross-pay"><span className="required">*</span>Оплата(Gross)</label>
                        <input className="input-md" type="number" placeholder="Оплата(Gross)" id="owner-gross-pay" onChange={(e) =>setOwnerGross(e.target.value)}/>%
                    </div>
                </div>
            <input type="submit" value="Отправить"/>
        </form>
    </div>
    )
}

export default JobForm;
