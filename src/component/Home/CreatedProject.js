import React, { useContext, useEffect, useState } from 'react'
import "../../css/Home/CreatedProject.css";
import styled from 'styled-components';
import DataContext from '../../context/DataContext';
import { Link, useNavigate } from 'react-router-dom';

const CreatedProjectImage = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url(${props => props.url});
    background-size: cover;
    background-position: center;
`

function CreatedProject() {
    const {userId, setUserId} = useContext(DataContext)
    const {projectId, setProjectId} = useContext(DataContext)
    const {isEdit, setIsEdit} = useContext(DataContext)
    const [myProject, setMyproject] = useState([])
    const [myLaunchedProjects, setMyLaunchedProjects] = useState([])
    const navigate = useNavigate();

    async function getMyProject() {
        const response = await fetch(`http://127.0.0.1:8000/get_my_project/${userId}`)
        const responseJson = await response.json()
        setMyproject(responseJson.my_created_projects)
        setMyLaunchedProjects(responseJson.my_launched_projects)
        console.log(responseJson)
    }

    function canLaunch(project){
        if(!!project._Project__credit_card) {
            return true;
        }
        return false;
    }

    async function launchProject(theId) {
        await fetch(`http://127.0.0.1:8000/launch_project?id=${theId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify()
          })
        console.log(`Launch project id: ${theId}`)
        getMyProject()
    }

    useEffect(() => {
        getMyProject()
    }, [])


    const myProjectElements = myProject.map((project) => {
        let launchTag = null
        if(!!project._Project__credit_card) {
            launchTag = 
            <div 
                className='launch-project-status'
                onClick={() => {
                    launchProject(project.id)
                }}
            >
                Launch this project
            </div> 
        }
        return (
            <div key={project.id} className='created-project-element'>
                <div className='created-project-image'>
                    <CreatedProjectImage url={project._Project__project_image}>

                    </CreatedProjectImage>
                </div>
                <div className='created-project-name'>
                    {project._Project__project_name}
                </div>
                {launchTag}
                <div 
                    className='created-project-status' 
                    onClick={() => {
                        setProjectId(project.id)
                        setIsEdit(true)
                        navigate(`/start-project`)
                    }}
                >
                    Continue editing
                </div>
            </div>
        )
    })

    const myLaunchedProjectElements = myLaunchedProjects.map((project) => {
        return (
            <div key={project.id} className='created-project-element'>
                <div className='created-project-image'>
                    <CreatedProjectImage url={project._Project__project_image}>

                    </CreatedProjectImage>
                </div>
                <div className='created-project-name'>
                    {project._Project__project_name}
                </div>
                <Link to="/other/add_update" onClick={() => setProjectId(project.id)}>
                    <div className='add-update-status'>
                        AddUpdate
                    </div>
                </Link>
            </div>
        )
    })

    return (
        <div className='created-project'>
            <div className='created-project-container'>
                <div className='created-project-con'>
                    <div className='created-project-menu'>
                        <p>Activity</p>
                        <p>Backed projects</p>
                        <p>Created projects</p>
                        <p>Settings</p>
                        <p>Profile</p>
                    </div>
                    <div className='created-project-title'>
                        Created projects
                    </div>
                    <div>
                        A place to keep track of all your created projects
                    </div>
                    <div className='created-projectt'>
                        Started
                    </div>
                    <div className='created-project-list'>
                        {myProjectElements}
                        {myLaunchedProjectElements}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreatedProject