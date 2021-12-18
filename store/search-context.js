import { createContext, useState } from 'react'

const SearchContext = createContext({
    jobs: null,
    showJobs: function(){},
    hideJobs: function(){}
})


export function SearchContextProvider(props){
    const [activeJobs, setActiveJobs] = useState()

    function showJobsHandler(jobsData){
        setActiveJobs(jobsData)
    }
    
    function hideJobsHandler(jobsData){
        setActiveJobs(jobsData)
    }

    const context = {
        jobs: activeJobs,
        showJobs: showJobsHandler,
        hideJobs: hideJobsHandler,
    };

    return (
        <SearchContext.Provider value={context}>
            {props.children}
        </SearchContext.Provider>
    )
}



export default SearchContext