import React, { useEffect, useState } from "react";
import '../../css/SettingPage/SettingAccount.css'

function SettingAccount(){
    const [buttonState, setButtonState] = useState(false)
    const [newPassword, setNewPassword] = useState("")
    const [oldPassword, setOldPassword] = useState("")
    const [passwordStatus, setPasswordStatus] = useState("")
    const [account, setAccount]  = useState({
        _User__gmail:"",
        _User__password:""
    })


    function onchangepasswordclick(){
        setButtonState(!buttonState)
    }
    
    function onAccountChange(event){
        const{name, value} = event.target
        setAccount((previousAccount) => {
            return{
                ...previousAccount,
                [name] : value
            }
        })
    }

    async function getMyAccount(){
        const response = await fetch(`http://127.0.0.1:8000/get_user?user_id=${1}`)
        const responsejson = await response.json()
        setAccount(responsejson)
        console.log(responsejson)
    }

    async function onAccountSave(){
        if(
            oldPassword === account._User__password
        )
        setPasswordStatus("Correct Password")
        else
        setPasswordStatus("Incorrect Password")
        if(
            account._User__gmail === "" ||
            account._User__password === ""
        )
        return
        const newAccount = {
            gmail:account._User__gmail,
            new_password:newPassword,
            old_password:oldPassword
        }
        await fetch(`http://127.0.0.1:8000/add_account?user_id=${1}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newAccount)
        })
        getMyAccount()
    }

    useEffect(()=>{
        getMyAccount()
    },[])

    
    return(
        <div className="settingaccount">
            <div className="settingaccount-container">
                <div className="account-detail-block">
                    <p>Email</p>
                    <input name="_User__gmail" value={account._User__gmail} onChange={onAccountChange}/>
                </div >

                <div className="account-detail-block" >
                    <p>Password</p>
                    <p className="change-password" onClick={onchangepasswordclick}>Change Password</p>
                </div>

                <div className={`account-detail-block ${buttonState ? "": "hidden"}`} >
                    <p>New Password</p>
                    <input name="_User__password" onChange={(event)=>{setNewPassword(event.target.value)}} type="password"/>
                    <p className="small-detail"> Minimum 6 characters</p>
                </div>

                <div className="account-detail-block">
                    <p>Current Password</p>
                    <input onChange={(event)=>{setOldPassword(event.target.value)}} type="password"/>
                    <p className="small-detail">Enter your current password to save these changes.</p>
                    <p className={passwordStatus === "Correct Password" ? "showSaved" : "hidden"}>SAVED!</p>
                    <p className={passwordStatus === "Incorrect Password" ? "showIncorrect" : "hidden"}>INCORRECT PASSWORD</p>
                </div >

                <div className="account-detail-block">
                    <p onClick={onAccountSave} className="save-settings">Save Settings</p>
                </div>

            </div>
        </div>
    )
}

export default SettingAccount