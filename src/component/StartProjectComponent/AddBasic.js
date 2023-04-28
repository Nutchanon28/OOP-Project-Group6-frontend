import React, { useContext, useEffect, useState } from 'react'
import '../../css/StartProjectComponent/AddBasic.css'
import { AuthContext } from '../../App'

function AddBasic() {

    const {auth, setAuth} = useContext(AuthContext);
    const [project, setProject] = useState(null)

    async function getEditProject() {
        console.log(auth.currentEditProject)
        const lastProject = await fetch("http://127.0.0.1:8000/get_last_project")
        const lastProjectJson = await lastProject.json()
        setProject(lastProjectJson)  
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
        setProject((prevProject) => {
            return {
                ...prevProject,
                [name]: value
            }
        })
        setAuth((prevAuth) => {
            const prevCurrentEditProject = prevAuth.currentEditProject
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
        getEditProject()
        //console.log(project)
    }, [])

    let temp = null
    let projectImage = null
    if(!!project)
        // if(project._Project__image){
        //     projectImage = (
        //         <img src={project._Project__image.current}/>
        //     )
        // }
        temp = (
            <div className='add-basic'>
                <div className='add-basic-container'>
                    <div className='add-basic-con'>
                        <div className='basic-header'>
                            <h1>
                                Start with the basics
                            </h1>
                            <p>
                                Make it easy for people to learn about your project.
                            </p>
                        </div>
                        <div className='basic-section'>
                            <div className='flex-basic'>
                                <div className='left-element-basic'>
                                    <p>Project title</p>
                                    <p>Write a clear, brief title and subtitle to help people quickly understand your project. Both will appear on your project and pre-launch pages.</p>
                                    <p>Potential backers will also see them if your project appears on category pages, search results, or in emails we send to our community.</p>
                                </div>
                                <div className='right-element-basic'>
                                    <div className='title-basic'>
                                        <p>Title</p>
                                        <input 
                                            type='text'
                                            name='_Project__project_name'
                                            value={project._Project__project_name}
                                            onChange={onProjectChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='basic-section'>
                            <div className='flex-basic'>
                                <div className='left-element-basic'>
                                    <p>Project category</p>
                                    <p>Choose a primary category and subcategory to help backers find your project.</p>
                                    <p>You can change these anytime before and during your campaign.</p>
                                </div>
                                <div className='right-element-basic'>
                                    <div className='category-basic'>
                                        <p>Categogy</p>
                                        <select
                                            name='_Project__category'
                                            value={project._Project__category}
                                            onChange={onProjectChange}
                                        >
                                            <option>Art</option>
                                            <option>Comics</option>
                                            <option>Crafts</option>
                                            <option>Dance</option>
                                            <option>Design</option>
                                            <option>Fashion</option>
                                            <option>Film & Video</option>
                                            <option>Food</option>
                                            <option>Games</option>
                                            <option>Journalism</option>
                                            <option>Music</option>
                                            <option>Photography</option>
                                            <option>Publishing</option>
                                            <option>Technology</option>
                                            <option>Theater</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='basic-section'>
                            <div className='flex-basic'>
                                <div className='left-element-basic'>
                                    <p>Project image</p>
                                    <p>Add an image that clearly represents your project. Choose one that looks good at different sizes—it’ll appear on your project page, across the Kickstarter website and mobile apps, and (when shared) on social channels.</p>
                                    <p>Your image should be at least 1024x576 pixels. It will be cropped to a 16:9 ratio.ty.</p>
                                </div>
                                <div className='right-element-basic'>
                                    <div className='image-basic'>
                                        <p>Project image</p>
                                        <input 
                                            type='file'
                                            name="_Project__project_image"
                                            value={project._Project__image} 
                                            onChange={onProjectChange}
                                        />
                                        {projectImage}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='basic-section'>
                            <div className='flex-basic'>
                                <div className='left-element-basic'>
                                    <p>Campaign duration</p>
                                    <p>Set a time limit for your campaign. You won’t be able to change this after you launch.</p>
                                </div>
                                <div className='right-element-basic'>
                                    <div className='duration-basic'>
                                        <p>Enter number of days</p>
                                        <input 
                                            type='number'
                                            name='_Project__project_duration'
                                            value={project._Project__project_duration}
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

    return (
        <div>
            <div className='universe' onClick={onSaveProjectClick}>
                Save
            </div>
            {temp}
        </div>
        
    )
}

export default AddBasic