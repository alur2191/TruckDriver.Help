import React, { useContext } from 'react'
import CompanyContext from '../../../store/company-context'

function ParkingList() {
    const companyCtx = useContext(CompanyContext)
    const { parking, setParking } = companyCtx

    const removeParking = (i) => {
        const list = parking
        list.splice(i, 1)
        setParking(list)
    }
    return (
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'flex-start', alignItems: 'center' }}>
            <span>Парковка:</span>
            {parking.map((location, i) => {
                return (
                    <div style={{ marginBottom: 10 }} key={i}><span style={{ backgroundColor: '#EEEEF5', padding: 5 }}>{location}</span><span onClick={() => { removeParking(i) }} style={{ backgroundColor: '#C5C5C5', padding: '5px 8px', cursor: 'pointer' }}>X</span></div>
                )
            })}
        </div>
    )
}

export default ParkingList;