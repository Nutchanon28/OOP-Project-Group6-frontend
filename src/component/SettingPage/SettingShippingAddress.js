import React, { useState } from "react";
import '../../css/SettingPage/SettingShippingAddress.css'

function SettingShippingAddress(){
    return(
        <div className="settingshippingaddress">
            <div className="settingshippingaddress-container">
                <div className="new-address-and-saved-address-block">
                    <div className="new-address-detail-block">
                        <p className="address-type">New address</p>
                        <div className="settingshippingaddress-detail-block">
                            <p>Country</p>
                            <select>
                            <option>Thailand</option>
                            <option>USA</option>
                            </select>
                        </div>

                        <div className="settingshippingaddress-detail-block">
                            <p>Address nickname</p>
                            <input/>
                        </div>

                        <div className="settingshippingaddress-detail-block">
                            <p>Full name</p>
                            <input/>
                        </div>

                        <div className="settingshippingaddress-detail-block">
                            <p>Address</p>
                            <input/>
                        </div>

                        <div className="settingshippingaddress-detail-block">
                            <p>City</p>
                            <input/>
                        </div>

                        <div className="settingshippingaddress-detail-block">
                            <p>Phone number</p>
                            <input/>
                        </div>

                        
                        <div className="paymentmethods-detail-block">
                            <p className="save">Save</p>
                        </div>
                    </div>

                    <div className="new-address-detail-block">
                        <p className="address-type">Saved address</p>
                        <div className="settingshippingaddress-detail-block">
                            <p>Home 1/34 Village Bangkok, Thailand</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SettingShippingAddress

//country, address_nickname, full_name, address, city, phone_number