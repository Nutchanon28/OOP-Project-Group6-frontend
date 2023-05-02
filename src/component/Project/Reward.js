import React, { useContext } from "react";
import DataContext from "../../context/DataContext";
import "../../css/Project/Reward.css";

const Reward = ({ reward }) => {
  const { rewardId } = useContext(DataContext);

  return (
    <div
      className={`reward ${reward.id === rewardId ? "selected-reward" : ""}`}
    >
      <div className="reward-container">
        <div className="reward-con">
          <div className="reward-cost">
            Pledge {reward.reward_goal} Baht or more
          </div>
          <div className="reward-name">{reward.reward_name}</div>
          <div className="reward-description">{reward.reward_detail}</div>
          {console.log(reward.reward_include)}
          {reward.reward_include.length ? (
            <div className="reward-include">
              <p>INCLUDES:</p>
              <ul>
                {reward.reward_include.map((included) => {
                  return (
                    <li>
                      {included.quantity}x {included.name}
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : (
            ""
          )}
          <div className="reward-delivery">
            <p>ESTIMATED DELIVERY</p>
            <p>
              This reward is estimated to be delivered by this date:{" "}
              {reward.reward_shipping._RewardShipping__estimated_delivery}. This
              reward ships to{" "}
              {reward.reward_shipping._RewardShipping__ships_to.join(", ")}
            </p>
          </div>
          <div className="reward-remaining">
            <p>{reward.reward_left} remainings</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reward;
