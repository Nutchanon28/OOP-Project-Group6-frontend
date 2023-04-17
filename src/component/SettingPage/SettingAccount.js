import React, { useState } from "react";
import '../../css/SettingPage/SettingAccount.css'

function SettingAccount(){

    const [buttonState, setButtonState] = useState(false)
    

    function onchangepasswordclick(){
        setButtonState(!buttonState)
    }
    
    return(
        <div className="settingaccount">
            <div className="settingaccount-container">
                <div className="account-detail-block">
                    <p>Email</p>
                    <input/>
                </div >

                <div className="account-detail-block" onClick={onchangepasswordclick}>
                    <p>Password</p>
                    <p className="change-password">Change Password</p>
                </div>

                <div className={`account-detail-block ${buttonState ? "": "hidden"}`} >
                    <p>New Password</p>
                    <input type="password"/>
                    <p> Minimum 6 characters</p>
                </div>

                <div className="account-detail-block">
                    <p>Current Password</p>
                    <input type="password"/>
                    <p>Enter your current password to save these changes.</p>
                </div >

                <div className="account-detail-block">
                    <p className="save-settings">Save Settings</p>
                </div>

            </div>
        </div>
    )
}

export default SettingAccount