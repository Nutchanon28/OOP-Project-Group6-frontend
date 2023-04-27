import React, { useEffect, useState } from "react";
import '../../css/SettingPage/SettingShippingAddress.css'

function SettingShippingAddress(){
    const [shippingAddress, setShippingAddress] = useState({
        _Address__country:"Thailand",
        _Address__address_nickname:"",
        _Address__full_name:"",
        _Address__address:"",
        _Address__city:"",
        _Address__phone_number:""
    })

    const [myShippingAddress, setMyShippingAddress] = useState([])

    function onShippingAddressChange(event){
        const{name, value} = event.target
        console.log(name,value)
        setShippingAddress((previousAddress) => {
            return{
                ...previousAddress,
                [name] : value
            }
        })
    }

    async function getMyShippingAddress(){
        const response = await fetch(`http://127.0.0.1:8000/get_shipping_address?user_id=${1}`) 
        const responsejson = await response.json()
        setMyShippingAddress(responsejson)
        console.log(responsejson)
    }

    async function onShippingAddressSave(){
        if (myShippingAddress.length === 3)
        return

        if (
            shippingAddress._Address__country === "" ||
            shippingAddress._Address__address_nickname === "" ||
            shippingAddress._Address__full_name === "" ||
            shippingAddress._Address__address === "" ||
            shippingAddress._Address__city === "" ||
            shippingAddress._Address__phone_number === ""
        )
        return
        
        const newAddress = {
            country:shippingAddress._Address__country,
            address_nickname:shippingAddress._Address__address_nickname,
            full_name:shippingAddress._Address__full_name,
            address:shippingAddress._Address__address,
            city:shippingAddress._Address__city,
            phone_number:shippingAddress._Address__phone_number
        }
        await fetch(`http://127.0.0.1:8000/add_shipping_address?user_id=${1}`,{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newAddress)
        })
        getMyShippingAddress()

        setShippingAddress({
            _Address__country:"Thailand",
            _Address__address_nickname:"",
            _Address__full_name:"",
            _Address__address:"",
            _Address__city:"",
            _Address__phone_number:""
        })
    }

    async function onShippingAddressDelete(shippingAddressID){
        console.log(shippingAddressID)
        await fetch(`http://127.0.0.1:8000/delete_address?user_id=${1}&address_id=${shippingAddressID}`,{
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify()
        })
        getMyShippingAddress()
    }

    useEffect(()=>{
        getMyShippingAddress()
    },[])

    let myShippingAddressElements = []
    if (myShippingAddress.length){
        myShippingAddressElements = myShippingAddress.map((address) => {
            return(
                <div key={address._Address__id} className="saved-shippingaddress-block">
                    <p>{address._Address__address_nickname}</p>
                    <p>{address._Address__full_name}</p>
                    <p>{address._Address__address}</p>
                    <p>{address._Address__city}</p>
                    <p>{address._Address__country}</p>
                    <p>{address._Address__phone_number}</p>
                    <p className="delete" onClick={()=>{onShippingAddressDelete(address._Address__id)}}><u>Delete</u></p>
                </div>
            )
        })
    }

    return(
        <div className="settingshippingaddress">
            <div className="settingshippingaddress-container">
                <div className="new-address-and-saved-address-block">
                    <div className="new-address-detail-block">
                        <p className="address-type">New address</p>
                        <div className="new-shippingaddress-detail-block">
                            <p>Country</p>
                            <select  className="select-shipping-country" name="_Address__country" value={shippingAddress._Address__country} onChange={onShippingAddressChange}>
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

                        <div className="new-shippingaddress-detail-block">
                            <p>Address nickname</p>
                            <input name="_Address__address_nickname" value={shippingAddress._Address__address_nickname} onChange={onShippingAddressChange}/>
                        </div>

                        <div className="new-shippingaddress-detail-block">
                            <p>Full name</p>
                            <input name="_Address__full_name" value={shippingAddress._Address__full_name} onChange={onShippingAddressChange}/>
                        </div>

                        <div className="new-shippingaddress-detail-block">
                            <p>Address</p>
                            <input name="_Address__address" value={shippingAddress._Address__address} onChange={onShippingAddressChange}/>
                        </div>

                        <div className="new-shippingaddress-detail-block">
                            <p>City</p>
                            <input name="_Address__city" value={shippingAddress._Address__city} onChange={onShippingAddressChange}/>
                        </div>

                        <div className="new-shippingaddress-detail-block">
                            <p>Phone number</p>
                            <input name="_Address__phone_number" value={shippingAddress._Address__phone_number} onChange={onShippingAddressChange}/>
                        </div>

                        
                        <div className="new-shippingaddress-detail-block">
                            <p onClick={onShippingAddressSave} className="save-shipping-address">Save</p>
                        </div>
                    </div>

                    <div className="saved-address-detail-block">
                        <p className="address-type">Saved address</p>
                        <p><br></br></p>
                        <p>maximum 3 addresses</p>
                        {myShippingAddressElements}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SettingShippingAddress