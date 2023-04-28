import React, { useEffect, useState } from "react";
import '../../css/SettingPage/SettingPaymentMethods.css'

function SettingPaymentMethods(){
    const [paymentMethod, setPaymentMethod] = useState({
        _CreditCardTransaction__card_number:"",
        _CreditCardTransaction__expiration:"",
        _CreditCardTransaction__cvc:"",
        _CreditCardTransaction__country:"Thailand",
    })

    const [myPaymentMethod, setMyPaymentMethod] = useState([])

    function onPaymentMethodChange(event){
        const{name,value}=event.target
        console.log(name,value)
        setPaymentMethod((previousPayment)=>{
            return{
                ...previousPayment,
                [name] : value
            }
        })
    }

    async function getMyPaymentMethod(){
        const response = await fetch(`http://127.0.0.1:8000/get_payment_method?user_id=${1}`)
        const responsejson = await response.json()
        setMyPaymentMethod(responsejson)
        console.log(responsejson)
    }

    async function onPaymentMethodSave(){
        if (myPaymentMethod.length >= 3)
        return
        if (
            paymentMethod._CreditCardTransaction__card_number ==="" ||
            paymentMethod._CreditCardTransaction__expiration ==="" ||
            paymentMethod._CreditCardTransaction__cvc ==="" ||
            paymentMethod._CreditCardTransaction__country ===""
        )
        return
        const newPayment = {
            card_number:paymentMethod._CreditCardTransaction__card_number,
            expiration:paymentMethod._CreditCardTransaction__expiration,
            cvc:paymentMethod._CreditCardTransaction__cvc,
            country:paymentMethod._CreditCardTransaction__country
        }
        await fetch(`http://127.0.0.1:8000/add_payment_method?user_id=${1}`,{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newPayment)
        })
        getMyPaymentMethod()

        setPaymentMethod({
            _CreditCardTransaction__card_number:"",
            _CreditCardTransaction__expiration:"",
            _CreditCardTransaction__cvc:"",
            _CreditCardTransaction__country:"Thailand"
        })
    }

    async function onPaymentMethodDelete(paymentMethodID){
        console.log(paymentMethodID)
        await fetch(`http://127.0.0.1:8000/delete_payment_method?user_id=${1}&creditcard_id=${paymentMethodID}`,{
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify()
        })
        getMyPaymentMethod()
    }

    useEffect(()=>{
        getMyPaymentMethod()
    },[])

    let myPaymentMethodElements = []
    if (myPaymentMethod.length){
        myPaymentMethodElements = myPaymentMethod.map((payment) => {
            return(
                <div key={payment.id} className="saved-paymentmethod-detail-block">
                    <p>{payment._CreditCardTransaction__card_number}</p>
                    <p>{payment._CreditCardTransaction__expiration}</p>
                    <p>{payment._CreditCardTransaction__cvc}</p>
                    <p>{payment._CreditCardTransaction__country}</p>
                    <p className="delete" onClick={()=>{onPaymentMethodDelete(payment.id)}}><u>Delete</u></p>
                </div>
            )
        })
    }

    return(
        <div className="settingpaymentmethods">
            <div className="settingpaymentmethods-container">
                <div className="new-and-saved-paymentmethod-block">
                    <div className="saved-paymentmethod-block">
                        {myPaymentMethodElements}
                    </div>
                    <div className="new-paymentmethod-block">
                        <div className="paymentmethods-detail-block">
                            <p>Card number</p>
                            <input className="card-number" placeholder="1234 1234 1234 1234" name="_CreditCardTransaction__card_number" value={paymentMethod._CreditCardTransaction__card_number} onChange={onPaymentMethodChange}/>
                        </div>

                        <div className="paymentmethods-detail-block">
                            <p>Expiration</p>
                            <input className="expiration" placeholder="MM/YY" name="_CreditCardTransaction__expiration" value={paymentMethod._CreditCardTransaction__expiration} onChange={onPaymentMethodChange}/>
                        </div>

                        <div className="paymentmethods-detail-block">
                            <p>CVC</p>
                            <input className="cvc" placeholder="CVC" name="_CreditCardTransaction__cvc" value={paymentMethod._CreditCardTransaction__cvc} onChange={onPaymentMethodChange}/>
                        </div>
                    </div>
                </div>

                <div className="paymentmethods-detail-block">
                    <p>Country</p>
                    <select className="select-payment-country" name="_CreditCardTransaction__country"value={paymentMethod._CreditCardTransaction__country} onChange={onPaymentMethodChange}>
                        <option>Afghanistan</option>
                        <option>Albania</option>
                        <option>Angola</option>
                        <option>Argentina</option>
                        <option>Australia</option>
                        <option>Afghanistan</option>
                        <option>Austria</option>
                        <option>Bahamas</option>
                        <option>Bolivia</option>
                        <option>Botswana</option>
                        <option>Brazil</option>
                        <option>Cambodia</option>
                        <option>Chile</option>
                        <option>China</option>
                        <option>Colombia</option>
                        <option>Costa Rica</option>
                        <option>Denmark</option>
                        <option>Dominican Republic</option>
                        <option>Egypt</option>
                        <option>Ethiopia</option>
                        <option>Finland</option>
                        <option>France</option>
                        <option>Germany</option>
                        <option>Hungary</option>
                        <option>India</option>
                        <option>Indonesia</option>
                        <option>Ireland</option>
                        <option>Italy</option>
                        <option>Japan</option>
                        <option>Laos</option>
                        <option>Malaysia</option>
                        <option>Mexico</option>
                        <option>Mongolia</option>
                        <option>Philippines</option>
                        <option>Qatar</option>
                        <option>Serbia</option>
                        <option>South Africa</option>
                        <option>South Korea</option>
                        <option>Sweden</option>
                        <option>Switzerland</option>
                        <option>Thailand</option>
                        <option>Turkey</option>
                        <option>Ukraine</option>
                        <option>United Arab Emirates</option>
                        <option>United Kingdom</option>
                        <option>United States of America</option>
                        <option>Uruguay</option>
                        <option>Venezuela</option>
                        <option>Vietnam</option>
                        <option>Yemen</option>
                        <option>Zambia</option>
                        <option>Zimbabwe</option>
                    </select>
                </div>


                <div className="paymentmethods-detail-block">
                    <p onClick={onPaymentMethodSave} className="save-payment">Save</p>
                </div>
                
            </div>
        </div>
    )
}

export default SettingPaymentMethods