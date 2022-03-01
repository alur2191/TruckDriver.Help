import { useContext, useEffect } from "react";
import Link from "next/link";
import { useRouter } from 'next/router'
import classes from './sidebar.module.css'
import UserContext from '../../store/user-context'

function Sidebar() {
    const router = useRouter();
    const userCtx = useContext(UserContext);

    const activeUser = userCtx.user
    return (
        <aside className={classes.main}>
            <h3>Настройки</h3>
            <ul>

                <li>
                    <Link href={{ pathname: `/user/account` }}>
                        <a className={router.asPath === '/user/account' ? 'underline' : undefined}>
                            Общее
                        </a>
                    </Link>
                </li>
                {activeUser && activeUser.user.company &&
                    <>
                        <li>
                            <Link href={{ pathname: `/company/edit` }}>
                                <a className={router.asPath === '/company/edit' ? 'underline' : undefined}>
                                    Компания
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href={{ pathname: `/company/trucks` }}>
                                <a className={router.asPath === '/company/trucks' ? 'underline' : undefined}>
                                    Траки
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href={{ pathname: `/company/trailers` }}>
                                <a className={router.asPath === '/company/trailers' ? 'underline' : undefined}>
                                    Трейлеры
                                </a>
                            </Link>
                        </li>
                    </>
                }

            </ul>
        </aside>
    );
}

export default Sidebar;