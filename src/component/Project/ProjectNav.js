import React from 'react'
import '../../css/Project/ProjectNav.css'

const ProjectNav = () => {
    return (
        <div className='project-nav'>
            <div className='container'>
                <div className='project-nav-con'>
                    <div className='about-project'>
                        <p>Campaign</p>
                        <p>FAQ</p>
                        <p>Updates</p>
                        <p>Comments</p>
                        <p>Community</p>
                    </div>
                    <div className='project-operation-section'>
                        <div className='back-button'>
                        Back this project
                        </div>
                        <div className='bookmark-button'>
                        Remind me
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectNav