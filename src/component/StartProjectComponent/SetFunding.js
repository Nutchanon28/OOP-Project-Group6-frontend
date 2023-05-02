import React, { useContext, useEffect, useState } from 'react'
import '../../css/StartProjectComponent/SetFunding.css'
import { useParams } from 'react-router-dom'
import DataContext from '../../context/DataContext'

function SetFunding() {

    const { projectId, setProjectId } = useContext(DataContext)
    
    const [project, setProject] = useState({})
    const [focus, setFocus] = useState(99)
    const [edit, setEdit] = useState(false)

    async function getProject() {
        const response = await fetch(`http://127.0.0.1:8000/get_project/${projectId}`)
        const responseJson = await response.json()
        setProject(responseJson.project_detail)
        console.log(responseJson)
    }

    async function onSaveProjectClick() {
        if(!edit) {
            return 
        }

        setEdit(false)

        if(project.pledge_goal == "") {
            project.pledge_goal = 1;
        }
        else {
            project.pledge_goal = parseInt(project.pledge_goal)
        }
        await fetch(`http://127.0.0.1:8000/edit_project/${projectId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(project)
          })
        console.log(project)
        getProject()
    }

    function onProjectChange(event) {
        let {name, value} = event.target
        if(value.length == 0) {

        }
        else if(value[value.length - 1] < "0" || value[value.length - 1] > "9" || value == "0") {
            return
        }
        else {
            value = parseInt(value)
            if(value > 100000000) {
                value = "100000000"
            }
            else {
                value = value.toString()
            }
        }

        setEdit(true)
        setProject((prevProject) => {
            return {
                ...prevProject,
                [name]: value
            }
        })
        console.log(project)
    }

    useEffect(() => {
        getProject()
        console.log(`Your project id is ${projectId}`)
        console.log(`Your funding goal is ${project.pledge_goal}`)
    }, [projectId])

    return (
        <div className='set-funding'>
            <div className={ edit ? "universe" : "grand" } onClick={onSaveProjectClick}>
                Save
            </div>
            <div className='set-funding-container'>
                <div className='set-funding-con'>
                    <div className='funding-header'>
                        <h1>
                            Let’s talk about money
                        </h1>
                        <p>
                            Plan and manage your project’s finances.
                        </p>
                    </div>
                    <div className='funding-section'>
                        <div className='flex-funding'>
                            <div className='left-element-funding'>
                                <p>Funding goal</p>
                                <p>Set an achievable goal that covers what you need to complete your project.</p>
                                <p>Funding is all-or-nothing. If you don’t meet your goal, you won’t receive any money.</p>
                            </div>
                            <div className='right-element-funding'>
                                <div className='title-funding'>
                                    <p>Goal amount</p>
                                    <input 
                                        type='text'
                                        name='pledge_goal'
                                        value={project.pledge_goal}
                                        onChange={onProjectChange}
                                        onFocus={() => setFocus(0)}
                                        onBlur={() => setFocus(99)}
                                    />
                                    <div className='under-text'>
                                        {focus == 0 ? "Your funding goal must be between $1 and $100,000,000" : ""}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SetFunding