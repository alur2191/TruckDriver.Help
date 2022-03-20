import Image from 'next/image'
import { useContext, useState, useEffect, useRef } from "react";
import Link from 'next/link'
import classes from './navbar.module.css'
import { signOut } from 'next-auth/client'
import UserContext from '../../store/user-context'
// import { parseISO, formatDistanceToNowStrict } from "date-fns";
// import locale from 'date-fns/locale/en-US'

function Navbar() {
    const [userDropdown, setUserDropdown] = useState(false)
    const [mobile, setMobile] = useState(false)
    // const [notificationDropdown, setNotificationDropdown] = useState(false)
    const userRef = useRef()
    // const notificationRef = useRef()
    const userCtx = useContext(UserContext)
    const activeUser = userCtx.user;
    // const activeNotification = notificationCtx.notification;
    useEffect(() => {
        const checkIfClickedOutside = e => {
            // If the menu is open and the clicked target is not within the menu,
            // then close the menu
            if (userDropdown && userRef.current && !userRef.current.contains(e.target)) {
                setUserDropdown(false)
            }
        }

        document.addEventListener("mousedown", checkIfClickedOutside)

        return () => {
            // Cleanup the event listener
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [userDropdown])

    function logoutHandler() {
        signOut()
        toggleUserDropdown()
    }
    const toggleUserDropdown = () => setUserDropdown(!userDropdown)
    // const toggleNotificationDropdown = async () => {
    //     if (!notificationDropdown) {
    //         setNotificationDropdown(!notificationDropdown)
    //         const notifications = await fetch("/api/notification/getNotifications", {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({ id: activeUser.user.id }),
    //         })
    //         notifications.json().then(body => notificationCtx.setNotification({
    //             ...body
    //         }));
    //     } else {
    //         setNotificationDropdown(!notificationDropdown)
    //     }
    // }

    // const formatDistanceLocale = {
    //     lessThanXSeconds: '{{count}}с',
    //     xSeconds: '{{count}}с',
    //     halfAMinute: '30с',
    //     lessThanXMinutes: '{{count}}м',
    //     xMinutes: '{{count}}м',
    //     aboutXHours: '{{count}}ч',
    //     xHours: '{{count}}ч',
    //     xDays: '{{count}}д',
    //     aboutXWeeks: '{{count}}н',
    //     xWeeks: '{{count}}н',
    //     aboutXMonths: '{{count}}м',
    //     xMonths: '{{count}}м',
    //     aboutXYears: '{{count}}л',
    //     xYears: '{{count}}л',
    //     overXYears: '{{count}}л',
    //     almostXYears: '{{count}}л',
    // }

    // function formatDistance(token, count, options) {
    //     options = options || {}

    //     const result = formatDistanceLocale[token].replace('{{count}}', count)

    //     if (options.addSuffix) {
    //         if (options.comparison > 0) {
    //             return 'in ' + result
    //         } else {
    //             return result + ' ago'
    //         }
    //     }

    //     return result
    // }

    return (
        <nav className={classes.navbar} >
            <Link href="/" passHref>
                <a>
                    <Image src="/images/logo.png" alt="" width={109} height={40} />
                </a>
            </Link>
            <ul>
                {!activeUser && <Link href={{ pathname: "/auth" }} passHref><li className={classes.register}><a style={{ cursor: 'pointer' }}><i className="bi bi-person-fill"></i>Войти</a></li></Link>}
                {activeUser && activeUser.user && activeUser.user.company &&
                    <li>
                        <Link href={{ pathname: "/jobs/form" }} passHref>
                            <a><i className="bi bi-plus-circle-fill"></i>Добавить Объявление</a>
                        </Link>
                    </li>}
                {activeUser && activeUser.user && !activeUser.user.company && activeUser.user.activated &&
                    <li>
                        <Link href={{ pathname: "/company/form" }} passHref>
                            <a><i className="bi bi-briefcase-fill"></i>Зарегистрировать Компанию</a>
                        </Link>
                    </li>}
                {activeUser && (
                    <li style={{ position: 'relative' }}>
                        <a style={{ cursor: 'pointer' }} onClick={() => toggleUserDropdown()}><i className="bi bi-person-fill"></i>{activeUser.user.email}</a>
                        {userDropdown &&
                            <div ref={userRef} className={classes.account}>
                                <ul>
                                    {activeUser.user.company && <Link href={{ pathname: `/company/${activeUser.user.company.id}` }}><li><a onClick={toggleUserDropdown}><i className="bi bi-stickies"></i>Объявления</a></li></Link>}
                                    <Link href={{ pathname: `/user/saved` }} passHref><li><a onClick={toggleUserDropdown}><i className="bi bi-card-checklist"></i>Сохраненные</a></li></Link>
                                    <Link href={{ pathname: `/user/account` }} passHref><li><a onClick={toggleUserDropdown}><i className="bi bi-gear"></i>Аккаунт</a></li></Link>
                                    <li onClick={logoutHandler}>
                                        <a style={{ cursor: 'pointer' }}><i className="bi bi-box-arrow-right"></i>Выйти</a>
                                    </li>
                                </ul>
                            </div>}
                    </li>)}
            </ul>
            <i onClick={() => setMobile(!mobile)} className="bi bi-list bu-m-menu"></i>
            {mobile && <dir className="mobile-nav">
                <ul>
                    {!activeUser && <Link href={{ pathname: "/auth" }} passHref><li><a style={{ cursor: 'pointer' }}><i className="bi bi-person-plus-fill"></i>Регистрация</a></li></Link>}
                    {activeUser && activeUser.user.company &&
                        <Link href={{ pathname: "/jobs/form" }} passHref>
                            <li>
                                <a><i className="bi bi-plus-circle-fill"></i>Добавить Объявление</a>
                            </li>
                        </Link>}
                    {activeUser && !activeUser.user.company && !activeUser.user.activated &&
                        <Link href={{ pathname: "/company/form" }} passHref>
                            <li>
                                <a><i className="bi bi-briefcase-fill"></i>Зарегистрировать Компанию</a>
                            </li>
                        </Link>}
                    {activeUser && (
                        <li style={{ position: 'relative' }}>
                            <a style={{ cursor: 'pointer' }} onClick={() => toggleUserDropdown()}><i className="bi bi-person-fill"></i>{activeUser.user.email}</a>
                            {userDropdown &&
                                <div ref={userRef} className={classes.account}>
                                    <ul>
                                        {activeUser.user.company && <Link href={{ pathname: `/company/${activeUser.user.company.id}` }}><li><a onClick={toggleUserDropdown}><i className="bi bi-stickies"></i>Объявления</a></li></Link>}
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