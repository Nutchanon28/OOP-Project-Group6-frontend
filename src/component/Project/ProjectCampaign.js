import React, { useContext, useState } from "react";
import "../../css/Project/ProjectCampaign.css";
import "../../css/Project/Reward.css";
import Reward from "./Reward";
import DataContext from "../../context/DataContext";
import axios from "axios";
import { AiOutlineLike } from "react-icons/ai";

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
  const [avatar, setAvatar] = useState("");

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

  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get(`http://127.0.0.1:8000/view_user/${userId}`);
      setAvatar(response.data.avatar);
    }

    getUser();
  })

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
                  <img src={creator?.avatar} alt="profile" />
                  {creator ? (
                    <>
                      <p className="creator-name">{creator.name}</p>
                      <p className="creator-bio">
                        {creator.biography.length > 100
                          ? creator.biography.substring(0, 100) + "..."
                          : creator.biography}
                      </p>
                      <a>
                        <p className="creator-website">{creator.website}</p>
                      </a>
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
                    <div
                      className={`reward ${
                        rewardId === 0 ? "selected-reward" : ""
                      }`}
                      onClick={() => setRewardId(0)}
                    >
                      <div className="reward-container">
                        <div className="reward-con">
                          <div className="reward-cost">
                            Pledge without a reward
                          </div>
                          <div className="reward-description">
                            because you believe in it.
                          </div>
                        </div>
                      </div>
                    </div>
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
              <div className="updates-list">
                {updates.map((update) => {
                  return (
                    <div className="update" key={update.update_title}>
                      <p>{update.update_title}</p>
                      <p>posted by {update.update_creator}</p>
                      <div className="update-image">
                        <img src={update.update_image} alt="update" />
                      </div>
                      <p style={{ marginBottom: "40px" }}>
                        {update.update_detail}
                      </p>
                      <div className="update-like">
                        <AiOutlineLike />
                        <p style={{ marginLeft: "5px" }}>{update.likes}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p>loading</p>
            ))}
          {projectPage === "Comments" &&
            (comments ? (
              <div className="comment-container">
                <div className="comments-list">
                  {comments.map((comment) => {
                    return (
                      <div className="comment" key={comment.sending_time}>
                        <div className="writer">
                          <img
                            src={avatar}
                            alt="avatar"
                          />
                          <div className="writer-detail">
                            {/* <p>{comment.writer}</p> */}
                            <p>{comment.sending_time}</p>
                          </div>
                        </div>
                        <p>{comment.text}</p>
                      </div>
                    );
                  })}
                </div>
                <form className="comment-form" onSubmit={handleSubmit}>
                  <label htmlFor="comment">comment:</label>
                  <textarea
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="comment"
                  />
                  <button type="submit">Send</button>
                </form>
              </div>
            ) : (
              <p>loading</p>
            ))}
          {/* {projectPage === "Comments" && (
            <form className="comment-form" onSubmit={handleSubmit}>
              <label htmlFor="comment">comment:</label>
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="comment"
              />
              <button type="submit">Send</button>
            </form>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default ProjectCampaign;
