import Image from 'next/image'
import { useContext, useState } from "react";
import Link from 'next/link'
import classes from './navbar.module.css'
import { signOut} from 'next-auth/client'
import UserContext from '../../store/user-context'


function Navbar () {
    const [dropdown,setDropdown]= useState(false)
    const userCtx = useContext(UserContext)
    const activeUser = null;
    if(process.env.MAINTENANCE_MODE===0){
        activeUser =  userCtx.user;
        
    }
    function logoutHandler() {
        signOut()
    }
    const toggleDropdown = () =>setDropdown(!dropdown)
    return(
    <nav className={classes.navbar}>
        <Link href="/">
            <a>
                <Image src="/images/logo.png" alt="" width={115} height={40}/>
            </a>
        </Link>
        <ul>
            {activeUser&&activeUser.user&&activeUser.user.company &&
                <li>
                    <Link href={{pathname: "/jobs/form"}}>
                        <a><i className="bi bi-plus-circle-fill"></i>Добавить Объявление</a>
                    </Link>
                </li>}
            {activeUser&&activeUser.user&&!activeUser.user.company&&!activeUser.user.activated &&
                <li>
                    <Link href={{pathname: "/company/form"}}>
                        <a><i className="bi bi-briefcase-fill"></i>Зарегистрировать Компанию</a>
                    </Link>
                </li>}
            {activeUser&&activeUser.user&&(
                <li style={{position:'relative'}}>
                    <a style={{cursor: 'pointer'}} onClick={()=>toggleDropdown()}><i className="bi bi-person-fill"></i>{activeUser.user.email}</a>
                    {dropdown&&
                        <div className={classes.account}>
                            <ul>
                                <li><Link href={{pathname: `/user/jobs/${activeUser.user.company.id}`}}><a><i className="bi bi-stickies"></i>Объявления</a></Link></li>
                                <li><Link href={{pathname: `/user/saved`}}><a><i className="bi bi-card-checklist"></i>Сохраненные</a></Link></li>
                                <li><Link href={{pathname: `/user/account`}}><a><i className="bi bi-gear"></i>Аккаунт</a></Link></li>
                                <li>
                                    <a style={{cursor:'pointer'}}onClick={logoutHandler}><i className="bi bi-box-arrow-right"></i>Выйти</a>
                                </li>
                            </ul>
                        </div>}
                </li>)}
                
        </ul>
    </nav>
    )
}


export default Navbar;