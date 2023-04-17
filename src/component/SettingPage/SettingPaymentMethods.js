import React, { useState } from "react";
import '../../css/SettingPage/SettingPaymentMethods.css'

function SettingPaymentMethods(){
    return(
        <div className="settingpaymentmethods">
            <div className="settingpaymentmethods-container">
                <div className="paymentmethods-detail-block">
                    <p>Card number</p>
                    <input placeholder="1234 1234 1234 1234"/>
                </div>

                <div className="paymentmethods-detail-block">
                    <p>Expiration</p>
                    <input placeholder="MM/YY"/>
                </div>

                <div className="paymentmethods-detail-block">
                    <p>CVC</p>
                    <input placeholder="CVC"/>
                </div>

                <div className="paymentmethods-detail-block">
                    <p>Country</p>
                    <select>
                        <option>Thailand</option>
                        <option>USA</option>
                    </select>
                </div>


                <div className="paymentmethods-detail-block">
                    <p className="save">Save</p>
                </div>
            </div>
        </div>
    )
}

export default SettingPaymentMethods