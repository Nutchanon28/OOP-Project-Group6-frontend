import React, { useContext, useEffect, useRef, useState } from 'react'
import '../../css/StartProjectComponent/AddReward.css'
import RewardAdd from './RewardAdd';
import { HiColorSwatch } from 'react-icons/hi';
import { Link, useNavigate } from 'react-router-dom';
import DataContext from '../../context/DataContext';
import axios from 'axios';

function AddReward() {
    const {projectId, setProjectId} = useContext(DataContext)
    let {rewardId, setRewardId} = useContext(DataContext)
    const [myShipping, setMyShipping] = useState([
        "", "Bangkok", "Chiangmai", "Khonkaen", "Phuket",
    ])
    const [project, setProject] = useState({})
    const [rewardInfo, setRewardInfo] = useState({
       name: '', amount: 1, description: '', month: 'January',
       year: '2023', quantity: 1, ships_to: []  
    })
    const [rewardInclude, setRewardInclude] = useState({
        name:'', quantity: 1
    })
    const [rewardIncludes, setRewardIncludes] = useState([]);

    const [buttonStatus, setButtonStatus] = useState([true, false]);
    const [addItemStatus, setAddItemStatus] = useState(false);
    const [shippings, setShippings] = useState([])
    const [focus, setFocus] = useState(99)
    const [selectedAddress, setSelectedAddress] = useState("")
    const navigate = useNavigate()
    const theDate = new Date()
    function onRewardInfoValueChange(event) {
        let {name, value} = event.target;
        if(name == "amount") {
            if(value < 1) value = 1
            else if(value > 10000) value = 10000
        }
        else if(name == "name") {
            if(value.length > 30) {
                value = value.substring(0, 30)
            }
        }
        else if(name == "description") {
            if(value.length > 1000) {
                value = value.substring(0, 1000)
            }
        }
        setRewardInfo((prevInfo) => {
            return {
                ...prevInfo,
                [name]: value
            };
        })
    }

    function onRewardIncludeChange(event) {
        let {name, value} = event.target;
        console.log(name, value)
        if(name == "name") {
            if(value.length > 30) {
                value = value.substring(0, 30)
            }
        }
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
        if(quantity < 1) quantity = 1;
        else if(quantity > 100) quantity = 100;
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

    function onAddShipping() {
        // setRewardInfo((prevInfo) => {
        //     const prevShipsTo = prevInfo.ships_to
        //     return {
        //         ...prevInfo,
        //         ships_to: [...prevShipsTo, selectedAddress]
        //     }
        // })
        if(selectedAddress == "") return;
        setShippings((prevShipping) => {
            return [...prevShipping, selectedAddress]
        })
        setMyShipping((prevShipping) => {
            const newShippings = prevShipping.filter((shipping) => {
                return shipping != selectedAddress
            })
            return newShippings
        })
        setSelectedAddress("")
        console.log(shippings)
    }


    async function onSaveRewardClick() {
        function  month2Int(month) {
            const mem = {
                January: 0,
                February: 1,
                March: 2,
                April: 3,
                May: 4,
                June: 5,
                July: 6,
                August: 7,
                September: 8,
                October: 9,
                November: 10,
                December: 11
            }
            return mem[[month]];
        }

        const currentDate = new Date()

        if(rewardInfo.year < currentDate.getFullYear()){
            return
        }
        else if(rewardInfo.year == currentDate.getFullYear() && month2Int(rewardInfo.month) <= currentDate.getMonth()) {
            console.log("Invalid Month")
            return
        }
        let newReward = {
            _PledgeReward__reward_goal: rewardInfo.amount,
            _PledgeReward__reward_name: rewardInfo.name,
            _PledgeReward__reward_detail: rewardInfo.description,
            _PledgeReward__reward_include: rewardIncludes,
            _PledgeReward__reward_backers: 0,
            _PledgeReward__reward_left: rewardInfo.quantity,
            _RewardShipping__estimated_delivery: {month: rewardInfo.month, year: rewardInfo.year},
            _RewardShipping__ships_to: shippings, 
            _RewardShipping__address: "", 
            _RewardShipping__shipping_cost: 99
        }
        if(newReward._PledgeReward__reward_name == "") {
            newReward._PledgeReward__reward_name = `Reward ${rewardId}`
        }
        await fetch(`http://127.0.0.1:8000/edit_project/${projectId}/add_pledge_reward/${rewardId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newReward)
          })
        console.log(JSON.stringify(newReward))
        navigate('../reward-tiers')
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

    function cancelClick() {
        setAddItemStatus(false)
        setRewardInclude({
            name:'', 
            quantity: 1
        })
    }

    function onDeleteShippingClick(idx) {
        setMyShipping((prevShipping) => {
            let newShippings = [...prevShipping, shippings[idx]]
            newShippings.sort()
            return newShippings
        })
        const newShippings = shippings.filter((shipping, index) => {
            return index != idx
        })
        setShippings(newShippings)
        console.log(`delete shipping idx = ${idx}`)
    }
    const tmp = (
        <div className='inner-button'>
            
        </div>
    );

    useEffect(() => {
        async function getProject() {
            const response = await axios.get(`http://127.0.0.1:8000/view_project/${projectId}`)
            const data = await response.data
            setProject(data.project_detail)
        }

        getProject()
    }, [])

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

    useEffect(() => {
        console.log(`Your reward id is ${rewardId}`)
    }, [rewardId])


    const dropdown = (
        <div className='radio-dropdown'>
            <p>Total available</p>
            <input
                type='number' 
                onChange={(event) => {setQuantity(event.target.value)}}
            />
        </div>
    )
    
    const myShippingElements = myShipping.map((shippings, idx) => {
            return (
                <option value={shippings}>{shippings}</option>
            )
        })

    const shipsToElements = shippings.map((shipping, idx) => {
        return  (
            <div key={idx} className='shipping-element'>
                <div>{shipping}</div>
                <div onClick={() => onDeleteShippingClick(idx)} className='delete-icon'>X</div>
            </div>
        )
            
    })

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
                                    onFocus={() => setFocus(0)}
                                    onBlur={() => setFocus(99)}
                                />
                                <div className='under-text side-right'>
                                    {focus == 0 ? `${rewardInfo.name.length}/30` : ""}
                                </div>
                            </div>
                            <div className='section-add-reward'>
                                <p>Amount</p>
                                <input 
                                    type='number'
                                    name='amount'
                                    value={rewardInfo.amount} 
                                    onChange={onRewardInfoValueChange}
                                    onFocus={() => setFocus(1)}
                                    onBlur={() => setFocus(99)}
                                />
                                <div className='under-text'>
                                    {focus == 1 ? "Enter a value between $1 and $10,000." : ""}
                                </div>
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
                                    onFocus={() => setFocus(2)}
                                    onBlur={() => setFocus(99)}
                                />
                                <div className='under-text side-right'>
                                    {focus == 2 ? `${rewardInfo.description.length}/1000` : ""}
                                </div>
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
                                        onFocus={() => setFocus(3)}
                                        onBlur={() => setFocus(99)}
                                    />
                                    <div className='under-text side-right '>
                                        {focus == 3 ? `${rewardInclude.name.length}/30` : ""}
                                    </div>
                                    <div onClick={addItemClick}>
                                        Save
                                    </div>
                                    <div onClick={cancelClick}>
                                        Cancel
                                    </div>
                                </div>
                            </div>
                            <div className='section-add-reward'>
                                <p>Shipping</p>
                                <div className='shipping-element-container'>
                                    {shipsToElements}
                                </div>
                                <select
                                    value={selectedAddress}
                                    onChange={(event) => setSelectedAddress(event.target.value)
                                    }
                                >
                                    {myShippingElements}
                                </select>
                                <div className='add-shipping-button' onClick={onAddShipping}>
                                    Add shipping
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
                                        <option>{theDate.getFullYear()}</option>
                                        <option>{theDate.getFullYear() + 1}</option>
                                        <option>{theDate.getFullYear() + 2}</option>
                                        <option>{theDate.getFullYear() + 3}</option>
                                        <option>{theDate.getFullYear() + 4}</option>
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
                                
                                    <div className='save-reward-button' onClick={onSaveRewardClick}>
                                        Save reward
                                    </div>
                                
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