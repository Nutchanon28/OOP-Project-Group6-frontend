import React, { useContext, useEffect, useState } from 'react'
import '../../css/StartProjectComponent/SetDescription.css'
import DataContext from '../../context/DataContext'

function SetDescription() {
    const {projectId, setProjectId} = useContext(DataContext)
    const [project, setProject] = useState({})
    const [description, setDescription] = useState("")
    const [edit, setEdit] = useState(false)

    async function onSaveProjectClick() {

        if(!edit) {
            return
        }

        setEdit(false)

        const newProject = project
        await fetch(`http://127.0.0.1:8000/edit_project/${projectId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newProject)
          })
        console.log(newProject)
    }

    function onProjectChange(event) {
        const {name, value} = event.target

        setEdit(true)
        setDescription(value)

        setProject((prevProject) => {
            return {
                ...prevProject,
                [name]: value
            }
        })
    }

    useEffect(() => {
        async function getProject() {
            const response = await fetch(`http://127.0.0.1:8000/view_project/${projectId}`)
            const responseJson = await response.json()
            setProject(responseJson.project_detail)
            console.log(responseJson.project_detail)
            //setFundingGoal(responseJson._Project__pledge_goal)
        }
        getProject()
        //()
    }, [projectId])

    return (
        <div className='set-description'>
            <div className={ edit ? "universe" : "grand" } onClick={onSaveProjectClick}>
                Save
            </div>
            <div className='set-description-container'>
                <div className='set-description-con'>
                    <div className='description-header'>
                        <h1 className='text-center weight400 font28'>
                            Introduce your project
                        </h1>
                        <div className='text-center font18 color65 descrip'>
                            Tell people why they should be excited about your project. Get specific but be clear and be brief.
                        </div>
                    </div>
                    <div className='project-description'>
                        <div className='project-description-con'>
                            <h2>
                                Project description
                            </h2>
                            <div className='font14 color65'>
                                Describe what you're raising funds to do, why you care about it, how you plan to make it happen,<br />and who you are. Your description should tell backers everything they need to know. 
                            </div>
                            <textarea 
                                rows={60}
                                name='detail'
                                value={project.detail}
                                onChange={onProjectChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SetDescription