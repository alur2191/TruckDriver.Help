import React, { useContext, useEffect, useState } from "react";
import classes from "./form.module.css";
import JobContext from "../../store/job-context";
import Form from "../../components/jobs/form"
import Submit from "../../components/jobs/submit"
import UserContext from "../../store/user-context";
import { getSession } from "next-auth/client"
import Head from 'next/head'


function JobForm() {
    const jobCtx = useContext(JobContext);
    const userCtx = useContext(UserContext);
    const {
        setJob,
        driver,
        setDriver,
        owner,
        setOwner,
        teamDriver,
        setTeamDriver,
        teamOwner,
        setTeamOwner,
    } = jobCtx;

    const activeUser = userCtx.user;

    useEffect(() => {
        // Reset the job state
        driver && setDriver(false)
        owner && setOwner(false)
        teamDriver && setTeamDriver(false)
        teamOwner && setTeamOwner(false)
        setJob({
            type: '',
            pay: null,
            driverGross: null,
            ownerGross: null,
            teamPay: null,
            teamDriverGross: null,
            teamOwnerGross: null
        })
    }, []);



    return (
        <div className='container form'>
            <Head>
                <title>Разместить Объявление - TruckDriver.Help</title>
            </Head>
            <form className={classes.main}>
                <h3>Разместить Объявление</h3>
                <Form />
                <Submit path='create' companyId={activeUser ? activeUser.user.company.id : null} />
            </form>
        </div>
    );
}

export default JobForm;


export async function getServerSideProps(context) {
    const session = await getSession({ req: context.req });

    // Redirect to homepage if the user isn't signed in
    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    return {
        props: { session },
    };
}