import { createContext, useState } from 'react'

const JobContext = createContext({
    job: null,
    setJob: function () { },
    warning: null,
    setWarning: function () { },
    driver: null,
    setDriver: function () { },
    owner: null,
    setOwner: function () { },
    teamDriver: null,
    setTeamDriver: function () { },
    teamOwner: null,
    setTeamOwner: function () { },
})


export function JobContextProvider(props) {
    const [activeJob, setActiveJob] = useState({ type: '', pay: null, driverGross: null, teamPay: null, teamDriverGross: null, ownerGross: null, teamOwnerGross: null })
    const [activeWarning, setActiveWarning] = useState({})
    const [activeDriver, setActiveDriver] = useState(false)
    const [activeOwner, setActiveOwner] = useState(false)
    const [activeTeamDriver, setActiveTeamDriver] = useState(false)
    const [activeTeamOwner, setActiveTeamOwner] = useState(false)

    function setJobHandler(data) {
        setActiveJob({ ...data })
    }

    function setWarningHandler(data) {
        setActiveWarning({ ...data })
    }

    function setDriverHandler(data) {
        setActiveDriver(data)
    }

    function setTeamOwnerHandler(data) {
        setActiveTeamOwner(data)
    }

    function setOwnerHandler(data) {
        setActiveOwner(data)
    }

    function setTeamDriverHandler(data) {
        setActiveTeamDriver(data)
    }


    const context = {
        job: activeJob,
        setJob: setJobHandler,
        warning: activeWarning,
        setWarning: setWarningHandler,
        driver: activeDriver,
        setDriver: setDriverHandler,
        owner: activeOwner,
        setOwner: setOwnerHandler,
        teamDriver: activeTeamDriver,
        setTeamDriver: setTeamDriverHandler,
        teamOwner: activeTeamOwner,
        setTeamOwner: setTeamOwnerHandler,
    };

    return (
        <JobContext.Provider value={context}>
            {props.children}
        </JobContext.Provider>
    )
}



export default JobContext