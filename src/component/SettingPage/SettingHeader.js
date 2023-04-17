import React from "react";
import '../../css/SettingPage/SettingHeader.css'

function SettingHeader(){
    return (
        <div className="settingheader">
            <div className="settingheader-container">
                <div className="settingheader-con">
                    <div className="settings">
                        Settings
                    </div>
                    <div className="setting-option">
                        <p className="account">Account</p>
                        <p>Edit Profile</p>
                        <p>Notifications</p>
                        <p>Payment Methods</p>
                        <p>Shipping Address</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SettingHeader
