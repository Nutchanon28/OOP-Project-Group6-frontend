import React, { useContext, useEffect, useState } from 'react'
import '../../css/StartProjectComponent/RewardTiers.css'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../App'

function RewardTiers() {

    const {auth, setAuth} = useContext(AuthContext)

    const [rewards, setRewards] = useState([])

    async function getRewards() {
        const response = await fetch(`http://127.0.0.1:8000/pledge_reward/${auth.currentEditProject.id}`)
        const responseJson = await response.json()
        setRewards(responseJson)
        console.log(rewards)
    }

    async function onAddRewardClick() {
        const newReward = {
            _PledgeReward__reward_goal: 1,
            _PledgeReward__reward_name: "",
            _PledgeReward__reward_detail: "",
            _PledgeReward__reward_include: [],
            _PledgeReward__reward_backers: 0,
            _PledgeReward__max_reward_backers: 1,
            _RewardShipping__estimated_delivery: {month: 1, year: 2023},
            _RewardShipping__address: "",
            _RewardShipping__ships_to: "Universe",
            _RewardShipping__shipping_cost: 1
        }

        const response = await fetch(`http://127.0.0.1:8000/view_all_project/${auth.currentEditProject.id}/get_reward_id`)
        const responseJson = await response.json()
        newReward.reward_id = responseJson.id

        setAuth((prevAuth) => {
            return {
                ...prevAuth,
                currentRewardId: responseJson.id 
            }
        })

        await fetch(`http://127.0.0.1:8000/edit_project/${auth.currentEditProject.id}/add_pledge_reward`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newReward)
          })


        console.log(newReward)
    }

    async function onDeleteRewardClick(rewardId) {
        const payload = {project_id: auth.currentEditProject.id, reward_id: rewardId}
        console.log(JSON.stringify(payload))
        await fetch(`http://127.0.0.1:8000/edit_project/${auth.currentEditProject.id}/delete_reward/${rewardId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        })

        getRewards()
       
    }

    useEffect(() => {
        getRewards()
    }, [])

    const rewardElements = rewards.map((reward, index) => {
        const includes = reward._PledgeReward__reward_include.map((include, index) => {
            return <li key={index}>{include.quantity}x {include.name}</li>
        })
        return (
            <div key={index} className='reward-outer-con'>
                <div className='reward-containerr'>
                    <div className='reward-amount'>
                        ${reward._PledgeReward__reward_goal}
                    </div>
                    <div className='reward-detail'>
                        <div>
                            {reward._PledgeReward__reward_name}
                        </div>
                        <div>
                            {reward._PledgeReward__reward_detail}
                        </div>
                    </div>
                    <ul className='reward-includes'>
                        {includes}
                    </ul>
                </div>
                <div className='operation-tab'>
                    <div onClick={() => onDeleteRewardClick(reward._PledgeReward__id)}>
                        Delete
                    </div>
                </div>
            </div>
            
        )
    })

    return (
        <div className='reward-tiers'>
            <div className='reward-tiers-container'>
                <div className='reward-tiers-header'>
                    <div>
                        Reward tiers
                    </div>
                    <Link to="add-reward" onClick={onAddRewardClick}>
                        <div className='reward-tiers-header-button'>
                            + New reward
                        </div>
                    </Link>
                </div>
                <div className={`reward-tiers-nav font12 ${rewards.length ? "" : "hidden"}`}>
                    <div>
                        PLEDGE AMOUNT
                    </div>
                    <div>
                        DETAILS
                    </div>
                    <div>
                        INCLUDES
                    </div>
                </div>
                <div className='reward-tiers-con'>
                  {rewardElements}  
                </div>
            </div>
        </div>
    )
}

export default RewardTiers
