import React, { useContext } from 'react'
import '../../css/StartProjectComponent/StartProjectHeader.css'
import { Link } from 'react-router-dom'

function StartProjectHeader() {

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