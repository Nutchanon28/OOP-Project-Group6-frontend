import React, { useContext, useEffect, useState } from 'react'
import '../../css/StartProjectComponent/RewardTiers.css'
import { Link } from 'react-router-dom'
import DataContext from '../../context/DataContext'

function RewardTiers() {

    const {projectId, setProjectId} = useContext(DataContext)
    const {rewardId, setRewardId} = useContext(DataContext)
    const [rewards, setRewards] = useState([])
    const [project, setProject] = useState({})

    async function getRewards() {
        const response = await fetch(`http://127.0.0.1:8000/pledge_reward/${projectId}`)
        const responseJson = await response.json()
        let newRewards = []
        for(let i = 0; i < responseJson.length; i++){
            if(responseJson[i]._PledgeReward__reward_name.length) {
                newRewards.push(responseJson[i])
            }
            else {
                onDeleteRewardClick(responseJson[i].id)
            }
        }
        setRewards(newRewards)
        console.log(newRewards)
    }

    async function onAddRewardClick() {
        const newReward = {
            _PledgeReward__reward_goal: 1,
            _PledgeReward__reward_name: "",
            _PledgeReward__reward_detail: "",
            _PledgeReward__reward_include: [],
            _PledgeReward__reward_backers: 0,
            _PledgeReward__reward_left: 1,
            _RewardShipping__estimated_delivery: {month: 1, year: 2023},
            _RewardShipping__address: "",
            _RewardShipping__ships_to: "Bangkok",
            _RewardShipping__shipping_cost: 1
        }

        await fetch(`http://127.0.0.1:8000/edit_project/${projectId}/add_pledge_reward`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newReward)
          })


        console.log(newReward)

        const response = await fetch(`http://127.0.0.1:8000/get_last_reward_id/${projectId}`)
        const responseJson = await response.json()
        setRewardId(responseJson.id)
        //const newRewardId = Date.now().toString();
        //setRewardId(newRewardId)
        console.log(`Yourr reward id is ${rewardId}`)
       // console.log(`New reward id is ${newRewardId}`)
    }

    async function onDeleteRewardClick(rewardId) {
        const payload = {project_id: projectId, reward_id: rewardId}
        console.log(JSON.stringify(payload))
        await fetch(`http://127.0.0.1:8000/edit_project/${projectId}/delete_reward/${rewardId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        })

        getRewards()
       
    }

    useEffect(() => {
        async function getProject() {
            const response = await fetch(`http://127.0.0.1:8000/get_project/${projectId}`)
            const responseJson = await response.json()
            setProject(responseJson.project_detail)
            console.log(responseJson.project_detail)
        }
        getProject()
        console.log(`Your project id is ${projectId}`)
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
                    <div onClick={() => onDeleteRewardClick(reward.id)}>
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
