import React, { useContext } from 'react'
import classes from "./form.module.css"
import Router from 'next/router';
import { useSession, getSession } from 'next-auth/client'
import CompanyContext from '../../store/company-context'
import UserContext from '../../store/user-context'
import About from '../../components/forms/company/about'
import Trucks from '../../components/forms/company/trucksForm'
import Trailers from '../../components/forms/company/trailersForm'
import Parking from '../../components/forms/company/parking'
import Additional from '../../components/forms/company/additional'

const Form = () => {
    const [session] = useSession()

    const companyCtx = useContext(CompanyContext)
    const userCtx = useContext(UserContext)
    const { page, setPage, about, additional, setValidation } = companyCtx
    // Section titles
    const titles = ["О Компании", "Данные о Траках", "Данные о Трейлерах", "Парковочные Места", "Дополнительная Информация"]

    const submitData = async (e) => {

        e.preventDefault();
        try {
            const email = session.user.email
            const { name, mcnumber, usdot, phone, website, city, state, zip } = about
            const truckList = companyCtx.truck
            const trailerList = companyCtx.trailer
            const parkingList = companyCtx.parking
            const { dispatch24, insurance, deposit } = additional


            let filteredTruckList = []
            let filteredTrailerList = []

            // Function that is responsible for filtering through truck and trailer arrays
            const filterList = (list) => {
                list.map(listItem => {
                    // if (for trucks) manufacturer & year isn't null
                    // or (for trailers) if  type & year isn't null
                    if (listItem.manufacturer != null && listItem.year != null ||
                        listItem.type != null && listItem.year != null) {
                        // if (truck) manufacturer is set, add list item to filtered truck array
                        // else add list item to filtered trailer array
                        listItem.manufacturer ?
                            filteredTruckList = [...filteredTruckList, { ...listItem }]
                            : filteredTrailerList = [...filteredTrailerList, { ...listItem }]
                    }
                })
            }
            filterList(truckList)
            filterList(trailerList)

            const body = { name, mcnumber, usdot, phone, website, city, state, zip, dispatch24, insurance, deposit, email, filteredTruckList, filteredTrailerList, parkingList }
            const newCompany = await fetch("/api/company/create", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            })
            // Set the company state
            newCompany.json().then(body => userCtx.setCompany({
                ...body.company
            }));

            // Update session object with users new company
            const sessionUpdate = await fetch('/api/auth/session?update', {
                method: "GET",
                credentials: "include"
            })
            if (sessionUpdate.ok) { Router.push('/') }

        } catch (error) {
            console.error(error);
        }
    };

    const stepOne = () => {
        if (!about.name) {
            setValidation({ name: { message: "Введите название компании!" } })
            return null
        } else if (about.name.length >= 100) {
            setValidation({ name: { message: "Максимум 100 букв!" } })
            return null
        }
        if (!about.phone) {
            setValidation({ phone: { message: "Введите номер телефона!" } })
            return null
        } else if (!Number.isInteger(about.phone)) {
            setValidation({ phone: { message: "USDOT состоит из цифр!" } })
            return null
        }
        if (about.website) {
            const regex = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
            if (!regex.test(about.website)) {
                setValidation({ website: { message: "Формат сайта не верный!" } })
                return null
            }

        }
        if (!about.city) {
            setValidation({ city: { message: "Введите город!" } })
            return null
        } else if (about.city.length > 100) {
            setValidation({ city: { message: "Максимум 100 букв!" } })
            return null
        }
        if (!about.state) {
            setValidation({ state: { message: "Введите штат!" } })
            return null
        }
        if (!about.zip) {
            setValidation({ zip: { message: "Введите название компании!" } })
            return null
        } else if (about.zip.length > 5) {
            setValidation({ zip: { message: "Максимум 5 цифр!" } })
            return null
        }
        setPage(1)
    }
    const pageDisplay = () => {
        switch (page) {
            case 0:
                return <About />
            case 1:
                return <Trucks />
            case 2:
                return <Trailers />
            case 3:
                return <Parking />
            case 4:
                return <Additional />
        }
    }
    const prevPage = () => setPage((currPage) => currPage - 1)
    const nextPage = () => page === 0 ? stepOne() : setPage((currPage) => currPage + 1)
    return (
        <div className="container form">

            <form className={classes.form} onSubmit={submitData}>
                <div className={classes.progressbar}>
                    <div style={{ width: page === 0 ? "20%" : page === 1 ? "40%" : page === 2 ? "60%" : page === 3 ? "80%" : page === 4 ? "100%" : "100%" }}></div>
                </div>
                <h3>{titles[page]}</h3>

                {pageDisplay()}
                <div className={classes.nav} style={{ display: 'flex', justifyContent: page !== 0 ? 'space-between' : 'flex-end' }}>
                    {page !== 0 ? <button type="button"
                        style={{ padding: '5px 10px' }}
                        disabled={page == 0}
                        onClick={() => {
                            prevPage()
                        }}
                    ><i style={{ color: 'white', fontSize: 22 }} className="bi bi-arrow-left-short"></i></button> : null}

                    {page !== titles.length - 1 ? <button type="button"
                        style={{ padding: '5px 10px' }} disabled={page == titles.length - 1}
                        onClick={() => { nextPage() }}
                    ><i style={{ color: 'white', fontSize: 22 }} className="bi bi-arrow-right-short"></i></button> : <input type="submit" value="Завершить" />}
                </div>


            </form>
        </div>
    )
}

export default Form;


export async function getServerSideProps(context) {
    const session = await getSession({ req: context.req });


    if (!session) {
        // redirect to homepage if user isn't signed in
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }
    // If user doesn't have a company registered, redirect to company registration page
    if (session.user.companyId) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }
    return {
        props: { session },
    };
}