
import classes from "./index.module.css";
import { useQuery } from "react-query";
import JobListing from "../components/jobs/jobListing";
import Filters from "../components/filters/filters";
import AuthForm from "../components/auth/auth-form";
import {useSession, signOut} from 'next-auth/client'

async function fetchJobs() {
  const response = await fetch("/api/jobs");
  const { jobs } = await response.json();
  return jobs;
}

function Home() {
  const [session, loading] = useSession()
  
  const { data: jobs } = useQuery("jobs", fetchJobs);
  

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
        <div>
          Расширенный поиск
        </div>
        {!session && <div>
          <AuthForm/>
        </div>}
      </div>
    </div>
  );
}

export default Home;
