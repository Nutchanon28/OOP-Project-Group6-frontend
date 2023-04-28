import React, { useContext, useRef, useState } from 'react'
import '../../css/StartProjectComponent/AddReward.css'
import RewardAdd from './RewardAdd';
import { HiColorSwatch } from 'react-icons/hi';
import { AuthContext } from '../../App';
import { Link } from 'react-router-dom';

function AddReward() {
    const {auth, setAuth} = useContext(AuthContext)
    const [rewardInfo, setRewardInfo] = useState({
       name: '', amount: 1, description: '', month: 'January',
       year: '2023', quantity: 1  
    })
    const [rewardInclude, setRewardInclude] = useState({
        name:'', quantity: 1
    })
    const [rewardIncludes, setRewardIncludes] = useState([]);

    const [buttonStatus, setButtonStatus] = useState([true, false]);
    const [addItemStatus, setAddItemStatus] = useState(false);

    function onRewardInfoValueChange(event) {
        const {name, value} = event.target;
        setRewardInfo((prevInfo) => {
            return {
                ...prevInfo,
                [name]: value
            };
        })
    }

    function onRewardIncludeChange(event) {
        const {name, value} = event.target;
        console.log(name, value)
        setRewardInclude((prevInclude) => {
            return {
                ...prevInclude,
                [name]: value
            }
        })
    }

    function addInclude() {
        setRewardIncludes((prevIncludes) => {
            const include = {...rewardInclude}
            include.quantity = 1
            include.id = Date.now().toString()
            return [...prevIncludes, include]
        })
        setRewardInclude((prevInclude) => {
            const include = {...prevInclude}
            include.name = ""
            return include
        })
    }

    function setIncludeQuantity(theId, quantity) {
        setRewardIncludes((prevIncludes) => {
            return prevIncludes.map((include) => {
                if(include.id == theId) {
                    include.quantity = quantity
                }
                return include
            })
        })
    }

    function removeInclude(theId) {
        setRewardIncludes((prevIncludes) => {
            return prevIncludes.filter((include) => {
                return include.id != theId
            })
        })
    }


    async function onSaveRewardClick() {
        const newReward = {
            _PledgeReward__reward_goal: rewardInfo.amount,
            _PledgeReward__reward_name: rewardInfo.name,
            _PledgeReward__reward_detail: rewardInfo.description,
            _PledgeReward__reward_include: rewardIncludes,
            _PledgeReward__reward_backers: 0,
            _PledgeReward__max_reward_backers: rewardInfo.quantity,
            _RewardShipping__estimated_delivery: {month: rewardInfo.month, year: rewardInfo.year},
            _RewardShipping__ships_to: "Universe", 
            _RewardShipping__address: "", 
            _RewardShipping__shipping_cost: 99
        }
        await fetch(`http://127.0.0.1:8000/edit_project/${auth.currentEditProject.id}/add_pledge_reward/${auth.currentRewardId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newReward)
          })
        console.log(JSON.stringify(newReward))
    }

    function toggle(index) {
        let template = [false, false];
        template[index] = true;
        setButtonStatus(template);
    }

    function setQuantity(value) {
        setRewardInfo((prevInfo) => {
            return {
                ...prevInfo,
                quantity: value
            }
        })
    }

    function addItemClick() {
        if(addItemStatus){
            console.log(rewardInclude.name)
            addInclude();    
        }
        setAddItemStatus(!addItemStatus)
    }
    const tmp = (
        <div className='inner-button'>
            
        </div>
    );

    const includePreviewElements = rewardIncludes.map((include) => {
        return (
            <div className='include-preview-con' key={include.id}>
                <div className='include-name'>
                    {include.name}
                </div>
                <div className='include-quantity'>
                    <div className='font12'>QUANTITY</div>
                    <input 
                        type='number' 
                        name='quantity'
                        value={include.quantity}
                        onChange={(event) => {setIncludeQuantity(include.id, event.target.value)}}
                    />
                </div>
                
                <div className='remove-include' onClick={() => removeInclude(include.id)}>
                    Remove
                </div>
            </div>
        );
    })


    const dropdown = (
        <div className='radio-dropdown'>
            <p>Total available</p>
            <input
                type='number' 
                onChange={(event) => {setQuantity(event.target.value)}}
            />
        </div>
    )
    return (
        <div className='add-reward'>
            <div className='add-reward-container'>
                <div className='add-reward-con'>
                    <div className='add-reward-header'>
                        <p>Add a reward</p>
                        <p>Offer tangible or intangible things that bring backers closer to your project.</p>
                    </div>
                    <div className='container-add-reward'>
                        <div className='left'>
                            <div className='section-add-reward'>
                                <p>Title</p>
                                <input 
                                    type='text'
                                    placeholder='Signed limited-edition'
                                    name="name"
                                    value={rewardInfo.name} 
                                    onChange={onRewardInfoValueChange} 
                                />
                            </div>
                            <div className='section-add-reward'>
                                <p>Amount</p>
                                <input 
                                    type='number'
                                    name='amount'
                                    value={rewardInfo.amount} 
                                    onChange={onRewardInfoValueChange}
                                />
                            </div>
                            <div className='section-add-reward'>
                                <p>Description</p>
                                <p>Describe what makes this reward stand out from your other offerings. Avoid re-listing items as this will look repetitive to backers.</p>
                                <textarea 
                                    rows={5} 
                                    placeholder='Get an early copy — hot off the presses!'
                                    name='description'
                                    value={rewardInfo.description}
                                    onChange={onRewardInfoValueChange} 
                                />
                            </div>
                            <div className='section-add-reward'>
                                <p>Items</p>
                                <p>Including items in your rewards and add-ons makes it easy for backers to understand and compare your offerings. An item can be anything you plan to offer your backers. Some examples include playing cards, a digital copy of a book, a ticket to a play, or even a thank-you in your documentary.</p>
                                <div className='include-preview'>
                                    {includePreviewElements}
                                </div>
                                <div className={`add-reward-include + ${addItemStatus ? " hidden" : ""}`} onClick={addItemClick}>
                                    +New item
                                </div>
                                <div className={`add-include + ${addItemStatus ? "" : " hidden"}`}>
                                    <p>Create a new item</p>
                                    <input 
                                        type='text' 
                                        placeholder='Digital Photo' 
                                        name='name'
                                        value={rewardInclude.name}
                                        onChange={onRewardIncludeChange}
                                    />
                                    <div onClick={addItemClick}>
                                        Save
                                    </div>
                                    <div>
                                        Cancel
                                    </div>
                                </div>
                            </div>
                            <div className='section-add-reward'>
                                <p>Estimated delivery</p>
                                <p>Give yourself plenty of time. It's better to deliver to backers ahead of schedule than behind.</p>
                                <div className='estimated-bar'>
                                    <select 
                                        placeholder='Month' 
                                        name='month'
                                        value={rewardInfo.month}
                                        onChange={onRewardInfoValueChange}
                                    >
                                        <option>January</option>
                                        <option>February</option>
                                        <option>March</option>
                                        <option>April</option>
                                        <option>May</option>
                                        <option>June</option>
                                        <option>July</option>
                                        <option>August</option>
                                        <option>September</option>
                                        <option>October</option>
                                        <option>November</option>
                                        <option>December</option>
                                    </select>
                                    <select 
                                        placeholder='Year'
                                        name='year'
                                        value={rewardInfo.year}
                                        onChange={onRewardInfoValueChange}
                                    >
                                        <option>2023</option>
                                        <option>2024</option>
                                        <option>2025</option>
                                        <option>2026</option>
                                        <option>2027</option>
                                    </select>
                                </div> 
                            </div>
                            <div className='section-add-reward'>
                                <p>Project quantity</p>
                                <p>Limit the amount available to all backers if mass production or shipping is impractical. You can only increase a set amount after launch.</p>
                                <div>
                                    <div className='radio-option'>
                                        <div className={`radio-button + ${buttonStatus[0] ? "radio-button-click" : ""}`} onClick={() => {toggle(0); setQuantity(0)}}>
                                            {buttonStatus[0] ? tmp : <div></div>}
                                        </div>
                                        <div className='radio-content'>
                                            Unlimited
                                        </div>
                                    </div>
                                    <div className='radio-option'>
                                        <div className={`radio-button + ${buttonStatus[1] ? "radio-button-click" : ""}`} onClick={() => {toggle(1)}}>
                                            {buttonStatus[1] ? tmp : <div></div>}
                                        </div>
                                        <div className='radio-content'>
                                            Limited
                                        </div>
                                    </div>
                                    {buttonStatus[1] ? dropdown : <div></div>}
                                    <div>

                                    </div>
                                </div>
                            </div>
                            <div className='section-add-reward'>
                                <Link to='../reward-tiers'>
                                    <div className='save-reward-button' onClick={onSaveRewardClick}>
                                        Save reward
                                    </div>
                                </Link>
                                <div className='cancel-reward-button'>
                                    Cancel
                                </div>
                            </div>
                        </div>
                        <div className='right'>
                            <p>Reward preview</p>
                            <p>Get a glimpse of how this reward will look on your project page.</p>
                            <RewardAdd rewardInfo={rewardInfo} rewardIncludes={rewardIncludes}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddReward