import React from 'react'
import "../../css/Project/ProjectDetail.css"

const ProjectDetail = ({ pledgeReceived, numberOfBackers, pledgeGoal, pledgeDuration }) => {
    return (
        <div className='project-detail'>
            <div className='project-con'>
                <div className='project-container'>
                    <div className='project-image'>
                        <img src="https://via.placeholder.com/600/92c952" alt="project"/>
                    </div>
                    <div className='right-section'>
                        <div className='detail'>
                            <div className='pledged-amount'>
                                <p>{pledgeReceived}</p>
                                <p>pledged of {pledgeGoal} Baht goal</p>
                            </div>
                            <div className='backers'>
                                <p>{numberOfBackers}</p>
                                <p>backers</p>
                            </div>
                            <div className='day-to-go'>
                                <p>{pledgeDuration}</p>
                                <p>days to go</p>
                            </div>
                        </div>
                        <div className='operation-section'>
                            <div className='back-button'>
                                Back this project
                            </div>
                            <div className='bookmark-button'>
                                Remind me
                            </div>
                            <div>
                                This project will only be funded if it reaches its goal by Wed, March 29 2023 4:00 AM UTC +07:00
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectDetail