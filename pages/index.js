
import { useContext } from "react";
import classes from "./index.module.css";
import { useSession } from "next-auth/react"
// import AdvancedSearch from "../components/filters/advancedSearch"
import JobListing from "../components/jobs/jobListing";
import Filters from "../components/filters/filters";
import Link from 'next/link'
import UserContext from '../store/user-context'
import { PrismaClient } from "@prisma/client";
import Sidebar from "../components/layout/sidebar";


function Home({ jobs }) {

  const { data: session, status } = useSession()


  const userCtx = useContext(UserContext)
  const activeUser = userCtx.user;
  return (
    <div className={classes.main}>
      {/*Display list of all available jobs*/}
      <div className={classes.body}>
        <div className={classes.head}>
          <h1>Портал Логистической Индустрии США</h1>
          <div>
            <Link href={{ pathname: "/jobs" }}>
              <a>
                <div>
                  <i className="bi bi-truck-flatbed"></i>
                  <h2>Искать Работу</h2>
                  <p>Поиск работы в траковых компаниях с помощью расширенных фильтров</p>
                </div>
              </a>
            </Link>
            <Link href={{ pathname: `/jobs/form` }}>
              <a>
                <div>
                  <i className="bi bi-card-list"></i>
                  <h2>Подать Объявление</h2>
                  <p>Бесплатное размещение объявлений для траковых компаний</p>
                </div>
              </a>
            </Link>
          </div>
        </div>
        <div className={classes.listings} >
          <Filters />
          {jobs
            ? jobs.map((job) => <div key={job.id} className="listing">
              <JobListing job={job} />

            </div>)
            : <div className="loader"></div>}
          <div style={{ display: 'flex', justifyContent: 'center', textDecoration: 'underline' }}>
            <Link href="/jobs"><a>Показать ещё...</a></Link>
          </div>
        </div>
        <div>
          <h1>О Проекте TruckDriver.help</h1>
          <iframe src="https://www.youtube.com/embed/YqWBkSoaaAs" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          <p>TruckDriver.help это уникальный онлайн проект нацеленный помочь иммигрантам работающим в траковой индустрии. На данный момент основная платформа состоит из объявлений логистических компаний. Желающие найти работу в индустрии, смогут воспользоваться расширенными фильтрами предоставленные на сайте, для поиска работы по указанным критериям.</p>
        </div>
      </div>
      <aside className={classes.sidebar}>
        {/* Temporarily disabled */}
        {/* <AdvancedSearch /> */}

        {/* Auth Form */}
        {
          activeUser && activeUser.user.company ?
            <Link href={{ pathname: "/jobs/form" }} passHref><button>Подать Объявление</button></Link> :
            activeUser && activeUser.user && !activeUser.user.company && activeUser.user.activated &&
            <Link href={{ pathname: "/company/form" }} passHref><button>Зарегистрировать Компанию</button></Link>
        }
        <Sidebar />
      </aside>
    </div >
  );
}

export async function getServerSideProps() {
  const prisma = new PrismaClient();
  // Fetch all posted jobs and include related items from Company table
  const jobs = await prisma.job.findMany({
    take: 3,
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

export default Home;
