import React, { useContext, useEffect, useState } from "react";
import DataContext from '../../context/DataContext'
import '../../css/SettingPage/SettingEditProfile.css'

function SettingEditProfile(){
    const [editProfile, setEditProfile] = useState({
        _User__name:"",
        _User__avatar:"",
        _User__biography:"",
        _User__location:"",
        _User__website:""
    })

    const {userId} = useContext(DataContext)

    function onEditProfileChange(event){
        const{name, value} = event.target
        console.log(name, value)
        setEditProfile((previousEditProfile) => {
            return{
                ...previousEditProfile,
                [name] : value
            }
        })
    }

    async function getMyEditProfile(){
        const response = await fetch(`http://127.0.0.1:8000/get_user?user_id=${userId}`)
        const responsejson = await response.json()
        setEditProfile(responsejson)
        console.log(responsejson)
    }

    async function onEditProfileSave(){
        if(
            editProfile._User__name === "" ||
            editProfile._User__avatar === "" ||
            editProfile._User__biography === "" ||
            editProfile._User__location === "" ||
            editProfile._User__website === ""
        )
        return
        const newEditProfile = {
            name:editProfile._User__name,
            avatar:editProfile._User__avatar,
            biography:editProfile._User__biography,
            location:editProfile._User__location,
            website:editProfile._User__website
        }
        await fetch(`http://127.0.0.1:8000/add_profile?user_id=${userId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newEditProfile)
        })
        getMyEditProfile()
    }

    useEffect(()=>{
        getMyEditProfile()
    },[])

    return(
        <div className="settingeditprofile">
            <div className="settingeditprofile-container">
                <div className="editprofile-detail-block">
                    <p>Name</p>
                    <input name="_User__name" value={editProfile._User__name} onChange={onEditProfileChange}/>
                    <p className="small-detail">Heads up: Once you launch a project, you cannot make changes to your name on Kickstarter.</p>
                </div>

                <div className="editprofile-detail-block">
                    <p>Avatar</p>
                    <input name="_User__avatar" value={editProfile._User__avatar} onChange={onEditProfileChange} type="text"/>
                </div>

                <div className="editprofile-detail-block">
                    <p>Biography</p>
                    <input name="_User__biography" value={editProfile._User__biography} onChange={onEditProfileChange}/>
                    <p className="small-detail">We suggest a short bio. If it's 300 characters or less it'll look great on your profile.</p>
                </div>

                <div className="editprofile-detail-block">
                    <p>Location</p>
                    <input name="_User__location" value={editProfile._User__location} onChange={onEditProfileChange} placeholder="E.g.Bangkok, Thailand"/>
                </div>

                <div className="editprofile-detail-block">
                    <p>Websites</p>
                    <input name="_User__website" value={editProfile._User__website} onChange={onEditProfileChange}/>
                </div>

                <div className="editprofile-detail-block">
                    <p onClick={onEditProfileSave} className="save-settings">Save Settings</p>
                </div>
            </div>
        </div>
    )
}

export default SettingEditProfile