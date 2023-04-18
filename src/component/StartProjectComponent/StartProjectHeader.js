import React, { useContext } from 'react'
import '../../css/StartProjectComponent/StartProjectHeader.css'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../App'

function StartProjectHeader() {
    const { auth, setAuth} = useContext(AuthContext)

    async function onSaveProjectClick() {
        const newProject = auth.currentEditProject
        await fetch(`http://127.0.0.1:8000/edit_project/${newProject.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newProject)
          })
        console.log(auth.currentEditProject)
    }

    return (
        <div className='start-project-header'>
            <div className='start-project-header-container'>
                <div className='start-project-header-con'>
                    <div className='logo'>
                        <Link to=".."><h2>KICKSTARTER</h2></Link>
                    </div>
                    {/* <div className='save-project-button' onClick={onSaveProjectClick}>
                        Save
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default StartProjectHeader