import React, { useContext, useEffect, useState } from "react";
import { BiCommentDetail } from "react-icons/bi";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { AiOutlineNotification } from "react-icons/ai";
import axios from "axios";

import "../../css/SettingPage/SettingNotifications.css";
import DataContext from "../../context/DataContext";

function SettingNotifications() {
  const { userId } = useContext(DataContext);
  const [backedNotifications, setBackedNotifications] = useState([]);
  const [receivedNotifications, setReceivedNotifications] = useState([]);

  useEffect(() => {
    const getProjects = async () => {
      const response = await axios.get(
        `http://127.0.0.1:8000/view_notifications/${userId}`
      );
      console.log(response);
      const backedNotifications = response.data.filter(
        (notification) =>
          notification._Notification__title === "Backing" ||
          notification._Notification__title === "Update"
      );
      const receivedNotifications = response.data.filter(
        (notification) => notification._Notification__title === "Receiving"
      );
      setBackedNotifications(backedNotifications);
      setReceivedNotifications(receivedNotifications);
      console.log(backedNotifications);
      console.log(receivedNotifications);
    };
    getProjects();
  }, []);

  return (
    <div className="settingnotifications">
      <div className="settingnotifications-container">
        <div className="notifications-detail-block">
          <p className="notification-type">Projects you've launched</p>
          <div className="notification-element">
            <BiCommentDetail />
            <p>New backings</p>
            {backedNotifications.map((notification) => {
              return (
                <>
                  <p>{notification._Notification__title}</p>
                  <p>{notification._Notification__detail}</p>
                </>
              );
            })}
          </div>
        </div>

        <div className="notifications-detail-block">
          <p className="notification-type">Projects you've backed</p>
          <div className="notification-element">
            <MdOutlineNotificationsActive />
            <p>Project updates</p>
            {receivedNotifications.map((notification) => {
              return (
                <>
                  <p>{notification._Notification__title}</p>
                  <p>{notification._Notification__detail}</p>
                </>
              );
            })}
          </div>
        </div>

        <div className="notifications-detail-block">
          <p className="notification-type">Announcements</p>
          <div className="notification-element">
            <AiOutlineNotification />
            <p>
              Big Kickstarter news, plus occasional projects and events chosen
              just for you
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SettingNotifications;
