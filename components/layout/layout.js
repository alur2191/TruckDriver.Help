import { Fragment } from 'react';
import Head from 'next/head'
import Navbar from './navbar'
import Footer from './footer'
import { useContext } from "react";
import UserContext from '../../store/user-context'
import { useSession } from 'next-auth/client'
import classes from './layout.module.css'

function Layout(props) {
    const [session] = useSession()
    const userCtx = useContext(UserContext)

    const activeUser = userCtx.user;
    const loadUser = async () => {
        const user = await fetch(`/api/user/${session.user.email}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(session.user.email),
        })
        user.json().then(body => userCtx.setUser({
            ...body
        }));
    }

    session && !activeUser && loadUser()

    ReactPixel.pageView(); // For tracking page vie
    return (
        <Fragment>
            <Head>
                <title>Работа в траковых компаниях для водителей с CDL.</title>
            </Head>
            <Navbar />
            <main className={classes.main}>
                {props.children}
            </main>
            {/* {notification.status && (
                <Notification
                    title={notification.title}
                    message={notification.message}
                    status={notification.status}
                />
            )} */}
            <Footer />
        </Fragment>
    )
}

export default Layout;