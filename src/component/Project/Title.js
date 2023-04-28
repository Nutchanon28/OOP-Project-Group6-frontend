import React from "react";
import "../../css/Project/Title.css";

const Title = ({ projectName, projectCategory }) => {
  return (
    <div className="title">
      <div className="container">
        {projectName ? <p>{projectName}</p> : <p>Project Title</p>}
        {projectCategory ? <p>{projectCategory}</p> : <p>project category</p>}
      </div>
    </div>
  );
};

export default Title;
