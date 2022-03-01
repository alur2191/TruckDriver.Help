import { createContext, useState } from 'react'

const NotificationContext = createContext({
    notification: null,
    setNotification: function () { },
    setRead: function () { }
})


export function NotificationContextProvider(props) {
    const [activeNotification, setActiveNotification] = useState({})

    function setNotificationHandler(notificationData) {
        setActiveNotification(notificationData)
    }

    function setReadHandler(i) {
        const notifications = activeNotification
        console.log(i);
        console.log(notifications.notifications[i].read);
        notifications.notifications[i].read = !notifications.notifications[i].read
        console.log(notifications);
        setActiveNotification(notifications)
    }

    const context = {
        notification: activeNotification,
        setNotification: setNotificationHandler,
        setRead: setReadHandler
    };

    return (
        <NotificationContext.Provider value={context}>
            {props.children}
        </NotificationContext.Provider>
    )
}



export default NotificationContext