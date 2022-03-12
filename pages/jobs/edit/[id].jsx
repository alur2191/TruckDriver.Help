import React, { useState, useContext, useEffect } from "react";
import Router from "next/router";
import classes from "./id.module.css";
import { PrismaClient } from "@prisma/client";
import JobContext from "../../../store/job-context";
import Form from "../../../components/jobs/form";
import Submit from "../../../components/jobs/submit";
import { getSession } from "next-auth/client"
import Head from 'next/head'

function Edit({ dbJob }) {
    const [confirm, setConfirm] = useState(false);

    useEffect(() => {
        // Pass the values from the backend, to job state
        setJob({
            id: dbJob.id,
            driverGross: dbJob.driverGross,
            ownerGross: dbJob.ownerGross,
            type: dbJob.type,
            teamDriverGross: dbJob.teamDriverGross,
            teamOwnerGross: dbJob.teamOwnerGross,
            teamPay: dbJob.teamPay ? dbJob.teamPay.toFixed(2) : null,
            pay: dbJob.pay ? dbJob.pay.toFixed(2) : null,

        });
        // If driver pay or gross pay is null, disable the driver checkbox
        dbJob.pay === null && dbJob.driverGross === null ? setDriver(false) : setDriver(true)
        // If team driver pay or team gross pay is null, disable the team driver checkbox
        dbJob.teamPay === null && dbJob.teamDriverGross === null ? setTeamDriver(false) : setTeamDriver(true)
        // If owner gross is null, disable the owner checkbox
        dbJob.ownerGross === null ? setOwner(false) : setOwner(true);
        // If team owner gross is null, disable the team owner checkbox
        dbJob.teamOwnerGross === null ? setTeamOwner(false) : setTeamOwner(true);
    }, []);


    const jobCtx = useContext(JobContext);
    const {
        setJob,
        setDriver,
        setOwner,
        setTeamDriver,
        setTeamOwner,
    } = jobCtx;

    const deletePost = async (e) => {
        e.preventDefault();
        const body = {
            id: dbJob.id,
        };
        try {
            await fetch("/api/jobs/delete", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            await Router.push(`/`);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='container form'>
            <Head>
                <title>Редактировать Объявление</title>
            </Head>
            <form className={classes.main} >
                <h3>Редактировать Объявление</h3>
                <Form />

                <Submit path="edit" />

                {confirm ? (
                    <div>
                        {/* Confirm that user wants to delete a job post */}
                        <p>Вы уверены что хотите удалить объявление?</p>
                        <input type='button' value='Да' onClick={deletePost} />{" "}
                        <input
                            type='button'
                            value='Нет'
                            onClick={() => setConfirm(false)}
                        />
                    </div>
                ) : (
                    <input
                        type='button'
                        value='Удалить'
                        onClick={() => setConfirm(true)}
                    />
                )}
            </form>
        </div>
    );
}

export default Edit;
export async function getServerSideProps(context) {
    const { params } = context;

    const prisma = new PrismaClient();
    const session = await getSession({ req: context.req });
    // Redirect if user isn't logged in
    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    } else {
        // If user didn't create a company yet, redirect to company creation form
        if (!session.user.companyId) {
            return {
                redirect: {
                    destination: '/company/form',
                    permanent: false,
                },
            }
        } else {
            // Find a job by ID, that was passed through params
            const job = await prisma.job.findUnique({
                where: {
                    id: parseInt(params.id),
                },
                select: {
                    id: true,
                    type: true,
                    pay: true,
                    driverGross: true,
                    teamPay: true,
                    teamDriverGross: true,
                    ownerGross: true,
                    teamOwnerGross: true,
                },
            });

            return {
                props: {
                    dbJob: job,
                },
            };
        }
    }
}