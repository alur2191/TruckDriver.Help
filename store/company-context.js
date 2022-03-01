import { createContext, useState } from 'react'

const CompanyContext = createContext({
    page: null,
    setPage: function () { },
    validation: null,
    setValidation: function () { },
    about: null,
    setAbout: function () { },
    truck: null,
    setTruck: function () { },
    trailer: null,
    setTrailer: function () { },
    parking: null,
    setParking: function () { },
    additional: null,
    setAdditional: function () { }
})


export function CompanyContextProvider(props) {
    const [activePage, setActivePage] = useState(0)
    const [activeValidation, setActiveValidation] = useState({})
    const [activeAbout, setActiveAbout] = useState({ name: "", mcnumber: null, usdot: null, phone: null, website: "", city: "", state: "", zip: null })
    const [activeTruck, setActiveTruck] = useState([{ manufacturer: null, lease: false, year: null, transAuto: false, transMan: false }])
    const [activeTrailer, setActiveTrailer] = useState([{ type: null, lease: false, year: null }])
    const [activeParking, setActiveParking] = useState([])
    const [activeAdditional, setActiveAdditional] = useState({ dispatch24: false, insurance: false, deposit: null })

    function setPageHandler(pageData) {
        setActivePage(pageData)
    }
    function setValidationHandler(data) {
        setActiveValidation({ ...data })
    }
    function setAboutHandler(aboutData) {
        setActiveAbout(aboutData)
    }

    function setTrailerHandler(trailerData) {
        setActiveTrailer(trailerData)
    }

    function setTruckHandler(truckData) {
        setActiveTruck([...truckData])
    }

    function setParkingHandler(parkingData) {
        setActiveParking([...parkingData])
    }

    function setAdditionalHandler(trailerData) {
        setActiveAdditional(trailerData)
    }

    const context = {
        page: activePage,
        setPage: setPageHandler,
        validation: activeValidation,
        setValidation: setValidationHandler,
        about: activeAbout,
        setAbout: setAboutHandler,
        truck: activeTruck,
        setTruck: setTruckHandler,
        trailer: activeTrailer,
        setTrailer: setTrailerHandler,
        parking: activeParking,
        setParking: setParkingHandler,
        additional: activeAdditional,
        setAdditional: setAdditionalHandler,
    };

    return (
        <CompanyContext.Provider value={context}>
            {props.children}
        </CompanyContext.Provider>
    )
}



export default CompanyContext