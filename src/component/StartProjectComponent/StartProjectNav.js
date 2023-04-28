import React, { useState } from 'react'
import '../../css/StartProjectComponent/StartProjectNav.css'
import { NavLink } from 'react-router-dom'

function StartProjectNav() {

    const [decoration, setDecoration] = useState(1)

    function getNavClass(navLinkProps) {
        let navClass = 'app-header-item';
        if (navLinkProps.isActive) navClass += ' app-header-item-active';
        return navClass;
      }

    return (
        <div className='start-project-nav'>
            <div className='start-project-nav-container'>
                <ul className='start-project-nav-con'>
                    <NavLink className={getNavClass} to="">
                        <li><p>✍️</p>Basics</li>
                    </NavLink>
                    <NavLink className={getNavClass} to="set-funding">
                        <li><p>📊</p>Funding</li>
                    </NavLink >
                    <NavLink className={getNavClass} to="reward-tiers">
                        <li><p>🎁</p>Rewards</li>
                    </NavLink>
                    <NavLink className={getNavClass} to="set-description">
                        <li><p>📖</p>Story</li>
                    </NavLink>
                    <NavLink className={getNavClass} to="set-payment">
                        <li><p>💰</p>Payment</li>
                    </NavLink>
                </ul>
            </div>
        </div>
    )
}

export default StartProjectNav