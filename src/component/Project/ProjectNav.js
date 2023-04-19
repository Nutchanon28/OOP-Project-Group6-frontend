import React, { useContext } from 'react'
import DataContext from '../../context/DataContext'
import '../../css/Project/ProjectNav.css'

const ProjectNav = ({ handleBack }) => {
    const { setProjectPage } = useContext(DataContext);

    return (
        <div className='project-nav'>
            <div className='container'>
                <div className='project-nav-con'>
                    <div className='about-project'>
                        <p onClick={() => setProjectPage("Campaign")}>Campaign</p>
                        <p onClick={() => setProjectPage("FAQ")}>FAQ</p>
                        <p onClick={() => setProjectPage("Updates")}>Updates</p>
                        <p onClick={() => setProjectPage("Comments")}>Comments</p>
                        {/* <p>Community</p> */}
                    </div>
                    <div className='project-operation-section'>
                        <div className='back-button' onClick={handleBack}>
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