import React, { useContext } from 'react'
import CompanyContext from '../../../store/company-context'
import classes from "./trucks.module.css"

function TrucksForm() {
    const companyCtx = useContext(CompanyContext)
    const { truck, setTruck } = companyCtx

    // handle input change
    const handleInputChange = (e, index) => {
        const { name, value, type } = e.target;
        const list = [...truck];
        if (value === '') {
            list[index][name] = null
        } else {
            type === "checkbox" ? list[index][name] = !list[index][name] : type === "number" ? list[index][name] = parseInt(value) : list[index][name] = value
        }
        if (name === "year" && list[index].year == NaN) {
            list[index].year = null
        }
        setTruck(list);
    };

    // handle click event of the Remove button
    const handleRemoveClick = index => {
        const list = [...truck];
        list.splice(index, 1);
        setTruck(list);
    };

    // handle click event of the Add button
    const handleAddClick = () => {
        setTruck([...truck, { manufacturer: null, lease: false, year: null, transAuto: false, transMan: false }]);
    };

    return (
        <div className={classes.main}>
            <p style={{ margin: 0, marginBottom: 5 }}>Укажите траки, имеющиеся в компании. Если в вашей компании имеются траки одинакового года, достаточно лишь один раз добавить модель и год трака. Например: Если в вашей компании 8 траков Volvo, 2021 года, вы должны указать это всего лишь один раз. </p>
            {truck.map((x, i) => {
                return (
                    <div key={i} className={classes.truckRow} >
                        <div style={{ backgroundColor: i % 2 !== 0 ? "#f7f7fc" : null }}>
                            <div>
                                <label htmlFor={"manufacturer" + i}>Производитель</label>
                                <select name="manufacturer" id={"manufacturer" + i} value={x.manufacturer || ''} onChange={e => handleInputChange(e, i)} >
                                    <option value="">
                                    </option>
                                    <option value="Volvo">Volvo</option>
                                    <option value="Freightliner">Freightliner</option>
                                    <option value="Kenworth">Kenworth</option>
                                    <option value="Peterbilt">Peterbilt</option>
                                    <option value="Western">Western Star</option>
                                </select>
                            </div>
                            <div className="form-row">
                                <label>Аренда</label>
                                <div>
                                    <div>
                                        <input type="checkbox" id={"truckLease" + i} name="lease" checked={x.lease} onChange={e => handleInputChange(e, i)} />
                                        <label htmlFor={"truckLease" + i}>Сдается</label>
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <label htmlFor={"year" + i}>Год</label>
                                <div >
                                    <input className="year shortNumber" type="number" placeholder="####" name="year" value={x.year || ''} id={"year" + i} onChange={(e) => handleInputChange(e, i)} />
                                </div>
                            </div>
                            <div>
                                <label>Трансмиссия</label>
                                <div className={classes.transmission}>
                                    <div>
                                        <input type="checkbox" id={"transAuto" + i} name="transAuto" checked={x.transAuto} onChange={e => handleInputChange(e, i)} />
                                        <label htmlFor={"transAuto" + i}>Авто.</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" id={"transMan" + i} name="transMan" checked={x.transMan} onChange={e => handleInputChange(e, i)} />
                                        <label htmlFor={"transMan" + i}>Механ.</label>
                                    </div>
                                </div>
                            </div>
                            {truck.length === 1 ? null : <div className="btn-remove">
                                {truck.length !== 1 && <i onClick={() => handleRemoveClick(i)} className="btn-remove bi bi-dash-circle-fill"></i>}

                            </div>}

                        </div>

                    </div>
                );
            })}
            {<div style={{ display: 'flex', justifyContent: 'center' }}><button style={{ backgroundColor: '#3c774e' }} type="button" onClick={handleAddClick}>Добавить Трак</button></div>}
        </div>
    )
}

export default TrucksForm;