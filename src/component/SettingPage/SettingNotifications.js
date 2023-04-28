import React, { useState } from "react";
import { BiCommentDetail } from "react-icons/bi"
import { MdOutlineNotificationsActive } from "react-icons/md"
import { AiOutlineNotification } from "react-icons/ai"

import '../../css/SettingPage/SettingNotifications.css'

function SettingNotifications(){
    return(
        <div className="settingnotifications">
            <div className="settingnotifications-container">
                <div className="notifications-detail-block">
                    <p className="notification-type">Projects you've launched</p>
                    <div className="notification-element">
                        <BiCommentDetail/> 
                        <p>New comments</p>
                    </div>
                </div>

                <div className="notifications-detail-block">
                    <p className="notification-type">Projects you've backed</p>
                    <div className="notification-element">
                        <MdOutlineNotificationsActive/> 
                        <p>Project updates</p>
                    </div>
                    <div className="notification-element">
                        <MdOutlineNotificationsActive/> 
                        <p>Project updates</p>
                    </div>
                </div>

                <div className="notifications-detail-block">
                    <p className="notification-type">Announcements</p>
                    <div className="notification-element">
                        <AiOutlineNotification/>
                        <p>Big Kickstarter news, plus occasional projects and events chosen just for you</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SettingNotifications