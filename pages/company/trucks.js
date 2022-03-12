import React, { useContext, useEffect } from 'react'
import CompanyContext from '../../store/company-context'
import Router from 'next/router';
import { getSession } from 'next-auth/client';
import classes from "./edit.module.css";
import { PrismaClient } from "@prisma/client";
import TrucksForm from '../../components/forms/company/trucksForm';
import Sidebar from '../../components/profile/sidebar';

function Trucks({ session, dbTrucks }) {
    useEffect(() => {
        // If user has trucks, pass them to state
        dbTrucks.length && setTruck(dbTrucks)
    }, [])
    const companyCtx = useContext(CompanyContext)
    const { setTruck, truck } = companyCtx

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const id = session.user.companyId
            truck.map(item => {
                item["company_id"] = id
            })
            const body = { truck };
            await fetch("/api/company/editTrucks", {
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

            <div>
                <form>
                    <h3>Траки</h3>
                    <TrucksForm />
                    <button type="button" onClick={handleSubmit}>Сохранить</button>
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
            // Find all company trucks
            const dbTrucks = await prisma.truck.findMany({
                where: {
                    company_id: session.user.companyId
                },
                select: {
                    id: true,
                    manufacturer: true,
                    lease: true,
                    year: true,
                    transAuto: true,
                    transMan: true
                }
            })

            return {
                props: { session, dbTrucks },

            }
        }
    }


}

export default Trucks;