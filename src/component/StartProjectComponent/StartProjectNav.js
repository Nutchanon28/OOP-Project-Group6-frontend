import React, { useContext, useEffect, useState } from 'react'
import '../../css/StartProjectComponent/StartProjectNav.css'
import { NavLink, useParams } from 'react-router-dom'
import axios from "axios";
import DataContext from '../../context/DataContext';



function StartProjectNav(props) {

    const { projectId, setProjectId } = useContext(DataContext)

    function getNavClass(navLinkProps) {
        let navClass = 'app-header-item';
        if (navLinkProps.isActive) navClass += ' app-header-item-active';
        return navClass;
      }

    // useEffect(() => {
    //     const getProject = async () => {
    //       const response = await axios.get(
    //         `http://127.0.0.1:8000/get_last_project`
    //       );
    //       console.log(response.data);
    //       setProjectId(response.data.id);
    //     };
    //     getProject();
    
    //     console.log("this won't cause infinite loop");
    //     //setHasCommented(false);
    //   }, [projectId]);

    return (
        <div className='start-project-nav'>
            <div className='start-project-nav-container'>
                <ul className='start-project-nav-con'>
                    <NavLink className={getNavClass} to="">
                        <li><p>✍️</p>Basics</li>
                    </NavLink>
                    <NavLink className={getNavClass} to={`set-funding`}>
                        <li><p>📊</p>Funding</li>
                    </NavLink >
                    <NavLink className={getNavClass} to="reward-tiers">
                        <li><p>🎁</p>Rewards</li>
                    </NavLink>
                    <NavLink className={getNavClass} to="set-description">
                        <li><p>📖</p>Story</li>
                    </NavLink>
                    <NavLink className={getNavClass} to="set-payment">
                        <li><p>💰</p>Payment</li>
                    </NavLink>
                </ul>
            </div>
        </div>
    )
}

export default StartProjectNav