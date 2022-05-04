import { Fragment } from 'react';
import classes from './jobListing.module.css'
import Link from 'next/link'
import Icons from './icons'

function JobListing({ job }) {

    const truncate = (input) =>
        input?.length > 32 ? `${input.substring(0, 32)}...` : input;
    return (
        <Fragment>
            <div className={classes.left}>
                <h3>
                    <Link href={{ pathname: `/jobs/search/trailer/${job.type}` }}>
                        <a>
                            {job.type}
                        </a>
                    </Link>
                </h3>
                <span><Link href={{ pathname: `/jobs/${job.id}` }}><a>{truncate(job.company.name)}</a></Link></span>
                <span><Link href={{ pathname: `/jobs/search/state/${job.company.state}` }}><a><em>{job.company.city}, {job.company.state}</em></a></Link></span>

            </div>
            <div className={classes.right}>
                {job.pay || job.driverGross ?
                    <div>
                        <span><em>Driver</em></span>
                        {job.pay && <span>{job.pay > 2 ? "Плата:" : "Миля:"}<span>${job.pay.toFixed(2)}</span></span>}
                        {job.driverGross && <span>Грос:<span>{job.driverGross}%</span></span>}
                    </div>
                    : null}
                {job.teamPay || job.teamDriverGross ?
                    <div className={classes.teamDriver}>
                        <span><em>Team</em></span>
                        {job.teamPay && <span>${job.teamPay.toFixed(2)}</span>}
                        {job.teamDriverGross && <span>{job.teamDriverGross}%</span>}
                    </div> : null}
                <span></span>
                {job.ownerGross ?
                    <div className={classes.owner}>
                        <span><em>Owner</em></span>
                        <span>{job.ownerGross}%</span>
                        <span>Грос</span>
                    </div> : null}
                {job.teamOwnerGross ?
                    <div className={classes.owner}>
                        <span><em>Team</em></span>
                        <span>{job.teamOwnerGross}%</span>
                        <span>Грос</span>
                    </div> : null}
            </div>
            <Icons job={job.id} company={job.company.id} />
        </Fragment>
    )
}

export default JobListing;