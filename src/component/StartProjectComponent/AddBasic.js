import React, { useContext, useEffect, useState } from 'react'
import '../../css/StartProjectComponent/AddBasic.css'
import DataContext from '../../context/DataContext';
import axios from "axios";
import styled from 'styled-components';

const Image = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    background: url(${props => props.url});
    background-size: cover;
`

function AddBasic() {

    const { projectId, setProjectId } = useContext(DataContext);

    const [project, setProject] = useState({}) 
    const [focus, setFocus] = useState(99)
    const [edit, setEdit] = useState(false)

    const getProject = async () => {
        const response = await axios.get(
          `http://127.0.0.1:8000/get_last_project`
        );
        setProject(response.data.detail.project_detail);
        console.log(response.data.detail.project_detail);
      };

    async function onSaveProjectClick() {
        if(!edit) {
            return
        }

        setEdit(false)

        if(project.project_duration == "") {
            project.project_duration = 1
        }
        else if(project.name == "") {
            project.name = project.category + " Project"
        }
        await fetch(`http://127.0.0.1:8000/edit_project/${projectId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(project)
          })
          getProject()
        console.log(project)
    }

    function onProjectChange(event) {
        let {name, value} = event.target      

        if(name == "name") {
            if(value.length > 60) {
                value = value.substring(0, 60)
            }
        }
        else if(name == "project_duration") {
            if(value.length == 0) {
                
            }
            else if(value[value.length - 1] < "0" || value[value.length - 1] > "9" || value == "0") {
                return
            }
            else {
                value = parseInt(value)
                if(value > 60) {
                    value = "60"
                }
                else{
                    value = value.toString()
                }
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
        getProject();
        console.log("this won't cause infinite loop");
    }, [projectId]);

    let temp = null
    let projectImageElement = null
    if(!!project)
        if(project.image){
            projectImageElement = 
            <div className='image-border'>
                <Image url={project.image}>
                </Image>
            </div>            
        }
        temp = (
            <div className='add-basic'>
                <div className={ edit ? "universe" : "grand" } onClick={onSaveProjectClick}>
                    Save
                </div>
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
                                            name='name'
                                            value={project.name}
                                            onChange={onProjectChange}
                                            onFocus={() => setFocus(0)}
                                            onBlur={() => setFocus(99)}
                                        />
                                        <div className='under-text side-right'>
                                            {focus == 0 ? `${project.name.length}/60` : ""}
                                        </div>
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
                                            name='category'
                                            value={project.category}
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
                                            type='text'
                                            name="image"
                                            value={project.image} 
                                            onChange={onProjectChange}
                                        />
                                        {projectImageElement}
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
                                            type='text'
                                            name='project_duration'
                                            value={project.project_duration}
                                            onChange={onProjectChange}
                                            onFocus={() => setFocus(1)}
                                            onBlur={() => setFocus(99)}
                                        />
                                        <div className='under-text'> 
                                            {focus == 1 ? `Days for funding duration must be between 1 and 60` : ""}
                                        </div>
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
            {temp}
        </div>
        
    )
}

export default AddBasic