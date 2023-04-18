import React, { useContext, useEffect, useState } from 'react'
import '../../css/StartProjectComponent/SetDescription.css'
import { AuthContext } from '../../App'

function SetDescription() {
    const { auth, setAuth } = useContext(AuthContext)
    const [description, setDescription] = useState("")

    async function getDescriptionl() {
        const response = await fetch(`http://127.0.0.1:8000/view_all_project/${auth.currentEditProject.id}`)
        const responseJson = await response.json()
        setDescription(responseJson._Project__project_detail)
    }

    async function onSaveProjectClick() {
        const newProject = auth.currentEditProject
        await fetch(`http://127.0.0.1:8000/edit_project/${newProject.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newProject)
          })
        console.log(auth.currentEditProject)
    }

    function onProjectChange(event) {
        const {name, value} = event.target

        setDescription(value)

        setAuth((prevAuth) => {
            const prevCurrentEditProject = {...prevAuth.currentEditProject}
            return {
                ...prevAuth,
                currentEditProject: {
                    ...prevCurrentEditProject,
                    [name]: value
                }
            }
        })
        console.log(auth.currentEditProject)
    }

    useEffect(() => {
        getDescriptionl()
    }, [])

    return (
        <div className='set-description'>
            <div className='universe' onClick={onSaveProjectClick}>
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
                                name='_Project__project_detail'
                                value={description}
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