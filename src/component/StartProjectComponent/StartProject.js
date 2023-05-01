import React, { useContext, useEffect } from 'react'
import '../../css/StartProjectComponent/StartProject.css'
import StartProjectNav from './StartProjectNav'
import AddBasic from './AddBasic'
import SetFunding from './SetFunding'
import Payment from './Payment'
import AddReward from './AddReward'
import SetDescription from './SetDescription'
import RewardTiers from './RewardTiers'
import StartProjectHeader from './StartProjectHeader'
import { Route, Routes, useParams } from 'react-router-dom'
import DataContext from '../../context/DataContext'
import axios from "axios";

function StartProject() {
    const { projectId, setProjectId } = useContext(DataContext);
    //const { projectId } = useParams()
    console.log(projectId)
    
    useEffect(() => {
        const getProject = async () => {
          const response = await axios.get(
            `http://127.0.0.1:8000/get_last_project`
          );
          console.log(response.data);
          setProjectId(response.data.id);
        };
        getProject();
    
        console.log("this won't cause infinite loop");
        console.log(`Your project id is ${projectId}`)
        //setHasCommented(false);
      }, [projectId]);
    return (
        <div className='start-project'>
            <div className='start-project-container'>
                <div className='start-project-con'>
                    <StartProjectNav projectId={projectId} setProjectId={setProjectId}/>
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