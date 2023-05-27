import classes from './sidebar.module.css'
import Link from 'next/link'

function Sidebar() {
  return (
    <>
      <div className={classes.main}>
        <h3>Ресурсы</h3>
        <ul>
          <h4>Учеба</h4>
          <li><a href="https://academy.truckdriver.help/course/dispatch/0"><i className="bi bi-play-circle"></i>
            Видео курсы</a></li>
          <li><a href="https://academy.truckdriver.help/quiz"><i className="bi bi-file-earmark-text"></i>
            CDL тесты с переводом</a></li>
          <h4>Ресурсы</h4>
          <li>
            
              <a href="https://www.dmvhelp.app/"><i className="bi bi-phone"></i>
                DMV Тесты</a>
          </li>
          <li>
            <Link href="/resources/#mobile">
              <a><i className="bi bi-phone"></i>
                Мобильные Приложения</a>
            </Link>
          </li>
          <li>
            <Link href="/resources/#software">
              <a><i className="bi bi-laptop"></i>
                Компьютерные Программы</a>
            </Link>
          </li>
          <li>
            <Link href="/resources/#company">
              <a><i className="bi bi-building"></i>
                Ресурсы для компаний</a>
            </Link>
          </li>
          <li>
            <Link href="/resources/#communities">
              <a><i className="bi bi-people"></i>
                Сообщества, Школы, Мастерские, и прочие.</a>
            </Link>
          </li>
					<li style={{ cursor: 'pointer' }}>
              <a href="https://t.me/NewYorkChat24"><i className="bi bi-telegram"></i>Телеграм группа - New York Chat</a>
          </li>
          <li style={{ cursor: 'pointer' }}>
              <a href="https://t.me/truckdriverhelp"><i className="bi bi-telegram"></i>Телеграм Канал TruckDriver.help</a>
          </li>
        </ul>
      </div>
      {/* Collaboration Announcement */}
      <div className={classes.collab}>
        <h3>Сотрудничество</h3>
        <p>Призываем школы, сообщества, ремонтные мастерские, и прочие организации, связанные с логистической индустрией присоедениться в базу полезных ресурсов нашего сайта.</p>
        <p><i className="bi bi-file-earmark-check"></i><a style={{ paddingLeft: '5px' }} href="https://forms.gle/zZHdQDVtT3JCQqWM8">Заполните форму для подачи заявки.</a></p>
      </div>
    </>
  )
}


export default Sidebar;
