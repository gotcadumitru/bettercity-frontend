import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleIsNotificationShowAC } from '../../state/action/notification.action';

const Notification = () => {
  const { isNotificationShow, isErrorNotification, notificationMessage, notificationTime } = useSelector((state) => state.notification);
  const dispatch = useDispatch();
  const closeNotification = () => {
    dispatch(handleIsNotificationShowAC(false, isErrorNotification));
  };
  useEffect(() => {
    let timeout;
    if (isNotificationShow || notificationMessage) {
      timeout = setTimeout(() => {
        closeNotification();
      }, notificationTime);
    }
    return () => clearTimeout(timeout);
    // eslint-disable-next-line
  }, [isNotificationShow, notificationMessage]);
  return (
    <div
      className={`notification ${isErrorNotification ? 'notification--error' : 'notification--success'} ${
        isNotificationShow ? 'notification--active' : ''
      } `}
    >
      <div className="notification__body">
        <div className="notification__message">{notificationMessage}</div>
      </div>
      {/* <div className="notification__close-container">{handleCloseIcon()}</div> */}
    </div>
  );
};
export default Notification;
