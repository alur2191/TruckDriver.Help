
import classes from "./index.module.css";
import { useQuery } from "react-query";
import JobListing from "../components/jobs/jobListing";
import Filters from "../components/filters/filters";
import AuthForm from "../components/auth/auth-form";
import { useSession, signOut } from 'next-auth/client'
import AdvancedSearch from "../components/filters/advancedSearch"
import { PrismaClient } from "@prisma/client";


function Home({ jobs }) {
  const [session, loading] = useSession()



  return (
    <div className={classes.main}>

      <div className={classes.listings} >
        <Filters />
        {jobs
          ? jobs.map((job) => <div key={job.id} className="listing">
            <JobListing job={job} />

          </div>)
          : "loading"}
      </div>
      <aside className={classes.sidebar}>
        <AdvancedSearch />
        {!session && <div>
          <AuthForm />
        </div>}
      </aside>
    </div>
  );
}

export async function getServerSideProps() {
  const prisma = new PrismaClient();
  const jobs = await prisma.job.findMany({
    include: {
      company: {
        include: {
          trucks: true,
          trailers: true
        }
      }
    }
  })
  return {
    props: {
      jobs
    }
  }
}



export default Home;
