import React, { useState, useContext } from 'react'
import CompanyContext from '../../../store/company-context'
import classes from "./trailers.module.css"

function Trailers() {
    const companyCtx = useContext(CompanyContext)
    console.log(companyCtx.trailer);
    const { trailer, setTrailer } = companyCtx

    // handle input change
    const handleInputChange = (e, index) => {
        const { name, value, type } = e.target;
        const list = [...trailer];
        if (value === '') {
            list[index][name] = null
        } else {
            type === "checkbox" ? list[index][name] = !list[index][name] : type === "number" ? list[index][name] = parseInt(value) : list[index][name] = value
        }
        setTrailer(list);
        console.log(trailer);
    };

    // handle click event of the Remove button
    const handleRemoveClick = index => {
        const list = [...trailer];
        list.splice(index, 1);
        setTrailer(list);
    };

    // handle click event of the Add button
    const handleAddClick = () => {
        setTrailer([...trailer, { type: null, lease: false, year: null }]);
    };

    return (
        <div className={classes.main}>
            {trailer.map((x, i) => {
                return (
                    <div key={i} className={classes.trailerRow} >
                        <p style={{ margin: 0, marginBottom: 5 }}>Укажите трейлеры имеющиеся в компании. Если в вашей компании имеются трейлеры одинакового года, достаточно лишь один раз добавить тип и год трейлера.</p>
                        <div style={{ backgroundColor: i % 2 !== 0 ? "#f7f7fc" : null }}>
                            <div>
                                <label htmlFor={"trailer" + i}>Тип Трейлера</label>
                                <select id={"trailer" + i} name="type" value={x.type || ''} onChange={e => handleInputChange(e, i)}>
                                    <option value="" >
                                    </option>
                                    <option value="Dry">Dry Van</option>
                                    <option value="Reefer">Reefer</option>
                                    <option value="Flatbed">Flatbed</option>
                                    <option value="Step Deck">Step Deck</option>
                                    <option value="Lowboy">Lowboy</option>
                                    <option value="Car Hauler"> Car Hauler</option>
                                </select>
                            </div>
                            <div className="form-row">
                                <label>Аренда</label>
                                <div>
                                    <div>
                                        <input type="checkbox" id={"trailerLease" + i} name="lease" checked={x.lease} onChange={e => handleInputChange(e, i)} />
                                        <label htmlFor={"trailerLease" + i}>Сдается</label>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label htmlFor={"year" + i}>Год</label>
                                <div className="align-center">
                                    <input className="year shortNumber" type="number" placeholder="####" name="year" value={x.year || ''} id={"year" + i} onChange={(e) => handleInputChange(e, i)} />
                                </div>
                            </div>
                            {trailer.length === 1 ? null :
                                <div className="btn-remove">
                                    {trailer.length !== 1 && <i onClick={() => handleRemoveClick(i)} className="btn-remove bi bi-dash-circle-fill"></i>}
                                </div>}
                        </div>
                        {trailer.length - 1 === i && <button style={{ backgroundColor: '#3c774e' }} onClick={handleAddClick}>Добавить Трейлер</button>}
                    </div>
                );
            })}
        </div>
    )
}

export default Trailers;