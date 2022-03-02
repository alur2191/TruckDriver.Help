import classes from "./filters.module.css";
import React, { useState, useContext } from "react";
import Router from "next/router";
import SearchContext from "../../store/search-context";
import FilterContext from "../../store/filter-context";
import AdvancedFilters from "./advancedFilters";
import Tooltip from "../ui/tooltip"

const Filters = () => {
    const [type, setType] = useState('');
    const [state, setState] = useState('');
    const [salaryMile, setSalaryMile] = useState(null);
    const [salaryGross, setSalaryGross] = useState(null);
    const [ownerGross, setOwnerGross] = useState(null);

    const searchCtx = useContext(SearchContext);
    const { advanced, setAdvanced } = searchCtx;

    const filterCtx = useContext(FilterContext);
    const { filter, setFilter } = filterCtx;

    const submitData = async (e) => {
        e.preventDefault();
        const {
            lease,
            dispatch24,
            insurance,
            transAuto,
            transMan,
            manufacturer,
            parkingState,
            teamPay,
            teamDriverGross
        } = filter;
        try {
            const body = {
                type,
                state,
                ownerGross,
                salaryMile,
                salaryGross,
                lease,
                dispatch24,
                insurance,
                transAuto,
                transMan,
                manufacturer,
                parkingState,
                teamPay,
                teamDriverGross
            };
            console.log("FE - type: ", type);
            const jobs = await fetch("/api/jobs/search", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            jobs.json().then((body) =>
                searchCtx.showJobs({
                    ...body,
                })
            );
            setFilter({ lease: false, dispatch24: false, insurance: false, transAuto: false, transMan: false, manufacturer: '', parkingState: '' })
            Router.push("/jobs/search");
        } catch (error) {
            console.error(error);
        }
    };



    return (
        <div className={advanced ? 'filter filter-advanced' : 'filter'}>
            <div className={classes.main}>

                <div className={classes.type}>
                    Работа:
                    <select
                        name='type'
                        id='type'
                        required
                        defaultValue=''
                        onChange={(e) => setType(e.target.value)}
                    >
                        <option value=''></option>
                        <option value='Dry Van'>Dry Van</option>
                        <option value='Reefer'>Reefer</option>
                        <option value='Flatbed'>Flatbed</option>
                        <option value='Step Deck'>Step Deck</option>
                        <option value='Lowboy'>Lowboy</option>
                        <option value='Car Hauler'>Car Hauler</option>
                    </select>
                </div>

                <div>
                    Штат:
                    <select
                        name='state'
                        id='state'
                        onChange={(e) => setState(e.target.value)}
                        required
                        defaultValue=''
                    >
                        <option value=''></option>
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
                </div>
                <div className={classes.payment}>
                    <div>
                        <Tooltip content="Укажите минимальную оплату в долларах и центах, либо в процентах (gross) для поиска." direction="top">
                            <i style={{ fontSize: 12, top: -12, left: -13, position: 'absolute' }} className="bi bi-question-circle-fill tooltip-icon"></i>
                        </Tooltip>
                        Driver:
                    </div>
                    <div>
                        $
                        <input
                            type='text'
                            placeholder='#.##'
                            pattern="[0-9]{4}"
                            onChange={(e) => setSalaryMile(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            type='text'
                            placeholder='##'
                            onChange={(e) => setSalaryGross(e.target.value)}
                        />
                        %
                    </div>
                </div>
                <div className={classes.payment}>

                    <div>
                        <Tooltip content="Укажите минимальную оплату в процентах (gross) для поиска работы Owner Operator." direction="top">
                            <i style={{ fontSize: 12, top: -12, left: -13, position: 'absolute' }} className="bi bi-question-circle-fill tooltip-icon"></i>
                        </Tooltip>
                        Owner:
                    </div>
                    <div>
                        <input
                            type='text'
                            placeholder='##'
                            onChange={(e) => setOwnerGross(e.target.value)}
                        />
                        %
                    </div>
                </div>
                <div>
                    <i onClick={setAdvanced} className="bu-advanced bi bi-three-dots-vertical"></i>
                    <div
                        onClick={submitData}

                    >
                        <i
                            className='bi bi-search'
                            style={{ color: "white", fontSize: 16 }}
                        ></i>
                        <span>Поиск</span>
                    </div>
                </div>

            </div>
            {advanced ? <AdvancedFilters /> : null}
        </div>
    );
};
export default Filters;
