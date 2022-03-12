import React, { useContext, useEffect } from 'react'
import CompanyContext from '../../store/company-context'
import Link from 'next/link';
import { getSession } from 'next-auth/client';
import classes from "./edit.module.css";
import Router from 'next/router';
import { PrismaClient } from "@prisma/client";
import TrailersForm from '../../components/forms/company/trailersForm';
import Sidebar from '../../components/profile/sidebar';

function Trailers({ session, dBtrailers }) {
    useEffect(() => {
        // If user has trailers, pass them to state
        dBtrailers.length !== 0 && setTrailer(dBtrailers)
    }, [])
    const companyCtx = useContext(CompanyContext)
    const { setTrailer, trailer } = companyCtx

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const id = session.user.companyId
            trailer.map(item => {
                item["company_id"] = id
            })
            const body = { trailer };
            await fetch("/api/company/editTrailers", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            await Router.push('/');
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div className={classes.main}>
            {/* <ProfilePassword /> */}
            <div style={{ backgroundColor: "white", padding: '25px' }}>
                <form onSubmit={handleSubmit}>
                    <h3>Трейлеры</h3>
                    <TrailersForm />
                    <button type="submit">Сохранить</button>
                </form>
            </div>
            <Sidebar />

        </div>
    )
}
export async function getServerSideProps(context) {
    const session = await getSession({ req: context.req });
    const prisma = new PrismaClient();

    // Redirect user to homepage if not logged in
    if (!session) {
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
            // Find all company trailers
            const trailers = await prisma.trailer.findMany({
                where: {
                    company_id: session.user.companyId
                },
                select: {
                    company_id: true,
                    lease: true,
                    type: true,
                    year: true
                }
            })

            return {
                props: { session, dBtrailers: trailers },

            }
        }
    }


}

export default Trailers;