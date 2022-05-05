import Image from 'next/image'
import { useContext, useState, useEffect, useRef } from "react";
import Link from 'next/link'
import classes from './navbar.module.css'
import { signOut } from 'next-auth/react'
import UserContext from '../../store/user-context'
import AuthContext from '../../store/auth-context'

// import { parseISO, formatDistanceToNowStrict } from "date-fns";
// import locale from 'date-fns/locale/en-US'

function Navbar() {
    const [userDropdown, setUserDropdown] = useState(false)
    const [mobile, setMobile] = useState(false)
    // const [notificationDropdown, setNotificationDropdown] = useState(false)
    const userRef = useRef()
    const userButtonRef = useRef()
    const mobileRef = useRef()
    const mobileButtonRef = useRef()
    // const notificationRef = useRef()
    const userCtx = useContext(UserContext)
    const activeUser = userCtx.user;

    const authCtx = useContext(AuthContext)
    const { setAuth } = authCtx

    // const activeNotification = notificationCtx.notification;
    useEffect(() => {
        const checkIfClickedOutside = e => {
            // If the menu is open and the clicked area is not within the menu,
            // then close the menu
            if (userDropdown &&
                userRef.current &&
                !userRef.current.contains(e.target) &&
                userButtonRef.current &&
                !userButtonRef.current.contains(e.target)) {
                setUserDropdown(false)
            }
            if (
                mobile &&
                mobileRef.current &&
                !mobileRef.current.contains(e.target) &&
                mobileButtonRef.current &&
                !mobileButtonRef.current.contains(e.target)) {
                setMobile(false)
            }

        }

        document.addEventListener("mousedown", checkIfClickedOutside)

        return () => {
            // Cleanup the event listener
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [userDropdown, mobile])

    function logoutHandler() {
        signOut()
        toggleUserDropdown()
    }
    const toggleUserDropdown = () => setUserDropdown(!userDropdown)

    return (
        <nav className={classes.navbar} >

            <Link href="/" passHref>
                <a>
                    <Image src="/images/logo.png" alt="" width={100} height={39} />
                </a>
            </Link>
            <ul>

                <Link href={{ pathname: `/resources` }}>
                    <li className={classes.tablet}>
                        <a style={{ cursor: 'pointer' }}>
                            <i className="bi bi-info-lg"></i>Ресурсы
                        </a>
                    </li>
                </Link>
                <li className={classes.tablet}>
                    <a href="https://academy.truckdriver.help" style={{ cursor: 'pointer' }}>
                        <i className="bi bi-file-earmark-text"></i>Учеба
                    </a>
                </li>
                {!activeUser &&
                    <li>
                        <a onClick={setAuth} style={{ cursor: 'pointer' }}><i className="bi bi-person-circle"></i>Мой Профиль</a>
                    </li>}
                {activeUser && (
                    <li style={{ position: 'relative' }}>
                        <a ref={userButtonRef} style={{ cursor: 'pointer' }} onClick={() => toggleUserDropdown()}><i className="bi bi-person-fill"></i>{activeUser.user.email}</a>
                        {userDropdown &&
                            <div ref={userRef} className={classes.account}>
                                <ul>
                                    {activeUser.user.company && <Link href={{ pathname: `/company/${activeUser.user.company.id}` }} passHref ><li><a onClick={toggleUserDropdown}><i className="bi bi-stickies"></i>Объявления</a></li></Link>}
                                    <Link href={{ pathname: `/user/saved` }} passHref><li><a onClick={toggleUserDropdown}><i className="bi bi-card-checklist"></i>Сохраненные</a></li></Link>
                                    <Link href={{ pathname: `/user/account` }} passHref><li><a onClick={toggleUserDropdown}><i className="bi bi-gear"></i>Аккаунт</a></li></Link>
                                    <li onClick={logoutHandler}>
                                        <a style={{ cursor: 'pointer' }}><i className="bi bi-box-arrow-right"></i>Выйти</a>
                                    </li>
                                </ul>
                            </div>}
                    </li>)}
            </ul>
            <i ref={mobileButtonRef} onClick={() => setMobile(!mobile)} className="bi bi-list bu-m-menu"></i>
            {mobile && <dir ref={mobileRef} className="mobile-nav">
                <ul>
                    <li>
                        <Link href={{ pathname: `/resources` }}>
                            <a style={{ cursor: 'pointer' }}>
                                <i className="bi bi-info-lg"></i>Ресурсы
                            </a>
                        </Link>
                    </li>
                    <li>
                        <a href="https://academy.truckdriver.help" style={{ cursor: 'pointer' }}>
                            <i className="bi bi-file-earmark-text"></i>Учеба
                        </a>
                    </li>
                    {!activeUser && <Link href={{ pathname: "/auth" }} passHref><li><a style={{ cursor: 'pointer' }}><i className="bi bi-person-fill"></i>Войти</a></li></Link>}
                    {activeUser && activeUser.user.company &&
                        <li style={{ cursor: 'pointer' }}>
                            <Link href={{ pathname: "/jobs/form" }} passHref>
                                <a><i className="bi bi-plus-circle-fill"></i>Подать Объявление</a>
                            </Link>
                        </li>
                    }
                    {activeUser && activeUser.user && !activeUser.user.company && activeUser.user.activated &&
                        <li>
                            <Link href={{ pathname: "/company/form" }} passHref>
                                <a><i className="bi bi-briefcase-fill"></i>Зарегистрировать Компанию</a>
                            </Link>
                        </li>}
                    {activeUser && (
                        <li style={{ position: 'relative' }}>
                            <a ref={userButtonRef} style={{ cursor: 'pointer' }} onClick={() => toggleUserDropdown()}><i className="bi bi-person-fill"></i>{activeUser.user.email}</a>
                            {userDropdown &&
                                <div ref={userRef} className={classes.account}>
                                    <ul>
                                        {activeUser.user.company && <Link href={{ pathname: `/company/${activeUser.user.company.id}` }} passHref ><li><a onClick={toggleUserDropdown}><i className="bi bi-stickies"></i>Объявления</a></li></Link>}
                                        <Link href={{ pathname: `/user/saved` }} passHref><li><a onClick={toggleUserDropdown}><i className="bi bi-card-checklist"></i>Сохраненные</a></li></Link>
                                        <Link href={{ pathname: `/user/account` }} passHref><li><a onClick={toggleUserDropdown}><i className="bi bi-gear"></i>Аккаунт</a></li></Link>
                                        <li onClick={logoutHandler}>
                                            <a style={{ cursor: 'pointer' }} ><i className="bi bi-box-arrow-right"></i>Выйти</a>
                                        </li>
                                    </ul>
                                </div>}
                        </li>)}
                </ul>
            </dir>
            }
        </nav >
    )
}


export default Navbar;