// import { useEffect } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { hideNotification } from '../../app/reducer/notificationSlice';

import classes from './notification.module.css';

function Notification(props) {
  
  const dispatch = useAppDispatch();
  const { title, message, status } = props;

  // useEffect(() => {
  //   setTimeout(()=>{
  //     hide()
  //   },4000)
  // }, [])

  const hide = () => {
    dispatch(hideNotification())
  }

  let statusClasses = '';

  if (status === 'success') {
    statusClasses = classes.success;
  }

  if (status === 'error') {
    statusClasses = classes.error;
  }

  if (status === 'pending') {
    statusClasses = classes.pending;
  }

  const activeClasses = `${classes.notification} ${statusClasses}`;

  return (
    <div className={activeClasses} onClick={hide}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}

export default Notification;