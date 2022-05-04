import classes from './resources.module.css'
import Link from 'next/link'

function Resources() {
  return (
    <div className={classes.main}>
      {/*Display list of all available jobs*/}
      <div className={classes.body}>
        <div>
          <h1>Ресурсы</h1>
          <ol style={{ listStyleType: "disc", display: "flex", flexDirection: "column", gap: 10, padding: "0 0 0 10px" }}>
            <li><a href="#mobile">Мобильные Приложения</a></li>
            <li><a href="#software">Компьютерные Программы</a></li>
            <li><a href="#company">Ресурсы для компаний</a></li>
            <li><a href="#communities">Сообщества, Школы, Мастерские, и прочие.</a></li>
          </ol>
          <div id="mobile">
            <h2>Мобильные Приложения</h2>
            <div>
              <p><strong>Trucker Path</strong> — независимо от того, ищете ли вы парковку, цены на топливо или статус станции взвешивания, Trucker Path может помочь вам во всем.</p>
              <div className={classes.download}>
                <a href="https://apps.apple.com/us/app/trucker-path-truck-gps-maps/id782746890">
                  <img src='./images/mobile/ios.svg' height={30} />
                </a>
                <a href="https://play.google.com/store/apps/details?id=com.sixdays.truckerpath&hl=en_US&gl=US">
                  <img src='./images/mobile/android.svg' height={30} />
                </a>
              </div>
              <p><strong>GasBuddy</strong> — приложение для поиска низких цен на бензин, в том числе на дизельное топливо.</p>
              <div className={classes.download}>
                <a href="https://apps.apple.com/us/app/gasbuddy-find-pay-for-gas/id406719683">
                  <img src='./images/mobile/ios.svg' height={30} />
                </a>
                <a href="https://play.google.com/store/apps/details?id=gbis.gbandroid&hl=en_US&gl=US">
                  <img src='./images/mobile/android.svg' height={30} />
                </a>
              </div>
              <p><strong>CamScanner</strong> — превратит ваше устройство в мощный портативный сканер, который автоматически распознает текст.</p>
              <div className={classes.download}>
                <a href="https://apps.apple.com/us/app/camscanner-pdf-scanner-app/id388627783">
                  <img src='./images/mobile/ios.svg' height={30} />
                </a>
                <a href="https://play.google.com/store/apps/details?id=com.intsig.camscanner&hl=en_US&gl=US">
                  <img src='./images/mobile/android.svg' height={30} />
                </a>
              </div>
              <p><strong>Trucker Tools</strong> — это приложение также используется дальнобойщиками, чтобы найти ближайшую остановку для грузовиков, узнать цены на дизельное топливо в режиме реального времени и найти самый быстрый маршрут для доставки груза.</p>
              <div className={classes.download}>
                <a href="https://apps.apple.com/us/app/trucker-tools/id362413088">
                  <img src='./images/mobile/ios.svg' height={30} />
                </a>
                <a href="https://play.google.com/store/apps/details?id=com.salebug.truckstop&hl=en_US&gl=US">
                  <img src='./images/mobile/android.svg' height={30} />
                </a>
              </div>
              <p><strong>Drivewyze</strong> — это бесплатное приложение для дальнобойщиков, которое позволяет обходить станции взвешивания, более чем 700 объектах.</p>
              <div className={classes.download}>
                <a href="https://apps.apple.com/us/app/drivewyze/id555769428">
                  <img src='./images/mobile/ios.svg' height={30} />
                </a>
                <a href="https://play.google.com/store/apps/details?id=com.drivewyze.agatha2&hl=en_US&gl=US">
                  <img src='./images/mobile/android.svg' height={30} />
                </a>
              </div>
              <p><strong>Weigh My Truck</strong> — позволяет дальнобойщикам взвешивать свой грузовик, осущеставлять транзакцию через PayPal, EFS, Comdata, ACH или кредитную карту и отображать вес на своем телефоне.</p>
              <div className={classes.download}>
                <a href="https://apps.apple.com/us/app/weigh-my-truck/id934521459">
                  <img src='./images/mobile/ios.svg' height={30} />
                </a>
                <a href="https://play.google.com/store/apps/details?id=com.catscale.weighmytruck&hl=en_US&gl=US">
                  <img src='./images/mobile/android.svg' height={30} />
                </a>
              </div>
              <p><strong>Fuelbook</strong> — это альтернативное приложение которое позволяет найти низкие цены на топливо.</p>
              <div className={classes.download}>
                <a href="https">
                  <img src='./images/mobile/ios.svg' height={30} />
                </a>
                <a href="https">
                  <img src='./images/mobile/android.svg' height={30} />
                </a>
              </div>
              <p><strong>iExit</strong> — это хорошое приложение для тех, кто много ездит по скоростной дороге. Это приложение сообщает вам, какие ближайшие выезды и что вы найдете на каждом выезде в отношении отелей, топлива, ресторанов и т. д. Оно отображает предстоящие выезды в режиме реального времени.</p>
              <div className={classes.download}>
                <a href="https">
                  <img src='./images/mobile/ios.svg' height={30} />
                </a>
                <a href="https">
                  <img src='./images/mobile/android.svg' height={30} />
                </a>
              </div>
              <p><strong>Dark Sky</strong> — это самый точный источник гиперлокальной информации о погоде: с поминутными прогнозами для вашего точного местоположения.</p>
              <div className={classes.download}>
                <a href="https">
                  <img src='./images/mobile/ios.svg' height={30} />
                </a>
                <a href="https">
                  <img src='./images/mobile/android.svg' height={30} />
                </a>
              </div>
              <p><strong>Weather Channel</strong> — является надежным источником обновлений погоды и всех новостей, связанных с погодой.</p>
              <div className={classes.download}>
                <a href="https">
                  <img src='./images/mobile/ios.svg' height={30} />
                </a>
                <a href="https">
                  <img src='./images/mobile/android.svg' height={30} />
                </a>
              </div>
              <p><strong>TRANSFLO Mobile+</strong> — c помощью этого приложения вы можете сканировать и отправлять документы, отслеживать часы работы, получать электронные подписи, получать доступ к отчетам о расчетах, общаться с диспетчерами и многое другое.</p>
              <div className={classes.download}>
                <a href="https">
                  <img src='./images/mobile/ios.svg' height={30} />
                </a>
                <a href="https">
                  <img src='./images/mobile/android.svg' height={30} />
                </a>
              </div>
              <p><strong>Trucker{`'`}s Slide Calc</strong> — Введите вес вашей оси, и приложение рассчитает, насколько каждая ось выше или ниже.</p>
              <div className={classes.download}>
                <a href="https">
                  <img src='./images/mobile/ios.svg' height={30} />
                </a>
                <a href="https">
                  <img src='./images/mobile/android.svg' height={30} />
                </a>
              </div>
            </div>
          </div>
          <div id="software">
            <h2>Компьютерные Программы</h2>
            <div>
              <p><strong><a href="https://www.autohotkey.com/">AutHotkey</a></strong> — бесплатная программа для автоматизации различных действий в Windows.</p>
              <p><strong><a href="https://www.grammarly.com/">Grammarly</a></strong> — помощник по набору текста, который проверяет орфографию, грамматику, пунктуацию, четкость, вовлеченность и ошибки доставки на английском.</p>
              <p><strong><a href="https://bluemars.org/clipx/">ClipX</a></strong> — менеджер буфера обмена.</p>
              <p><strong><a href="https://todo.microsoft.com/">Mircosoft To Do</a></strong> — позволяет управлять составлять график задач со смартфона, планшета и компьютера.</p>
            </div>
          </div>
          <div id="company">
            <h2>Ресурсы для компаний</h2>
            <p><strong><a href="https://www.aviationweather.gov/radar/">Aviation Weather Center</a></strong> — Авиационный метеорологический центр предоставляет последовательную, своевременную и точную информацию о погоде для мировой системы воздушного пространства.</p>
            <p><strong><a href="https://zapier.com/">Zapier</a></strong> — сервис для автоматизации различных веб-приложений.</p>
            <p><strong><a href="https://trello.com/">Trello</a></strong> — помогает управляйть проектами, организовываьйте задачи и совместную работу в команде</p>
            <p><strong><a href="https://ninite.com/">Ninite</a></strong> — Облегчает установку и обновление различных программ.</p>
          </div>
          <div id="communities">
            <h2>Сообщества, Школы, Мастерские, и прочие.</h2>
            <p>Призываем школы, интернет сообщества, ремонтные мастерские, и прочие организации, связанные с логистической индустрией присоедениться в базу полезных ресурсов нашего сайта.</p>
            <p><i className="bi bi-file-earmark-check"></i><a style={{ paddingLeft: '5px' }} href="https://www.google.com">Заполните форму для подачи заявки.</a></p>
            {/* <p><strong>Boxtrucks {"&"} Cargovans USA</strong> — Lorem</p>


                <p><strong>Sprinter Дальнобой США</strong> — Lorem</p>

              </div>
              <div>
            <h2>Школы CDL</h2>*/}
          </div>
        </div>
      </div>
      <aside className={classes.sidebar}>

        <div className={classes.resources}>
          <h3>Ресурсы</h3>
          <ul>
            <li><a href="https://academy.truckdriver.help/course/dispatch/0"><i className="bi bi-play-circle"></i>
              Видео курсы</a></li>
            <li><a href="https://academy.truckdriver.help/quiz"><i className="bi bi-file-earmark-text"></i>
              CDL тесты с переводом</a></li>
            <li>
              <Link href="/resources">
                <a><i className="bi bi-folder-symlink"></i>
                  Полезные ресурсы</a>
              </Link>
            </li>
          </ul>
        </div>
        {/* Collaboration Announcement */}
        <div className={classes.collab}>
          <h3>Сотрудничество</h3>
          <p>Призываем школы, сообщества, ремонтные мастерские, и прочие организации, связанные с логистической индустрией присоедениться в базу полезных ресурсов нашего сайта.</p>
          <p><i className="bi bi-file-earmark-check"></i><a style={{ paddingLeft: '5px' }} href="https://www.google.com">Заполните форму для подачи заявки.</a></p>
        </div>
      </aside>
    </div >
  )
}


export default Resources;