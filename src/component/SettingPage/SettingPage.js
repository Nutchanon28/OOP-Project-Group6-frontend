import React from "react";
import SettingHeader from "./SettingHeader";
import SettingAccount from "./SettingAccount";
import SettingEditProfile from "./SettingEditProfile";
import SettingNotifications from "./SettingNotifications";
import SettingPaymentMethods from "./SettingPaymentMethods";
import SettingShippingAddress from "./SettingShippingAddress";

function SettingPage(){
    return (
        <div>
            <SettingHeader/>
            {/* <SettingAccount/> */}
            {/* <SettingEditProfile/> */}
            {/* <SettingNotifications/> */}
            {/* <SettingPaymentMethods/> */}
            <SettingShippingAddress/>
        </div>
    )
}

export default SettingPage
