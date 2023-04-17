import React, { useState } from "react";
import '../../css/SettingPage/SettingNotifications.css'

function SettingNotifications(){
    return(
        <div className="settingnotifications">
            <div className="settingnotifications-container">
                <div className="notifications-detail-block">
                    <p>Projects you've launched</p>
                    <p>New comments</p>
                </div>

                <div className="notifications-detail-block">
                    <p>Projects you've backed</p>
                    <p>Project updates</p>
                </div>

                <div className="notifications-detail-block">
                    <p>Announcements</p>
                    <p>Big Kickstarter news, plus occasional projects and events chosen just for you</p>
                </div>
            </div>
        </div>
    )
}
export default SettingNotifications