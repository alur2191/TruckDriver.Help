import { Fragment } from 'react';

import Navbar from './navbar'
import Footer from './footer'
import { useContext } from "react";
import UserContext from '../../store/user-context'
import {useSession, signOut} from 'next-auth/client'


function Layout(props) {
    const [session, loading] = useSession()
    const userCtx = useContext(UserContext)
    const activeUser =  userCtx.user;
    const loadUser = async() => {
        const user = await fetch(`/api/user/${session.user.email}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(session.user.email),
        })
        user.json().then(body => userCtx.setUser({
            ...body
        }));
    }
    
    session&&!activeUser&&loadUser()
    return (
        <Fragment>
            <Navbar />
            <main style={{paddingBottom: 100}}>
                {props.children}
            </main>
            {/* {notification.status && (
                <Notification
                    title={notification.title}
                    message={notification.message}
                    status={notification.status}
                />
            )} */}
            <Footer/>
        </Fragment>
    )
}

export default Layout;