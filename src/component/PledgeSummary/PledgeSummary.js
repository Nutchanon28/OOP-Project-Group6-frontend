// SD: Back the Project
import React, { useContext, useEffect, useState } from "react";
import DataContext from "../../context/DataContext";
import "../../css/PledgeSummary/PledgeSummary.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PledgeSummary = () => {
  const [project, setProject] = useState({});
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [reward, setReward] = useState({});
  const [bonusCost, setBonusCost] = useState(0);
  const [creditId, setCreditId] = useState(0);
  const { userId, projectId, rewardId } = useContext(DataContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("test");
    if (!creditId) {
      alert("Please select your credit card.");
    } else {
      const response = await axios.post(
        "http://127.0.0.1:8000/back_the_project",
        {
          project_id: parseInt(projectId),
          user_id: parseInt(userId),
          reward_id: parseInt(rewardId),
          credit_card_id: parseInt(creditId),
          bonus_cost: parseInt(bonusCost),
        }
      );
      console.log(response);
      if (response.status === 200) {
        navigate(`/project/${projectId}`);
      }
    }
  };

  useEffect(() => {
    const getRequirement = async () => {
      const response = await axios.post(
        "http://127.0.0.1:8000/show_payment_requirements",
        { project_id: projectId, user_id: userId }
      );
      setProject(response.data.project_detail);
      setPaymentMethods(response.data.payment_methods);
      const reward = response.data.project_detail.pledge_rewards?.find(
        (reward) => reward.id === parseInt(rewardId)
      );
      setReward(reward);
    };
    getRequirement();
  }, [projectId, userId, rewardId]);

  return (
    <div className="pledgeSummary">
      <div className="pledgeSummaryDetail">
        <h1>Pledge Summary</h1>
        {project && (
          <div className="pledgeSummaryDetailBox">
            {/* <img src="https://via.placeholder.com/600/92c952" alt="project" /> */}
            <img src={project.project_detail?.image} alt="project" />
            <div className="pledgeSummaryDetailBoxText">
              <p>{project.project_detail?.name}</p>
              <p>{project.project_detail?.pledge_received} Baht received</p>
              <p>By {project.creator_detail?.name}</p>
            </div>
          </div>
        )}
        {project && (
          <>
            <form className="backForm" onSubmit={handleSubmit}>
              <label htmlFor="backForm">
                <p>Your Pledge</p>
              </label>
              {reward && (
                <div className="selectedPledgeReward">
                  <p>Reward</p>
                  <p>{reward?.reward_name}</p>
                  <p>{reward?.reward_goal} Baht</p>
                </div>
              )}
              <div className="bonusCost">
                <label htmlFor="bonusCost">Bonus cost</label>
                <input
                  type="number"
                  placeholder="bonus cost"
                  value={bonusCost}
                  onChange={(e) => setBonusCost(e.target.value)}
                  min="0"
                />
              </div>
              <div className="dividerLine"></div>
              <div className="totalAmount">
                <p>Total amount</p>
                <p>
                  {parseInt(bonusCost) && parseInt(bonusCost) >= 0
                    ? reward
                      ? reward.reward_goal + parseInt(bonusCost)
                      : parseInt(bonusCost)
                    : reward
                    ? reward.reward_goal
                    : 0}{" "}
                  Baht
                </p>
              </div>
              <div className="buttonContainer">
                <button type="Submit">Pledge</button>
              </div>
            </form>
          </>
        )}
      </div>
      <div className="paymentMethods">
        <div className="choosePayment">
          <h2>Payment Methods</h2>
          {paymentMethods?.map((paymentMethod) => {
            return (
              <div
                className={`paymentMethod ${
                  paymentMethod.id === creditId ? "selectedPaymentMethod" : ""
                }`}
                key={paymentMethod.id}
                onClick={() => setCreditId(paymentMethod.id)}
              >
                <p>Card number</p>
                <p>{paymentMethod._CreditCardTransaction__card_number}</p>
                <p>Expiration</p>
                <p>{paymentMethod._CreditCardTransaction__expiration}</p>
                <p>CVC</p>
                <p>{paymentMethod._CreditCardTransaction__cvc}</p>
                <p>Amount</p>
                <p>{paymentMethod._CreditCardTransaction__money_left}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PledgeSummary;
