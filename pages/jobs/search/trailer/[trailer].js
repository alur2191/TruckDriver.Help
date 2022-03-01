import { useRouter } from 'next/router';
import { PrismaClient } from "@prisma/client";
import classes from "./trailer.module.css"
import JobListing from "../../../../components/jobs/jobListing";

function JobsByTrailers({ jobs }) {

    console.log(jobs);
    return (
        <div className={classes.main}>
            {jobs
                ? jobs.map((job) => <div key={job.id} className="listing"><JobListing job={job} /></div>)
                : "loading"}
        </div>
    )
}

export async function getServerSideProps(context) {
    const { trailer } = context.params;
    const prisma = new PrismaClient();
    const jobs = await prisma.job.findMany({
        where: {
            type: trailer
        },
        include: {
            company: true
        }
    })
    const processedJobs = JSON.parse(JSON.stringify(jobs))
    return {
        props: {
            jobs: processedJobs
        }
    }
}

export default JobsByTrailers;
