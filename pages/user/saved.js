import classes from "./saved.module.css";
import JobListing from "../../components/jobs/jobListing";
import Filters from "../../components/filters/filters";
import { getSession } from 'next-auth/client';
import { PrismaClient } from "@prisma/client";

function Saved({ jobs }) {
    return (
        <div className={classes.main}>
            <div className={classes.listings} >
                <Filters />
                {jobs
                    ? jobs.length === 0 ?
                        <div style={{ display: 'flex', justifyContent: 'center' }}>У вас нет сохраненных объявлений.</div> :
                        jobs.map((job) => <div key={job.id} className="listing">
                            <JobListing job={job} />
                        </div>)
                    : <div className="loader"></div>}
            </div>
            <div className={classes.sidebar}>
            </div>
        </div>
    );
}

export async function getServerSideProps(context) {
    const session = await getSession({ req: context.req })
    const prisma = new PrismaClient();
    // Redirect if user isn't logged in
    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    } else {
        // Fetch saved jobs, include related company schema
        const jobs = await prisma.userJobs.findMany({
            where: {
                userId: session.user.id
            },
            select: {
                job: {
                    include: {
                        company: true
                    }
                }
            }
        })
        const processedJobs = []
        jobs.map(job => {
            processedJobs.push(job.job)
        })

        return {
            props: {
                jobs: processedJobs
            }
        }
    }
}


export default Saved;
