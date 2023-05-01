import React, { useContext } from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "../../css/OtherPage/ViewProfile.css";
import "../../css/OtherPage/About.css";
import "../../css/OtherPage/Backed.css";
import DataContext from "../../context/DataContext";

// /view_backed_project
function ViewProfile() {
  const [backedProjects, setBackedProjects] = useState([]);
  const [aboutClick, setAboutClick] = useState(true);
  const {userId} = useContext(DataContext)
  const [user, setUser] = useState()
  
  const [showUnderline1 , setShowUnderline1] = useState(true)
  const [showUnderline2 , setShowUnderline2] = useState(false)

  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get(
        `http://127.0.0.1:8000/view_user?user_id=${userId}`
      );
      console.log(response);
      setUser(response.data)
    };
    getUser();
  }, [userId]);


  useEffect(() => {
    const getProjects = async () => {
      const response = await axios.get(
        `http://127.0.0.1:8000/view_backed_project?user_id=${userId}`
      );
      console.log(response);
      setBackedProjects(response.data)
    };
    getProjects();
  }, [userId]);


  return (
    <div className="profile">
      <div className="profile-container">
        <div className="profile-con">
          <div className="display-profile">
            <>
              {/* {user?.map((user) =>{
                return (
                  <> */}
                    <div className="manage-privacy">
                      <p className="privacy-status">
                        This profile page is only visible to you.
                      </p>
                      <p className="manage">Manage your privacy settings</p>
                    </div>
                    <img className="avatar" src={user.avatar}></img>
                    <p className="username">{user.name}</p>
                    <p className="short-info">Backed {backedProjects.length} projects</p>
                  {/* </>
                )
              })} */}
            </>
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
                  <p className="part-description">
                    this is my biography that i didnt write it
                  </p>
                  <p className="edit-description">edit biography</p>
                </div>
                <div className="part-info">
                  <p className="part-head">Websites</p>
                  <p className="part-description">
                    this is my biography that i didnt write it
                  </p>
                  <p className="edit-description">edit websites</p>
                </div>
              </>
            )}
          </div>
          <div className="backed">
            {!aboutClick && (
              <>
              {backedProjects?.map((backedProject) =>{
                console.log(backedProject)
                return (
                  <>
                    <div className="project">
                      <img className="project-picture" src={backedProject.image}/>
                      <div className="project-info">
                        <p className="project-name">{backedProject.name}</p>
                        <p className="description">{backedProject.detail}</p>
                        <p className="editor">By {backedProject.creator}</p>
                      </div>
                    </div>
                  </>
                )
              })}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewProfile;
