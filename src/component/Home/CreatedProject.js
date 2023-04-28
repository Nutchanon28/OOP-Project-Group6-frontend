import React from 'react'
import "../../css/Home/CreatedProject.css";
import styled from 'styled-components';

const CreatedProjectImage = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    background: url(${props => props.url});
    background-size: cover;
`

function CreatedProject() {
    return (
        <div className='created-project'>
            <div className='created-project-container'>
                <div className='created-project-con'>
                    <div className='created-project-menu'>
                        <p>Activity</p>
                        <p>Backed projects</p>
                        <p>Created projects</p>
                        <p>Settings</p>
                        <p>Profile</p>
                    </div>
                    <div className='created-project-title'>
                        Created projects
                    </div>
                    <div>
                        A place to keep track of all your created projects
                    </div>
                    <div className='created-projectt'>
                        Started
                    </div>
                    <div className='created-project-list'>
                        <div className='created-project-element'>
                            <div className='created-project-image'>
                                <CreatedProjectImage url={"https://via.placeholder.com/150/92c952"}>

                                </CreatedProjectImage>
                            </div>
                            <div>
                                project name
                            </div>
                            <div className='created-project-status'>
                                Continue editing
                            </div>
                        </div>
                        <div className='created-project-element'>
                            <div className='created-project-image'>
                                
                                </div>
                            wowwwwwww
                        </div>
                        <div className='created-project-element'>
                            <div className='created-project-image'>
                                
                            </div>
                            wowwwwwww
                        </div>
                        <div className='created-project-element'>
                            wowwwwwww
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreatedProject