import { Fragment } from 'react';
import React, { useState, useContext, useRef, useEffect } from 'react'
import CompanyContext from '../../../store/company-context'
import classes from "./parking.module.css"
import ParkingList from "./parkingList"

function Parking() {
    const stateRef = useRef()
    const companyCtx = useContext(CompanyContext)
    console.log(companyCtx.parking);
    const { parking, setParking } = companyCtx
    const [parkingWarning, setParkingWarning] = useState('')

    const addParking = () => {
        if (stateRef.current.value) {
            const list = parking
            const listItem = `${stateRef.current.value}`
            let match = false
            list.map(item => {
                console.log(item === listItem)
                if (item === listItem) {
                    match = true
                }
            })
            if (!match) {
                list.push(listItem)
                setParking(list)
                setParkingWarning('')
            }
        } else {
            setParkingWarning('Укажите штат!')
        }
    }


    return (
        <div className={classes.main}>
            <span style={{ cursor: 'pointer', color: '#773C44' }} onClick={() => { setParkingWarning('') }}>{parkingWarning}</span>
            <div className="parking" >
                <div>
                    <label htmlFor="parkingState">Штат:</label>
                    <select name="state" id="parkingState" ref={stateRef} defaultValue="">
                        <option value="">
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
                    <input type="button" style={{ backgroundColor: '#3c774e', width: 130, padding: 3 }} onClick={addParking} value="Добавить" />
                </div>

                <ParkingList />
            </div>
        </div>
    )
}

export default Parking;