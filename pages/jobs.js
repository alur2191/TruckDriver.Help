import Link from "next/link"
import classes from "./jobs.module.css";
import JobListing from "../components/jobs/jobListing";
import Filters from "../components/filters/filters";
import AuthForm from "../components/auth/auth-form";
import { useSession } from "next-auth/react"
// import AdvancedSearch from "../components/filters/advancedSearch"
import { PrismaClient } from "@prisma/client";
import { useContext } from "react";
import UserContext from '../store/user-context'



function Jobs({ jobs }) {
  const { data: session, status } = useSession()


  const userCtx = useContext(UserContext)
  const activeUser = userCtx.user;
  return (
    <div className={classes.main}>
      {/* Display list of all available jobs */}
      <div className={classes.listings} >
        <Filters />
        {jobs
          ? jobs.map((job) => <div key={job.id} className="listing">
            <JobListing job={job} />

          </div>)
          : <div className="loader"></div>}
      </div>
      <aside className={classes.sidebar}>
        {/* Temporarily disabled */}
        {/* <AdvancedSearch /> */}

        {/* Auth Form */}
        {!session ?
          <div>
            <AuthForm />
          </div> :
          activeUser && activeUser.user.company ?
            <Link href={{ pathname: "/jobs/form" }} passHref><button>Подать Объявление</button></Link> :
            activeUser && activeUser.user && !activeUser.user.company && activeUser.user.activated &&
            <Link href={{ pathname: "/company/form" }} passHref><button>Зарегистрировать Компанию</button></Link>
        }
        {/* Beta Announcement */}
        <div className={classes.beta}>
          <h3>Бета-Тест</h3>
          <p>Сайт находится в стадии бета-тестирования. Сообщения о неполадках, предложениях, а также по другим вопросам обращаться:  </p>
          <p><em>contact{'<'}собака{'>'}truckdriver.help</em></p>
        </div>
      </aside>
    </div>
  );
}

export async function getServerSideProps() {
  const prisma = new PrismaClient();
  // Fetch all posted jobs and include related items from Company table
  const jobs = await prisma.job.findMany({
    orderBy: [
      {
        createdAt: 'desc',
      },
    ],
    include: {
      company: {
        include: {
          trucks: true,
          trailers: true
        }
      }
    }
  })
  return {
    props: {
      jobs
    }
  }
}



export default Jobs;
