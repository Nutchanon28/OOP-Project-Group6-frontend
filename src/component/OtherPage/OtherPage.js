import React from "react";
import { Route, Routes } from "react-router-dom";
// import Footer from "./Footer";
// import FreshFavorites from "./FreshFavorites";
// import SearchResult from "./SearchResult";
// import ViewProfile from "./ViewProfile";
import AddUpdate from "./AddUpdate";

// try to import Rainbow's part (i think it has a better way to import this)
// import * as page from '../SettingPage/SettingPage'
// import SettingHeader from "../SettingPage/SettingHeader";
// import SettingAccount from "../SettingPage/SettingAccount";
// import SettingEditProfile from "../SettingPage/SettingEditProfile";
// import SettingNotifications from "../SettingPage/SettingNotifications";
// import SettingPaymentMethods from "../SettingPage/SettingPaymentMethods";
// import SettingShippingAddress from "../SettingPage/SettingShippingAddress";


function OtherPage(){
    return (
        <div>
            {/* <Footer/> */}
            {/* <FreshFavorites/> */}
            {/* <SearchResult/> */}
            {/* <ViewProfile/> */}
            <AddUpdate/>
            
            {/* the thing after this is what i try to link with Rainbow's part but it's doesn't work yet, So you can delete it away*/}
            {/* <SettingHeader/>
            <Routes>
                <Route path="" element={<SettingAccount/>}/>
                <Route path="settingeditprofile" element={<SettingEditProfile/>}/>
                <Route path="settingnotifications" element={<SettingNotifications/>}/>
                <Route path="settingpaymentmethods" element={<SettingPaymentMethods/>}/>
                <Route path="settingshippingaddress" element={<SettingShippingAddress/>}/>
            </Routes> */}
        </div>
    )
}

export default OtherPage

