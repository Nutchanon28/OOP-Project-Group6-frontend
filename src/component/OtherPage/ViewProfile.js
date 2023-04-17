import React from "react";
import "../../css/OtherPage/ViewProfile.css"

function ViewProfile(){
    return (
        <div className="profile">
            <div className="profile-container">
                <div className="profile-con">
                    <div className="display-profile">
                        <div className="manage-privacy">
                            <p className="privacy-status">This profile page is only visible to you.</p>
                            <p className="manage">Manage your privacy settings</p>
                        </div>
                        <div className="avatar">

                        </div>
                        <p className="username">janipang</p>
                        <p className="short-info">Backed 0 projects · Joined Jan 2023</p>
                    </div>

                    <div className="view-option">
                        <p>About</p>
                        <p>Backed</p>
                    </div>
                </div>
                <div className="information">
                    <div className="about">
                        <div className="part-info">
                            <p className="part-head">Biography</p>
                            <p className="part-description">edit biography</p>
                        </div>
                        <div className="part-info">
                            <p className="part-head">Websites</p>
                            <p className="part-description">edit websites</p>
                        </div>
                    </div>
                    <div className="backed">
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewProfile

