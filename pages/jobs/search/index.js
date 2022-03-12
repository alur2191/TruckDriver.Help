import { useContext } from "react";
import classes from "./index.module.css";
import JobListing from "../../../components/jobs/jobListing";
import Filters from "../../../components/filters/filters";
import AuthForm from "../../../components/auth/auth-form";
import SearchContext from '../../../store/search-context'
import { useSession } from 'next-auth/client'


function Home() {
    const searchCtx = useContext(SearchContext)
    const [session, loading] = useSession()

    const activeSearch = searchCtx.jobs;
    console.log(activeSearch);
    return (
        <div className={classes.main}>

            <div className={classes.listings} >
                <Filters />
                {activeSearch && activeSearch.jobs && activeSearch.jobs.map(job => <div key={job.id} className="listing"><JobListing job={job} /></div>)}
            </div>
            <div className={classes.sidebar}>
                {!session && <div>
                    <AuthForm />
                </div>}
            </div>
        </div>
    );
}

export default Home;
