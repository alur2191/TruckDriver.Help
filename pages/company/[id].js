import { PrismaClient } from "@prisma/client";
import JobListing from "../../components/jobs/jobListing";
import { getSession } from 'next-auth/client'
import classes from "./id.module.css"

function JobDetails({ jobs }) {

    return (
        <div className={classes.main}>
            {jobs
                ? jobs.map((job) => <div key={job.id} className="listing">
                    <JobListing job={job} />

                </div>)
                : "loading"}
        </div>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession({ req: context.req });
    const { id } = context.params;
    const prisma = new PrismaClient();
    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    } else {
        if (!session.user.companyId) {
            return {
                redirect: {
                    destination: '/company/form',
                    permanent: false,
                },
            }
        } else {
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
