import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../css/OtherPage/SearchResult.css";

function SearchResult() {

  const [keyword ,setKeyword] = useState("")
  const [category, setCategory] = useState("all")
  const [searchedProjects, setSearchedProjects] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("you have entered")

    const response= await fetch(
      `http://127.0.0.1:8000/search_project?keyword=${keyword}&category=${category}`
    )
    const responseJson = await response.json()
    setSearchedProjects(responseJson)
    console.log(responseJson);
  }

  return (
    <div className="search-result">
      <div className="search-result-container">
        <form className= "search-option" onSubmit={handleSubmit}>
          <p>Show me</p>
          <input
            id = "keyword"
            type = "text"
            placeholder="keyword"
            value = {keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <p>projects in</p>
          <input
            id = "category"
            type = "text"
            placeholder="category"
            value = {category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <input
            type = "submit"
          />
          
        </form>

        <div className="result">
          <div className="Heading">
            <p>Explore</p>
            <p>{searchedProjects.length} projects</p>
          </div>

          <div className="project-container">
            {searchedProjects?.map((searchedProject) =>{
              console.log(searchedProject)
              return (
                <div className="project">
                  <img className="project-picture" src={searchedProject.project_detail.image}></img>
                  <div className="project-info">
                    <Link to={`..//project/${searchedProject.project_detail.id}`} className="project-name">{searchedProject.project_detail.name}</Link>
                    <p className="description">{searchedProject.project_detail.detail}</p>
                    <p className="editor">By {searchedProject.creator_detail.name}</p>
                    <div className="percentage">
                      <p className="grayBox" style={{width:300}}> </p>
                      <p className="greenBox" style={{width:((searchedProject.project_detail.pledge_received/searchedProject.project_detail.pledge_goal))*300}}> </p>
                    </div>
                    <p className="pledge-goal">{searchedProject.project_detail.pledge_goal} Baht pledged</p>
                    <p className="pledge-received">{(searchedProject.project_detail.pledge_received/searchedProject.project_detail.pledge_goal)*100}% funded</p>
                    <p className="time-duration">{searchedProject.project_detail.project_duration}</p>
                    <p className="category">{searchedProject.project_detail.category}</p>
                  </div>
                </div>
                )
            } 
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchResult;
