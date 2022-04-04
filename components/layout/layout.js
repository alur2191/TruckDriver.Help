import { Fragment } from 'react';
import Head from 'next/head'
import Navbar from './navbar'
import Footer from './footer'
import { useContext, useState, useEffect } from "react";
import UserContext from '../../store/user-context'
import { getSession } from 'next-auth/client'
import classes from './layout.module.css'

function Layout(props) {
    const [isLoading, setIsLoading] = useState(true);
    const userCtx = useContext(UserContext)

    const activeUser = userCtx.user;

    useEffect(() => {

        console.log(">>>>>>>>>>2>>>>>running");
        getSession().then((session) => {
            if (session) {
                console.log('loaded sesion');
                const loadUser = async () => {

                    console.log(">>>>>>asdfas>>>>>>>>>running");
                    const user = await fetch(`/api/user/${session.user.email}`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(session.user.email),
                    })
                    user.json().then(body => userCtx.setUser({
                        ...body
                    }));
                    setIsLoading(false)
                }
                !activeUser && loadUser()
            } else {
                setIsLoading(false);
            }
        });
    }, []);

    if (isLoading) {
        return <p>Загрузка...</p>;
    }

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