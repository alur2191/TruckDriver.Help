import {useRouter} from 'next/router';
import prisma from '../../../../lib/prisma'
import classes from "./state.module.css"
import JobListing from "../../../../components/jobs/jobListing";

function JobsByState(props) {
    const jobs = props.jobs

    console.log(jobs);
    return(
        <div className={classes.main}>
            {jobs
                ? jobs.map((job) => <div key={job.id} className="listing"><JobListing  job={job} /></div>)
                : "loading"}
        </div>
    )
}

export async function getStaticProps(context){
    const { state } = context.params;
    const jobs = await prisma.job.findMany({
        where :{
            company: {
                state
            }
        },
        include:{
            company: true
        }
    })
    const processedJobs = JSON.parse(JSON.stringify(jobs))
    return {
        props:{
            jobs: processedJobs
        }
    }
}

export async function getStaticPaths() {
    return {
        paths:[
            {params:{state:'AL'}},
            {params:{state:'AK'}},
            {params:{state:'AZ'}},
            {params:{state:'AR'}},
            {params:{state:'CA'}},
            {params:{state:'CO'}},
            {params:{state:'CT'}},
            {params:{state:'DE'}},
            {params:{state:'FL'}},
            {params:{state:'GA'}},
            {params:{state:'HI'}},
            {params:{state:'ID'}},
            {params:{state:'IL'}},
            {params:{state:'IN'}},
            {params:{state:'IA'}},
            {params:{state:'KS'}},
            {params:{state:'KY'}},
            {params:{state:'LA'}},
            {params:{state:'ME'}},
            {params:{state:'MD'}},
            {params:{state:'MA'}},
            {params:{state:'MI'}},
            {params:{state:'MN'}},
            {params:{state:'MS'}},
            {params:{state:'MO'}},
            {params:{state:'MT'}},
            {params:{state:'NE'}},
            {params:{state:'NV'}},
            {params:{state:'NH'}},
            {params:{state:'NJ'}},
            {params:{state:'NM'}},
            {params:{state:'NY'}},
            {params:{state:'NC'}},
            {params:{state:'ND'}},
            {params:{state:'OH'}},
            {params:{state:'OK'}},
            {params:{state:'OR'}},
            {params:{state:'PA'}},
            {params:{state:'RI'}},
            {params:{state:'SC'}},
            {params:{state:'SD'}},
            {params:{state:'TN'}},
            {params:{state:'TX'}},
            {params:{state:'UT'}},
            {params:{state:'VT'}},
            {params:{state:'VA'}},
            {params:{state:'WA'}},
            {params:{state:'WV'}},
            {params:{state:'WI'}},
            {params:{state:'WY'}}
        ],
        fallback:false
    }
}


export default JobsByState;
