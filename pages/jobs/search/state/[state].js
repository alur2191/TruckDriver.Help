import prisma from '../../../../lib/prisma'
import classes from "./state.module.css"
import JobListing from "../../../../components/jobs/jobListing";

function JobsByState({ jobs }) {

    return (
        // Display list of jobs
        <div className={classes.main}>
            {jobs
                ? jobs.map((job) => <div key={job.id} className="listing"><JobListing job={job} /></div>)
                : "loading"}
        </div>
    )
}

export async function getServerSideProps(context) {
    const { state } = context.params;
    // Find jobs that match the selected state, and include related company schema
    const jobs = await prisma.job.findMany({
        where: {
            company: {
                state
            }
        },
        include: {
            company: true
        }
    })
    const processedJobs = JSON.parse(JSON.stringify(jobs))
    if (!processedJobs) {
        return { notFound: true }
    }
    return {
        props: {
            jobs: processedJobs
        }
    }
}



export default JobsByState;
