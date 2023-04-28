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
                <Route path="setting_edit_profile" element={<SettingEditProfile/>}/>
                <Route path="setting_notifications" element={<SettingNotifications/>}/>
                <Route path="setting_payment_methods" element={<SettingPaymentMethods/>}/>
                <Route path="setting_shipping_address" element={<SettingShippingAddress/>}/>
            </Routes>
        </div>
    )
}

export default SettingPage
