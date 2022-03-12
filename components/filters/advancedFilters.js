import FilterContext from "../../store/filter-context";
import { useContext } from "react";
import classes from './advancedFilter.module.css'
function AdvancedFilters() {
    const filterCtx = useContext(FilterContext);
    const { filter, setFilter } = filterCtx;

    const handleInputChange = (e, index) => {
        const { name, value, type } = e.target;
        const list = { ...filter };
        if (value === "") {
            list[name] = null;
        } else {
            type === "checkbox" ?
                (list[name] = !list[name]) : (list[name] = value);
        }
        setFilter(list);
    };

    return (

        <div className={classes.main}>
            <div>
                <input
                    type='checkbox'
                    id='lease'
                    name='lease'
                    onChange={(e) => handleInputChange(e)}
                />
                <label htmlFor='lease'>Аренда</label>
            </div>
            <div>
                <input
                    type='checkbox'
                    id='dispatch'
                    name='dispatch24'
                    onChange={(e) => handleInputChange(e)}
                />
                <label htmlFor='dispatch'>24/7 Диспетчер</label>
            </div>
            <div>
                <input
                    type='checkbox'
                    id='insurance'
                    name='insurance'
                    onChange={(e) => handleInputChange(e)}
                />
                <label htmlFor='insurance'>Мед. Страховка</label>
            </div>

            <div className={classes.transmission}>
                <span>Трансмиссия:</span>
                <div>
                    <input
                        type='checkbox'
                        id='transAuto'
                        name='transAuto'
                        onChange={(e) => handleInputChange(e)}
                    />
                    <label htmlFor='transAuto'>Авто.</label>
                </div>
                <div>
                    <input
                        type='checkbox'
                        id='transMan'
                        name='transMan'
                        onChange={(e) => handleInputChange(e)}
                    />
                    <label htmlFor='transMan'>Механ.</label>
                </div>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
                <label htmlFor='parkingState'>Трак:</label>
                <select
                    name='manufacturer'
                    id='manufacturer'
                    onChange={(e) => handleInputChange(e)}
                >
                    <option value=''></option>
                    <option value='Volvo'>Volvo</option>
                    <option value='Freightliner'>Freightliner</option>
                    <option value='Kenworth'>Kenworth</option>
                    <option value='Peterbilt'>Peterbilt</option>
                    <option value='Western'>Western Star</option>
                </select>
            </div>
            {/* <div style={{ display: "flex", alignItems: "center" }}>
                <label htmlFor='state'>Парковка:</label>
                <select
                    name='parkingState'
                    id='state'
                    defaultValue=''
                    onChange={(e) => handleInputChange(e)}
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
            </div> */}
            <div className={classes.payment}>
                Team:
                <div>
                    $
                    <input
                        type='text'
                        placeholder='#.##'
                        name="teamPay"
                        pattern="[0-9]{4}"
                        onChange={(e) => handleInputChange(e)}
                    />
                </div>
                <div>
                    <input
                        type='text'
                        name="teamDriverGross"
                        placeholder='##'
                        onChange={(e) => handleInputChange(e)}
                    />
                    %
                </div>
            </div>
        </div>
    );
}

export default AdvancedFilters;
