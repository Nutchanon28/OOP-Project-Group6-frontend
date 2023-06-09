import React, { useContext, useState, useEffect } from "react";
import "../css/Header.css";
import { Link, useNavigate } from "react-router-dom";
import { HiSearch } from "react-icons/hi";
import { BiUserCircle } from "react-icons/bi";
import DataContext from "../context/DataContext";

const Header = ({ setHasLogin }) => {
  const { projectId, setProjectId } = useContext(DataContext);
  const { userId, setUserId } = useContext(DataContext);
  const [profileClick, setProfileCLick] = useState(false);
  const [myProject, setMyProject] = useState([]);
  const [newProjectId, setNewProjectId] = useState(1);
  const { isEdit, setIsEdit } = useContext(DataContext);
  const navigate = useNavigate();

  async function getMyProject() {
    const response = await fetch(
      `http://127.0.0.1:8000/get_my_project/${userId}`
    );
    const responseJson = await response.json();
    setMyProject(responseJson);
  }

  function toggleProfileClick() {
    setProfileCLick(!profileClick);
  }

  async function onStartProjectCLick() {
    const newProject = {
      project_name: `Project${Date.now().toString()}`,
      category: "Art",
      project_image: "image",
      project_duration: 1,
      project_detail: "",
      pledge_goal: 1,
      pledge_reward: [],
      creator_id: userId,
      payment_detail: {
        legal_first_name: "",
        legal_last_name: "",
        email_address: "",
        date_of_birth: "",
        home_address: "",
        city: "",
        state: "",
        postal_code: "",
        phone_number: "",
        account_number: "",
        bank: "",
      },
    };
    await fetch("http://127.0.0.1:8000/add_project", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProject),
    });

    const response = await fetch(`http://127.0.0.1:8000/get_last_project`);
    const responseJson = await response.json();
    setNewProjectId(responseJson.id);
    console.log(responseJson);
    setProjectId(responseJson.id);
    console.log(`Your project id is ${responseJson.id}`);
    setIsEdit(false);
  }

  useEffect(() => {
    getMyProject();
    console.log(myProject);
  }, [profileClick]);

  let myProjectElements = [];
  if (myProject.length) {
    let len = myProject.length;
    for (let i = len - 1; i >= len - 5 && i >= 0; i--) {
      myProjectElements.push(
        <p
          className="to-my-project"
          key={myProject[i].id}
          onClick={() => {
            setIsEdit(true);
            setProjectId(myProject[i].id);
            navigate("/start-project");
          }}
        >
          {myProject[i]._Project__project_name}
        </p>
      );
    }
  }

  return (
    <div className="header">
      <div className="container">
        <div className="header-con">
          <ul className="left-menu">
            <li>
              <a href="#">Discover</a>
            </li>
            <li onClick={onStartProjectCLick}>
              <Link to={"start-project"}>Start a project</Link>
            </li>
          </ul>
          <div className="logo">
            <Link to="">
              <h2>KICKSTARTER</h2>
            </Link>
          </div>
          <ul className="right-menu">
            <li>
              <Link to="other/search_result">
                Search <HiSearch className="search-icon" />
              </Link>
            </li>
            <li>
              <a href="#">
                <BiUserCircle
                  className="user-icon"
                  onClick={toggleProfileClick}
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className={`menu-tab + ${profileClick ? "" : "hidden"}`}>
        <div className="section-menu-tab">
          <p>YOUR ACCOUNT</p>
          <p>
            <Link to="/other/view_profile">Profile</Link>
          </p>
          <p>
            <Link to="setting">Settings</Link>
          </p>
          <p onClick={() => setHasLogin(false)}>
            <Link to="login">Log out</Link>
          </p>
        </div>
        <div className="section-menu-tab">
          <p>CREATED PROJECTS</p>
          {/* {myProjectElements} */}
          <Link to="created-project">
            <p>view my projects</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
