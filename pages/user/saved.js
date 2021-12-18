import { useContext } from "react";
import classes from "./saved.module.css";
import { useQuery } from "react-query";
import JobListing from "../../components/jobs/jobListing";
import Filters from "../../components/filters/filters";
import UserContext from '../../store/user-context'




function Saved() {
    const userCtx = useContext(UserContext)
    const activeUser =  userCtx.user;
    
    if(!activeUser){
        return <div>no account</div>
    }else{
        
        return (
            
            <div className={classes.main}>
            
            <div className={classes.listings} >
                <Filters />
                {jobs
                ? jobs.map((job) => <div key={job.id} className="listing">
                    <JobListing  job={job} />
                    
                    </div>)
                : "loading"}
            </div>
            <div className={classes.sidebar}>
            
            </div>
            </div>
        );
    }
}

export default Saved;
