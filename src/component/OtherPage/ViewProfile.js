import React, { useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
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

  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get(
        `http://127.0.0.1:8000/view_user?userId=${userId}`
      );
      console.log(response);
      setUser(response.data)
    };
    getUser();

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
              <div className="manage-privacy">
                <p className="privacy-status">
                  This profile page is only visible to you.
                </p>
                <Link to = "..//setting/settingeditprofile" className="manage">Manage your privacy settings</Link>
              </div>
              <img className="avatar" src={user?.avatar}></img>
              <p className="username">{user?.name}</p>
              <p className="short-info">Backed {backedProjects.length} projects</p>
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
                  <p className="part-description">{user?.biography}</p>
                  <Link className="edit-description" to = "..//setting/settingeditprofile">edit biography</Link>
                </div>
                <div className="part-info">
                  <p className="part-head">Websites</p>
                  <p className="part-description">{user?.website}</p>
                  <Link className="edit-description" to = "..//setting/settingeditprofile">edit websites</Link>
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
                        <Link className="project-name" to = {`..//project/${backedProject.id}`}>{backedProject.name}</Link>
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
