import React from 'react'
import '../../css/StartProjectComponent/RewardAdd.css'

function RewardAdd(props) {
    const { rewardInfo, rewardIncludes } = props;
    const rewardIncludeElements = rewardIncludes.map((include) => {
        return (
            <li key={include.id}>
                {include.quantity}x {include.name}
            </li>
        )
    })
    return (
        <div className='reward-add'>
            {/* <div className='reward-add-image'>
                Image
            </div> */}
            <p className='pledge-goal'>Pledge $ {rewardInfo.amount > 1 ? rewardInfo.amount : 1} or more</p>
            <p className='reward-name'>{rewardInfo.name.length ? rewardInfo.name : "Signed limited-edition"}</p>
            <p className='description'>{rewardInfo.description}</p>
            {rewardIncludes.length ? <p className='font10'>INCLUDE</p> : ""}
            <ul className='include'>
                {rewardIncludeElements}
            </ul>
            <div className='reward-add-group'>
                <p>ESTIMATED DELIVERY</p>
                <p>{rewardInfo.month} {rewardInfo.year}</p>
            </div>
            <div className='reward-add-group'>
                <p>REWARD QUANTITY</p>
                <p>{rewardInfo.quantity ? rewardInfo.quantity : "unlimited"}</p>
            </div>
        </div>
    )
}

export default RewardAdd