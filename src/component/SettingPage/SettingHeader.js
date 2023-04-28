import React, {useState} from "react";
import '../../css/SettingPage/SettingHeader.css'
import { NavLink } from "react-router-dom";

function SettingHeader(){
    const [showUnderline1 , setShowUnderline1] = useState(true)
    const [showUnderline2 , setShowUnderline2] = useState(false)
    const [showUnderline3 , setShowUnderline3] = useState(false)
    const [showUnderline4 , setShowUnderline4] = useState(false)
    const [showUnderline5 , setShowUnderline5] = useState(false)

    const handlebutton1 = () => {
        setShowUnderline1(true)
        setShowUnderline2(false)
        setShowUnderline3(false)
        setShowUnderline4(false)
        setShowUnderline5(false)
    }
    const handlebutton2 = () => {
        setShowUnderline1(false)
        setShowUnderline2(true)
        setShowUnderline3(false)
        setShowUnderline4(false)
        setShowUnderline5(false)
    }
    const handlebutton3 = () => {
        setShowUnderline1(false)
        setShowUnderline2(false)
        setShowUnderline3(true)
        setShowUnderline4(false)
        setShowUnderline5(false)
    }
    const handlebutton4 = () => {
        setShowUnderline1(false)
        setShowUnderline2(false)
        setShowUnderline3(false)
        setShowUnderline4(true)
        setShowUnderline5(false)
    }
    const handlebutton5 = () => {
        setShowUnderline1(false)
        setShowUnderline2(false)
        setShowUnderline3(false)
        setShowUnderline4(false)
        setShowUnderline5(true)
    }

    return (
        <div className="settingheader">
            <div className="settingheader-container">
                <div className="settingheader-con">
                    <div className="settings">
                        Settings
                    </div>
                    <div className="setting-option">
                        <NavLink className={`${showUnderline1 ? 'account' : null}`} to="" onClick={() => handlebutton1()}><p>Account</p></NavLink>
                        <NavLink className={`${showUnderline2 ? 'account' : null}`} to="settingeditprofile" onClick={() => handlebutton2()}><p>Edit Profile</p></NavLink>
                        <NavLink className={`${showUnderline3 ? 'account' : null}`} to="settingnotifications" onClick={() => handlebutton3()}><p>Notifications</p></NavLink>
                        <NavLink className={`${showUnderline4 ? 'account' : null}`} to="settingpaymentmethods" onClick={() => handlebutton4()}><p>Payment Methods</p></NavLink>
                        <NavLink className={`${showUnderline5 ? 'account' : null}`} to="settingshippingaddress" onClick={() => handlebutton5()}><p>Shipping Address</p></NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SettingHeader
