import React, { useContext, useEffect, useState } from 'react'
import '../../css/StartProjectComponent/SetFunding.css'
import { AuthContext } from '../../App'

function SetFunding() {

    const {auth, setAuth} = useContext(AuthContext)
    const [fundingGoal, setFundingGoal] = useState(1)

    async function onSaveProjectClick() {
        const newProject = auth.currentEditProject
        await fetch(`http://127.0.0.1:8000/edit_project/${newProject.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newProject)
          })
        console.log(auth.currentEditProject)
    }

    async function getFundingGoal() {
        const response = await fetch(`http://127.0.0.1:8000/view_all_project/${auth.currentEditProject.id}`)
        const responseJson = await response.json()
        setFundingGoal(responseJson._Project__pledge_goal)
    }

    function onProjectChange(event) {
        const {name, value} = event.target

        setFundingGoal(value)

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
        getFundingGoal()
    }, [])


    return (
        <div className='set-funding'>
            <div className='universe' onClick={onSaveProjectClick}>
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
                                        type='number'
                                        name='_Project__pledge_goal'
                                        value={fundingGoal}
                                        onChange={onProjectChange}
                                    />
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