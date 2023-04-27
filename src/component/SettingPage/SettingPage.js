import React from "react";
import SettingHeader from "./SettingHeader";
import SettingAccount from "./SettingAccount";
import SettingEditProfile from "./SettingEditProfile";
import SettingNotifications from "./SettingNotifications";
import SettingPaymentMethods from "./SettingPaymentMethods";
import SettingShippingAddress from "./SettingShippingAddress";
import { Route, Routes } from "react-router-dom";

function SettingPage(){
    return (
        <div>
            <SettingHeader/>
            <Routes>
                <Route path="" element={<SettingAccount/>}/>
                <Route path="settingeditprofile" element={<SettingEditProfile/>}/>
                <Route path="settingnotifications" element={<SettingNotifications/>}/>
                <Route path="settingpaymentmethods" element={<SettingPaymentMethods/>}/>
                <Route path="settingshippingaddress" element={<SettingShippingAddress/>}/>
            </Routes>
        </div>
    )
}

export default SettingPage