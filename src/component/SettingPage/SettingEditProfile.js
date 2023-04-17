import React, { useState } from "react";
import '../../css/SettingPage/SettingEditProfile.css'

function SettingEditProfile(){
    return(
        <div className="settingeditprofile">
            <div className="settingeditprofile-container">
                <div className="editprofile-detail-block">
                    <p>Name</p>
                    <input/>
                    <p>Heads up: Once you launch a project, you cannot make changes to your name on Kickstarter.</p>
                </div>

                <div className="editprofile-detail-block">
                    <p>Avatar</p>
                    <input type="file"/>
                    <p>JPEG, PNG, GIF, or BMP • 200MB file limit</p>
                </div>

                <div className="editprofile-detail-block">
                    <p>Biography</p>
                    <input/>
                    <p>We suggest a short bio. If it's 300 characters or less it'll look great on your profile.</p>
                </div>

                <div className="editprofile-detail-block">
                    <p>Location</p>
                    <input placeholder="E.g.Bangkok, Thailand"/>
                </div>

                <div className="editprofile-detail-block">
                    <p>Websites</p>
                    <input/>
                </div>

                <div className="editprofile-detail-block">
                    <p className="save-settings">Save Settings</p>
                </div>
            </div>
        </div>
    )
}

export default SettingEditProfile
//name, avatar, biography, location, website