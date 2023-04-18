import React, { useContext } from 'react'
import '../../css/StartProjectComponent/StartProject.css'
import StartProjectNav from './StartProjectNav'
import AddBasic from './AddBasic'
import SetFunding from './SetFunding'
import Payment from './Payment'
import AddReward from './AddReward'
import SetDescription from './SetDescription'
import RewardTiers from './RewardTiers'
import StartProjectHeader from './StartProjectHeader'
import { Route, Routes } from 'react-router-dom'
import { AuthContext } from '../../App'

function StartProject() {
    const {auth, setAuth} = useContext(AuthContext);

    return (
        <div className='start-project'>
            <div className='start-project-container'>
                <div className='start-project-con'>
                    <StartProjectNav />
                    <Routes>
                        <Route path="" element={<AddBasic />}/>
                        <Route path="set-funding" element={<SetFunding />}/>
                        <Route path="reward-tiers" element={<RewardTiers />}/>
                        <Route path='reward-tiers/add-reward' element={<AddReward />} />
                        <Route path="set-description" element={<SetDescription />}/>
                        <Route path="set-payment" element={<Payment />}/>
                    </Routes>
                </div>
            </div>
        </div>
    )
}

export default StartProject