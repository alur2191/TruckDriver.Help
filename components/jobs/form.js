import classes from './form.module.css';
import JobContext from "../../store/job-context";
import { useContext, useRef } from 'react';

function Form() {
    const jobCtx = useContext(JobContext);
    const {
        job,
        setJob,
        driver,
        setDriver,
        owner,
        setOwner,
        teamDriver,
        setTeamDriver,
        teamOwner,
        setTeamOwner,
        warning,
        setWarning
    } = jobCtx;
    const driverRef = useRef()
    const ownerRef = useRef()
    const messageRef = useRef()
    const payRef = useRef()
    const grossRef = useRef()
    const ownerGrossRef = useRef()
    const typeRef = useRef()

    const handleInputChange = (e) => {
        const { name, value, type, valueAsNumber } = e.target;
        const handle = () => {
            const list = { ...job }
            type === "number" ? !isNaN(valueAsNumber) ? Number.isSafeInteger(valueAsNumber) ? list[name] = valueAsNumber : list[name] = parseFloat(valueAsNumber) : list[name] = null : list[name] = value
            setJob(list);
        }
        switch (name) {
            case "pay":
                if (value.length > 4) {
                    break
                } else {
                    handle()
                    break
                }
            case "driverGross":
                if (value.length > 2) {
                    break
                } else {
                    handle()
                    break
                }
            case "teamPay":
                if (value.length > 4) {
                    break
                } else {
                    handle()
                    break
                }
            case "teamDriverGross":
                if (value.length > 2) {
                    break
                } else {
                    handle()
                    break
                }
            case "ownerGross":
                if (value.length > 2) {
                    break
                } else {
                    handle()
                    break
                }
            case "teamOwnerGross":
                if (value.length > 2) {
                    break
                } else {
                    handle()
                    break
                }
            default:
                handle()
                break;
        }
    };

    if (warning.type === 'error') {
        messageRef.current.style.opacity = 1
        setTimeout(() => {
            setWarning({})
        }, 10000);
    }

    let color = "0px 0px 4px 2px rgba(255,71,71,0.53)"

    switch (warning.highlight) {
        case 'boxes':
            driverRef.current.style.boxShadow = color
            ownerRef.current.style.boxShadow = color
            setTimeout(() => {
                driverRef.current ? driverRef.current.style.boxShadow = null : null
                ownerRef.current ? ownerRef.current.style.boxShadow = null : null
            }, 10000);
            break;
        case 'inputs':
            payRef.current.style.boxShadow = color
            grossRef.current.style.boxShadow = color
            ownerGrossRef.current.style.boxShadow = color

            setTimeout(() => {
                payRef.current ? payRef.current.style.boxShadow = null : null
                grossRef.current ? grossRef.current.style.boxShadow = null : null
                ownerGrossRef.current ? ownerGrossRef.current.style.boxShadow = null : null
            }, 10000);

            break;
        case 'truck':
            typeRef.current.style.boxShadow = color
            setTimeout(() => {
                ownerGrossRef.current ? typeRef.current.style.boxShadow = null : null
            }, 10000);
            break;
        default:
            break;
    }
    return (
        <>
            <div
                className='form-row'
            >
                <div>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse
                    repellat corporis quasi quae molestias iste rerum culpa earum vitae
                    quaerat veniam ea, nam adipisci, incidunt eius. Laboriosam numquam
                    quaerat perspiciatis?
                </div>

                <div className={classes.type}>
                    <label htmlFor='type'>
                        <span className='required'>*</span>Тип Работы
                    </label>
                    <select
                        name='type'
                        id='type'
                        onChange={e => handleInputChange(e)}
                        required
                        value={job.type}
                        ref={typeRef}
                    >
                        <option value='' disabled>
                            Трейлер
                        </option>
                        <option value='Dry Van'>Dry Van</option>
                        <option value='Reefer'>Reefer</option>
                        <option value='Flatbed'>Flatbed</option>
                        <option value='Step Deck'>Step Deck</option>
                        <option value='Lowboy'>Lowboy</option>
                        <option value='Car Hauler'>Car Hauler</option>
                    </select>
                </div>
            </div>
            <span ref={messageRef} style={{ textAlign: 'center', transition: 'all 1s', opacity: 0, display: warning.type ? 'static' : 'none', color: warning.type === 'error' ? 'red' : 'black' }}>{warning && warning.message}</span>
            <div className={classes.forms} >
                <div
                    style={driver ? { opacity: 1 } : { opacity: 0.6 }}
                    className={classes.category} ref={driverRef}
                >
                    <h3>
                        <input
                            type='checkbox'
                            id='driver'
                            name='driver'
                            checked={driver}
                            onChange={() => setDriver(!driver)}
                        />
                        <label htmlFor='driver'>Driver</label>
                    </h3>
                    <div className={classes.pay}>
                        <div>
                            <label htmlFor='pay'>Оплата</label>
                            <div>
                                $
                                <input
                                    className='input-md'
                                    type='number'
                                    placeholder='#.##'
                                    id='pay'
                                    name="pay"
                                    onChange={e => handleInputChange(e)}
                                    value={job.pay === null ? '' : job.pay}
                                    disabled={driver ? false : true}
                                    ref={payRef}
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor='driverGross'>В Процентах</label>
                            <div>
                                <input
                                    className='input-md'
                                    type='number'
                                    placeholder='##'
                                    id='driverGross'
                                    name="driverGross"
                                    value={job.driverGross === null ? '' : job.driverGross}
                                    onChange={e => handleInputChange(e)}
                                    disabled={driver ? false : true}
                                    ref={grossRef}
                                />
                                %
                            </div>
                        </div>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            gap: 10,
                            alignItems: "flex-end",
                            height: 35,
                        }}
                    >
                        <div>
                            <input
                                type='checkbox'
                                id='teamDriver'
                                name='teamDriver'
                                checked={teamDriver}
                                onChange={() => setTeamDriver(!teamDriver)}
                                disabled={driver ? false : true}
                            />
                            <label htmlFor='teamDriver'>Team Driver</label>
                        </div>
                    </div>
                    {teamDriver && (
                        <div className={classes.pay}>
                            <div>
                                <label htmlFor='teamPay'>Оплата</label>
                                <div>
                                    $
                                    <input
                                        className='input-md'
                                        type='number'
                                        placeholder='#.##'
                                        name='teamPay'
                                        id='teamPay'
                                        value={job.teamPay === null ? '' : job.teamPay}
                                        onChange={e => handleInputChange(e)}
                                        disabled={teamDriver ? false : true}
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor='teamDriverGross'>В Процентах</label>
                                <div>
                                    <input
                                        className='input-md'
                                        type='number'
                                        placeholder='##'
                                        name='teamDriverGross'
                                        id='teamDriverGross'
                                        value={job.teamDriverGross === null ? '' : job.teamDriverGross}
                                        onChange={e => handleInputChange(e)}
                                        disabled={teamDriver ? false : true}
                                    />
                                    %
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div
                    style={owner ? null : { opacity: 0.6 }}
                    className={classes.category} ref={ownerRef}
                >
                    <h3>
                        <input
                            type='checkbox'
                            id='owner'
                            name='owner'
                            checked={owner}
                            onChange={() => setOwner(!owner)}
                        />
                        <label htmlFor='owner'>Owner Operator</label>
                    </h3>
                    <div className={classes.pay}>
                        <div>
                            <label htmlFor='owner-gross-pay'>В Процентах</label>
                            <div>
                                <input
                                    className='input-md'
                                    type='number'
                                    placeholder='##'
                                    name="ownerGross"
                                    id='owner-gross-pay'
                                    value={job.ownerGross === null ? '' : job.ownerGross}
                                    onChange={e => handleInputChange(e)}
                                    disabled={owner ? false : true}
                                    ref={ownerGrossRef}
                                />
                                %
                            </div>
                        </div>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            gap: 10,
                            alignItems: "flex-end",
                            height: 35,
                        }}
                    >
                        <div>
                            <input
                                type='checkbox'
                                id='teamOwner'
                                checked={teamOwner}
                                onChange={() => setTeamOwner(!teamOwner)}
                                disabled={owner ? false : true}
                            />
                            <label htmlFor='teamOwner'>Team Owner Operator</label>
                        </div>
                    </div>
                    {teamOwner && (
                        <div className={classes.pay}>
                            <div>
                                <label htmlFor='owner-gross-pay'>В Процентах</label>
                                <div>
                                    <input
                                        className='input-md'
                                        type='number'
                                        placeholder='##'
                                        id='owner-gross-pay'
                                        name='teamOwnerGross'
                                        value={job.teamOwnerGross === null ? '' : job.teamOwnerGross}
                                        onChange={e => handleInputChange(e)}
                                        disabled={teamOwner ? false : true}
                                    />
                                    %
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Form;