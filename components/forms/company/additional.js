import React, { useContext } from 'react'
import CompanyContext from '../../../store/company-context'
import classes from "./additional.module.css"

function Additional() {
    const companyCtx = useContext(CompanyContext)
    const { additional, setAdditional } = companyCtx
    console.log(additional);
    // handle input change
    const handleInputChange = (e, bool) => {
        const { name, value, type } = e.target;
        const list = { ...additional }
        // if type = radio, set true or false
        // if type = number, parse as integer
        // otherwise pass the value as is
        type === "radio" ? !bool ?
            list[name] = false :
            list[name] = true :
            type === "number" ?
                list[name] = parseInt(value) :
                list[name] = value
        setAdditional(list)
    };
    return (
        <div className={classes.additionalInfo}>
            <div>
                <label>24/7 Диспетчер</label>
                <div>
                    <div>
                        <input type="radio" id="dispatch-no" name="dispatch24" checked={additional.dispatch24 === false} onChange={e => handleInputChange(e, false)} />
                        <label htmlFor="dispatch-no">Нет</label>
                    </div>
                    <div>
                        <input type="radio" id="dispatch-yes" name="dispatch24" checked={additional.dispatch24 === true} onChange={e => handleInputChange(e, true)} />
                        <label htmlFor="dispatch-yes">Да</label>
                    </div>
                </div>
            </div>
            <div>
                <label>Рабочая Страховка</label>
                <div>
                    <div>
                        <input type="radio" id="insuranceNo" name="insurance" checked={additional.insurance === false} onChange={e => handleInputChange(e, false)} />
                        <label htmlFor="insuranceNo">Нет</label>
                    </div>
                    <div>
                        <input type="radio" id="insuranceYes" name="insurance" checked={additional.insurance === true} onChange={e => handleInputChange(e, true)} />
                        <label htmlFor="insuranceYes">Да</label>
                    </div>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label htmlFor="deposit"><span className="required"></span>Депозит</label>
                <div style={{ display: 'flex', gap: 0, alignItems: 'center' }}><input className="shortNumber" type="number" placeholder="####" name="deposit" id="deposit" onChange={e => handleInputChange(e)} /><span>$</span></div>
            </div>
        </div>
    )
}

export default Additional;