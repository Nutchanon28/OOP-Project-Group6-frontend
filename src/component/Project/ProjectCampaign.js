import React, { useContext, useState } from "react";
import "../../css/Project/ProjectCampaign.css";
import { BiUserCircle } from "react-icons/bi";
import Reward from "./Reward";
import DataContext from "../../context/DataContext";
import axios from "axios";

const ProjectCampaign = ({
  projectDetail,
  creator,
  faqs,
  rewards,
  updates,
  comments,
  rewardId,
  setRewardId,
  setHasCommented,
}) => {
  const { projectPage, userId, projectId } = useContext(DataContext);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      `http://127.0.0.1:8000/send_comment/${projectId}`,
      {
        user_id: parseInt(userId),
        text: comment,
      }
    );
    console.log(response);
    if (response.status === 200) {
      setHasCommented(true);
      setComment("");
    }
  };

  return (
    <div className="project-campaign">
      <div className="container">
        <div className="campaign-con">
          {projectPage === "Campaign" && (
            <>
              <div className="nav-col">
                <p>STORY</p>
                {/* <p>RISKS</p> */}
                {/* <p>ENVIRONMENTAL COMMITMENTS</p> */}
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
                        <div
                          onClick={() => setRewardId(reward.id)}
                          key={reward.id}
                        >
                          <Reward
                            reward={reward}
                            key={reward.id}
                            rewardId={rewardId}
                          />
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <p>loading</p>
                )}
              </div>
            </>
          )}
          {projectPage === "FAQ" &&
            (faqs ? (
              <div className="faqs-list">
                <h2>Frequently Asked Questions</h2>
                {faqs.map((faq) => {
                  return (
                    <div className="faq" key={faq.split(":")[0]}>
                      <p>{faq.split(":")[0]}</p>
                      <p>{faq.substring(faq.indexOf(":") + 1)}</p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p>loading</p>
            ))}
          {projectPage === "Updates" &&
            (updates ? (
              <div>
                {updates.map((update) => {
                  return (
                    <div key={update.update_title}>
                      <p>{update.update_title}</p>
                      <p>{update.update_creator}</p>
                      <p>{update.update_image}</p>
                      <p>{update.update_detail}</p>
                      <p>{update.likes}</p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p>loading</p>
            ))}
          {projectPage === "Comments" &&
            (comments ? (
              <div className="comments-list">
                {comments.map((comment) => {
                  return (
                    <div className="comment" key={comment.writer}>
                      <p>{comment.writer}</p>
                      <p>{comment.sending_time}</p>
                      <p>{comment.text}</p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p>loading</p>
            ))}
          {projectPage === "Comments" && (
            <form onSubmit={handleSubmit}>
              <label htmlFor="comment">comment:</label>
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="comment"
              />
              <button type="submit">Send</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCampaign;
