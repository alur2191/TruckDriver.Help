import { PrismaClient } from "@prisma/client";
import JobListing from "../../components/jobs/jobListing";
import { getSession } from 'next-auth/react'
import classes from "./id.module.css"
import Filters from "../../components/filters/filters";
import Head from 'next/head'

function JobDetails({ jobs }) {

    return (
        <div className={classes.main}>
            <Filters />
            {jobs
                ? jobs.length === 0 ? <div style={{ display: 'flex', justifyContent: 'center' }}>Нет размещенных объявлений.</div> : jobs.map((job) => <div key={job.id} className="listing">
                    <JobListing job={job} />

                </div>)
                : <div className="loader"></div>}
        </div>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession({ req: context.req });
    const { id } = context.params;
    const prisma = new PrismaClient();
    if (!session) {
        // Redirect to homepage is user isn't signed in
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    } else {
        // If user doesn't have a company registered, redirect to company registration page
        if (!session.user.companyId) {
            return {
                redirect: {
                    destination: '/company/form',
                    permanent: false,
                },
            }
        } else {
            // Find all jobs that were posted by a company
            const jobs = await prisma.job.findMany({
                where: {
                    company_id: parseInt(id)
                },
                include: {
                    company: true
                }
            })
            return {
                props: {
                    jobs
                }
            }
        }


    }
}


export default JobDetails;
