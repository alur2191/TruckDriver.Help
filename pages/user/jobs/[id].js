import {useRouter} from 'next/router';
import { PrismaClient } from "@prisma/client";
import JobListing from "../../../components/jobs/jobListing";

function JobDetails({jobs}) {
    
    return(
        <div>
            {jobs
                ? jobs.map((job) => <div key={job.id} className="listing">
                    <JobListing  job={job} />
                    
                    </div>)
                : "loading"}
        </div>
    )
}

export async function getServerSideProps(context){
    const { id } = context.params;
    const prisma = new PrismaClient();
    const jobs = await prisma.job.findMany({
        where :{
            company_id: parseInt(id)
        },
        include:{
            company:true            
        }
    })
    return {
        props:{
            jobs
        }
    }
}


export default JobDetails;
