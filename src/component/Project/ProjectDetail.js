import React from "react";
import "../../css/Project/ProjectDetail.css";
import styled from "styled-components";

const Image = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    background: url(${props => props.url});
    background-size: cover;
    background-position: center;
`

const ProjectDetail = ({
  image,
  pledgeReceived,
  numberOfBackers,
  pledgeGoal,
  pledgeDuration,
  handleBack,
}) => {
  return (
    <div className="project-detail">
      <div className="project-con">
        <div className="the-project-container">
          <div className="project-image">
            <Image url={image}>

            </Image>
          </div>
          <div className="right-section">
            {
            console.log((pledgeReceived))
            }
            <progress value={(pledgeReceived / pledgeGoal) * 100 || 0} max="100">
              {(pledgeReceived / pledgeGoal) * 100 || 0}%
            </progress>
            <div className="detail">
              <div className="pledged-amount">
                <p>{pledgeReceived} Baht</p>
                <p>pledged of {pledgeGoal} Baht goal</p>
              </div>
              <div className="backers">
                <p>{numberOfBackers}</p>
                <p>backers</p>
              </div>
              <div className="day-to-go">
                <p>{pledgeDuration}</p>
                <p>days to go</p>
              </div>
            </div>
            <div className="operation-section">
              <div className="back-button" onClick={handleBack}>
                Back this project
              </div>
              <div className="bookmark-button">Remind me</div>
              <div>
                This project will only be funded if it reaches its goal by Wed,
                March 29 2023 4:00 AM UTC +07:00
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
