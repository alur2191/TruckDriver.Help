import { useContext } from "react";
import classes from "./saved.module.css";
import { useQuery } from "react-query";
import JobListing from "../../components/jobs/jobListing";
import Filters from "../../components/filters/filters";
import UserContext from '../../store/user-context'
import { getSession } from 'next-auth/client';
import { PrismaClient } from "@prisma/client";




function Saved({ jobs }) {
    const userCtx = useContext(UserContext)
    const activeUser = userCtx.user;


    console.log(jobs);
    if (!activeUser) {
        return <div>no account</div>
    } else {
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
                <div className={classes.sidebar}>

                </div>
            </div>
        );
    }
}

export async function getServerSideProps(context) {
    const session = await getSession({ req: context.req })
    const prisma = new PrismaClient();
    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    } else {
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
