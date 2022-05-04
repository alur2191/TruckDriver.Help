import { createContext, useState } from 'react'

const SearchContext = createContext({
    jobs: null,
    advanced: null,
    showJobs: function () { },
    hideJobs: function () { },
    setAdvanced: function () { },
})


export function SearchContextProvider(props) {
    const [activeJobs, setActiveJobs] = useState()
    const [activeAdvanced, setActiveAdvanced] = useState(false)


    function showJobsHandler(data) {
        setActiveJobs(data)
    }

    function hideJobsHandler(data) {
        setActiveJobs(data)
    }

    function setAdvancedHandler() {
        setActiveAdvanced(!activeAdvanced)
    }

    const context = {
        jobs: activeJobs,
        advanced: activeAdvanced,
        showJobs: showJobsHandler,
        hideJobs: hideJobsHandler,
        setAdvanced: setAdvancedHandler
    };

    return (
        <SearchContext.Provider value={context}>
            {props.children}
        </SearchContext.Provider>
    )
}



export default SearchContext