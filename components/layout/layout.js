import { Fragment } from 'react';
import Head from 'next/head'
import Navbar from './navbar'
import Footer from './footer'
import { useContext, useState, useEffect, useRef } from "react";
import UserContext from '../../store/user-context'
import { getSession } from 'next-auth/react'
import classes from './layout.module.css'
import AuthContext from '../../store/auth-context'
import AuthForm from '../../components/auth/auth-form'
function Layout(props) {
    const [isLoading, setIsLoading] = useState(true);
    const userCtx = useContext(UserContext)
    const authCtx = useContext(AuthContext)
    const authRef = useRef()
    const activeUser = userCtx.user;
    const { auth, setAuth } = authCtx;
    // const activeNotification = notificationCtx.notification;


    useEffect(() => {

        getSession().then((session) => {
            if (session) {
                const loadUser = async () => {

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
        const checkIfClickedOutside = e => {
            // If the menu is open and the clicked area is not within the menu,
            // then close the menu

            if (auth &&
                !authRef.current?.contains(e.target)) {
                setAuth()
            }

        }

        document.addEventListener("mousedown", checkIfClickedOutside)

        return () => {
            // Cleanup the event listener
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [auth]);

    if (isLoading) {

        return (
            <>
                <Head>
                    <title>Работа в траковых компаниях для водителей с CDL.</title>
                </Head>
                <div className="loader"></div>
            </>
        )
    }

    return (
        <Fragment>
            <Head>
                <title>Работа в траковых компаниях для водителей с CDL.</title>
            </Head>
            <div style={auth ? { position: 'fixed', width: '100%', height: '100vh', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center' } : { display: 'none' }}>
                <div ref={authRef} style={{ position: 'relative', backgroundColor: 'white', padding: '40px 0', width: 300, display: 'flex', justifyContent: 'center', margin: 'auto', flexDirection: 'column', gap: 20, borderRadius: 5 }}>
                    <a style={{ position: 'absolute', top: 10, right: 0, marginRight: 20, cursor: 'pointer' }} onClick={setAuth}><i style={{ marginRight: 3 }} className="bi bi-x-circle-fill"></i>Закрыть</a>

                    <AuthForm />
                </div>

            </div>
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
        </Fragment >
    )
}


export default Layout;