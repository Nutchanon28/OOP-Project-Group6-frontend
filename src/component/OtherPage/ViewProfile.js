import React from "react";
import { useState, useEffect } from "react";
import "../../css/OtherPage/ViewProfile.css";

function ViewProfile() {
  const [aboutClick, setAboutClick] = useState(true);
  useEffect(() => {
    console.log(aboutClick);
  }, [aboutClick]);

  return (
    <div className="profile">
      <div className="profile-container">
        <div className="profile-con">
          <div className="display-profile">
            <div className="manage-privacy">
              <p className="privacy-status">
                This profile page is only visible to you.
              </p>
              <p className="manage">Manage your privacy settings</p>
            </div>
            <div className="avatar"></div>
            <p className="username">janipang</p>
            <p className="short-info">Backed 0 projects · Joined Jan 2023</p>
          </div>

          <div className="view-option">
            <div onClick={() => setAboutClick(true)}>About</div>
            <div onClick={() => setAboutClick(false)}>Backed</div>
          </div>
        </div>
        <div className="information">
          <div className="about">
            {aboutClick && (
              <>
                <div className="part-info">
                  <p className="part-head">Biography</p>
                  <p className="part-description">edit biography</p>
                </div>
                <div className="part-info">
                  <p className="part-head">Websites</p>
                  <p className="part-description">edit websites</p>
                </div>
              </>
            )}
          </div>
          <div className="backed">
            {!aboutClick && (
                <>
                    <div className="part-info2">
                        <p className="part-head">The Name Of This</p>
                        <div className="part-picture"></div>
                        <p className="part-description">
                            This profile page is only visible to you This profile page is
                            only visible to you
                        </p>
                    </div>
                </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewProfile;
