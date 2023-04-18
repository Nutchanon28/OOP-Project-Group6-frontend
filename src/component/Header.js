import React, { useContext, useState, useEffect } from "react";
import "../css/Header.css";
import { Link } from "react-router-dom";
import { HiSearch } from "react-icons/hi";
import { BiUserCircle } from "react-icons/bi";
import { AuthContext } from "../App";

const Header = () => {

    const {auth, setAuth} = useContext(AuthContext)
    const [profileClick, setProfileCLick] = useState(false)
    const [myProject, setMyProject] = useState([])

    async function getMyProject() {
        const response = await fetch(`http://127.0.0.1:8000/view_my_project/${auth.id}`)
        const responseJson = await response.json()
        setMyProject(responseJson)
    }

    function toggleProfileClick() {
        setProfileCLick(!profileClick)
    }

    async function onStartProjectCLick() {
        const newProject = { 
            project_name: "", 
            category: "Art", 
            project_image: "image", 
            project_duration: 1, 
            project_detail: "",
            pledge_goal: 1,
            pledge_reward: [], 
            creator_id: auth.id,
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
                bank: ""
            }
        }
        await fetch("http://127.0.0.1:8000/add_project", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newProject)
          })

        const response = await fetch(`http://127.0.0.1:8000/get_last_project`)
        const responseJson = await response.json()
        const responseJson2 = {
            ...responseJson,
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
                bank: ""
            }
        }
        console.log(responseJson2)
        setAuth((prevAuth) => {
            return {
                ...prevAuth,
                currentEditProject: responseJson2
            }
        })
        // setAuth((prevAuth) => {
        //         return {
        //             ...prevAuth,
        //             currentEditProject: newProject
        //         }
        //   })
    }

    useEffect(() => {
        getMyProject()
        console.log(myProject)
    }, [profileClick])

    let myProjectElements = null
    if(myProject.length) {
        myProjectElements = myProject.map((project) => {
            return (
            <p><Link to={`start-project/${project.id}`}>{project._Project__project_name}</Link></p> 
            )
        })
    }

    return (
        <div className="header">
            <div className='container'>
                <div className='header-con'>
                    <ul className='left-menu'>
                        <li><a href="#">Discover</a></li>
                        <li onClick={onStartProjectCLick}><Link to="/start-project">Start a project</Link></li>
                    </ul>
                    <div className='logo'>
                    <Link to=""><h2>KICKSTARTER</h2></Link>
                    </div>
                    <ul className='right-menu'>
                        <li><a href="#">Search <HiSearch className='search-icon'/></a></li>
                        <li><a href="#"><BiUserCircle className='user-icon' onClick={toggleProfileClick}/></a></li>
                    </ul>
                </div>
                
            </div>
            <div className={`menu-tab + ${profileClick ? "" : "hidden"}`}>
                <div className='section-menu-tab'>
                    <p>YOUR ACCOUNT</p>
                    <p>Profile</p>
                    <p>Settings</p>
                </div>
                <div className="section-menu-tab">
                    <p>CREATED PROJECTS</p>
                    {myProjectElements}
                </div>
            </div>
        </div>
    )
};

export default Header;
