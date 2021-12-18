import classes from './filters.module.css'
import React, {useState, useContext} from 'react'
import Router from 'next/router';
import SearchContext from '../../store/search-context'

const Filters = () => {
    const [type, setType] = useState('')
    const [state, setState] = useState('')
    const [salaryMile, setSalaryMile] = useState('')
    const [salaryGross, setSalaryGross] = useState('')
    const [ownerGross, setOwnerGross] = useState('')
    
    const searchCtx = useContext(SearchContext)

    const submitData = async (e) => {
        
        e.preventDefault();
        try {
            const body = {type,state,ownerGross,salaryMile,salaryGross};
            console.log('FE - type: ', type);
            const jobs = await fetch("/api/jobs/search", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            })
            jobs.json().then(body => searchCtx.showJobs({
                ...body
            }));
            Router.push('/jobs/search')
            
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className={classes.main}>
            Поиск:
            <div className={classes.type}>  
                <select name="type" id="type" required defaultValue="" onChange={(e) => setType(e.target.value)}>
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
            <div>
                <select name="state" id="state" onChange={(e) => setState(e.target.value)}  required defaultValue="">
                    <option value="" disabled>
                        Штат
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
    
            <div className={classes.payment}>Driver: 
                <div>$0.<input type="text" placeholder="##" maxLength={2} onChange={(e) =>setSalaryMile(e.target.value)}/></div>
                <div><input type="text" placeholder="Грос" maxLength={2} onChange={(e) =>setSalaryGross(e.target.value)} />%</div>
            </div>
            <div className={classes.payment}>Owner: <div><input type="text" placeholder="Грос" maxLength={2} onChange={(e) =>setOwnerGross(e.target.value)} />%</div></div>
            <div onClick={submitData} style={{width: 30, height: 30,backgroundColor:'#3C3C77', borderRadius: 5,display:'flex',justifyContent:'center',alignItems:'center'}}><i className="bi bi-search" style={{color: 'white',  fontSize:16}}></i></div>
        </div>
    
    )
}
export default Filters;