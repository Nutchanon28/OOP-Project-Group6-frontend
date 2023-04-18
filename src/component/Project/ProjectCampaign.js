import React from "react";
import "../../css/Project/ProjectCampaign.css";
import { BiUserCircle } from "react-icons/bi";
import Reward from "./Reward";

const ProjectCampaign = ({ projectDetail, creator, rewards, setRewardId }) => {
  return (
    <div className="project-campaign">
      <div className="container">
        <div className="campaign-con">
          <div className="nav-col">
            <p>STORY</p>
            <p>RISKS</p>
            <p>ENVIRONMENTAL COMMITMENTS</p>
          </div>
          <div className="campaign-content">
            <p>{projectDetail}</p>
          </div>
          <div className="right-menu">
            <div className="project-creator">
              <BiUserCircle className="user-icon" />
              {/* <img src="https://fakeimg.pl/300/" alt="test" /> */}
              {creator ? (
                <>
                  <p className="creator-name">{creator.name}</p>
                  <p className="creator-bio">{creator.biography}</p>
                </>
              ) : (
                <p>loading</p>
              )}
            </div>
            {/* <div className="reward-list">
              <Reward />
            </div> */}
            {rewards ? (
              <>
                {rewards.map((reward) => {
                  return (
                    <div onClick={() => setRewardId(reward.id)} key={reward.id}>
                      <Reward reward={reward} key={reward.id} />
                    </div>
                  );
                })}
              </>
            ) : (
              <p>loading</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCampaign;
