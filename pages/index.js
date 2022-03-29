
import { useContext } from "react";
import classes from "./index.module.css";
import AuthForm from "../components/auth/auth-form";
import { useSession } from 'next-auth/client'
// import AdvancedSearch from "../components/filters/advancedSearch"
import Support from "../components/ui/support"
import Link from 'next/link'
import UserContext from '../store/user-context'


function Home() {
  const [session] = useSession()

  const userCtx = useContext(UserContext)
  const activeUser = userCtx.user;
  return (
    <div className={classes.main}>
      {/*Display list of all available jobs*/}
      <div className={classes.body}>
        <div className={classes.head}>
          <h1>Портал Логистической Индустрии США</h1>
          <Link href={{ pathname: "/jobs" }}>
            <a>
              <div>
                <i className="bi bi-truck-flatbed"></i>
                <h2>Искать Работу</h2>
                <p>Поиск работы в траковых компаниях с
                  помощью расширенных фильтров</p>
              </div>
            </a>
          </Link>
          <Link href={{ pathname: `/jobs/form` }}>
            <a>
              <div>
                <i className="bi bi-card-list"></i>
                <h2>Подать Объявление</h2>
                <p>Траковые компании могут бесплатно размещать объявления на сайте.</p>
              </div>
            </a>
          </Link>
        </div>
        <div>
          <h1>О Проекте TruckDriver.help</h1>
          <iframe src="https://www.youtube.com/embed/2TeHq1JdmK4" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          <p>TruckDriver.help это уникальный онлайн проект нацеленный помочь иммигрантам работающим в траковой индустрии. На данный момент основная платформа состоит из объявлений логистических компаний. Желающие найти работу в индустрии, смогут воспользоваться расширенными фильтрами предоставленные на сайте, для поиска работы по указанным критериям.</p>
          <p>Мы также намерены предоставлять учебные материалы для людей в различной стадии карьеры - без CDL, с опытом, Owner-operator, а также компаниям и их диспетчерам. Учебные материалы вы можете найти по адресу <a href="http://academy.truckdriver.help">academy.truckdriver.help</a></p>
          <Support />
        </div>
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
    </div >
  );
}

export default Home;
