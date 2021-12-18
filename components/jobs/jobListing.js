import { Fragment } from 'react';
import classes from './jobListing.module.css'
import Link from 'next/link'
import Icons from './icons'

function JobListing({job}) {
    return (
        <Fragment>
            <div className={classes.left}>
                <h3>
                    <Link href={{pathname: `/jobs/search/trailer/${job.type}`}}>
                        <a>
                            {job.type}
                        </a>
                    </Link>
                </h3>
                <span><Link href={{pathname: `/jobs/${job.id}`}}><a>{job.company.name}</a></Link></span>
                <span><Link href={{pathname: `/jobs/search/state/${job.company.state}`}}><a><em>{job.company.city}, {job.company.state}</em></a></Link></span>
                
            </div>
            <div className={classes.right}>
                <div>
                    <span><em>Driver</em></span>
                    <span>Миля:<span>$0.{job.salary_mile}</span></span>
                    <span>Грос:<span>{job.salary_gross}%</span></span>
                </div>
                <span></span>
                <div>
                    <span><em>Owner</em></span>
                    <span>{job.owner_gross}%</span>
                    <span>Грос</span>
                </div>
            </div>
            <Icons job={job.id} company={job.company.id}/>
        </Fragment>
    )
}

export default JobListing;