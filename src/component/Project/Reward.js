import React from 'react'
import "../../css/Project/Reward.css"

const Reward = ({ reward }) => {
    return (
        <div className='reward'>
            <div className='reward-container'>
                <div className='reward-con'>
                    <div className='reward-cost'>
                        Pledge {reward.reward_goal} Baht or more
                    </div>
                    <div className='reward-name'>
                        {reward.reward_name}
                    </div>
                    <div className='reward-description'>
                        {reward.reward_detail}
                    </div>
                    <div className='reward-include'>
                        <p>INCLUDES:</p>
                        <ul>
                            <li>{reward.reward_include}</li>
                        </ul>
                    </div>
                    <div className='reward-delivery'>
                        <p>ESTIMATED DELIVERY</p>
                        <p>Adipisicing fugiat nisi ullamco mollit quis magna culpa duis cillum qui amet ullamco ullamco.</p>
                    </div>
                    <div className='reward-remaining'>
                        <p>{reward.reward_left} remainings</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Reward