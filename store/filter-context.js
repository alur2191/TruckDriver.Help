import { createContext, useState } from 'react'

const FilterContext = createContext({
    filter: null,
    setFilter: function () { },
})


export function FilterContextProvider(props) {
    const [activeFilter, setActiveFilter] = useState({ lease: false, dispatch24: false, insurance: false, transAuto: false, transMan: false, manufacturer: '', parkingState: '', teamPay: null, teamDriverGross: null })

    function setFilterHandler(data) {
        setActiveFilter(data)
    }

    const context = {
        filter: activeFilter,
        setFilter: setFilterHandler,
    };

    return (
        <FilterContext.Provider value={context}>
            {props.children}
        </FilterContext.Provider>
    )
}



export default FilterContext