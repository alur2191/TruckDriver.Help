import { Fragment, useContext } from 'react';
import classes from './icons.module.css'
import UserContext from '../../store/user-context'
import Link from 'next/link'

function Icons({job,company}) {
    const userCtx = useContext(UserContext)
    const activeUser =  userCtx.user;
    const savePost = async() => {
        try {
            const email = activeUser.user.email
            const body = { email,job };
            await fetch("/api/user/save-post", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            })
            
            
        } catch (error) {
            console.error(error);
        }
        
    }
    return (
        <Fragment>
            {activeUser&&<div className={classes.icons}>
                {activeUser.user&&activeUser.user.company&&company===activeUser.user.company.id ? null :
                <Fragment>
                    <span><i className="bi bi-flag"></i></span>
                    <span onClick={()=>savePost()}><i className="bi bi-folder-plus"></i> Сохранить</span>
                </Fragment>}
                {activeUser.user&&activeUser.user.company&&company===activeUser.user.company.id&&<span><Link href={{pathname: `/jobs/edit/${job}`}}><a><i className="bi bi-pencil"></i>Редактировать</a></Link></span>}
            </div>}
        </Fragment>
    )
}

export default Icons;