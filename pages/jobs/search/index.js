import { useContext } from "react";
import Link from "next/link"
import classes from "./index.module.css";
import JobListing from "../../../components/jobs/jobListing";
import Filters from "../../../components/filters/filters";
import AuthForm from "../../../components/auth/auth-form";
import SearchContext from '../../../store/search-context'
import { useSession } from 'next-auth/client'
import UserContext from '../../../store/user-context'



function Home() {
    const searchCtx = useContext(SearchContext)
    const [session] = useSession()

    const userCtx = useContext(UserContext)
    const activeUser = userCtx.user;
    const activeSearch = searchCtx.jobs;
    return (
        <div className={classes.main}>
            <div className="listings" >
                <Filters />
                {/* Display list of search results */}
                {activeSearch && activeSearch.jobs && activeSearch.jobs.map(job => <div key={job.id} className="listing"><JobListing job={job} /></div>)}
            </div>
            <div className={classes.sidebar}>
                {!session ?
                    <div>
                        <AuthForm />
                    </div> :
                    activeUser && activeUser.user.company ?
                        <Link href={{ pathname: "/jobs/form" }} passHref><button>Подать Объявление</button></Link> :
                        activeUser && activeUser.user && !activeUser.user.company && activeUser.user.activated &&
                        <Link href={{ pathname: "/company/form" }} passHref><button>Зарегистрировать Компанию</button></Link>
                }
            </div>
        </div>
    );
}

export default Home;
