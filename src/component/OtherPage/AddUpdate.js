import React from "react";
import { useState, useEffect } from "react";
import "../../css/OtherPage/AddUpdate.css";

function AddUpdate() {
  
  const [title ,setTitle] = useState("")
  const [body ,setBody] = useState("")
  const [defaultLayout, setDefaultLayout] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("you have entered")
    // if (defaultLayout === true){
    //   input = {
    //     "";
    //   }
    //   const response= await fetch(
    //     `http://127.0.0.1:8000/add_update?input=${input}`
    //   )
    // }
    // const response= await fetch(
    //   `http://127.0.0.1:8000/add_update?keyword=${keyword}&category=${category}`
    // )
    // const responseJson = await response.json()
    // setSearchedProjects(responseJson)
    // console.log(responseJson);
  }

    return (
      <div className="addUpdate">
        <div className="addUpdate-container">
          <div className="addUpdate-con">
            <div className="menu">

            </div>
            <div className="content">
              <div className="header">
                <p>New Update</p>
                <p>choose an update style</p>
                <div className="template-option">
                  <div className="temp-op" onClick={() => setDefaultLayout(true)}>
                    <p>Freeform</p>
                    <p>Your story, your way</p>
                    </div>
                  <div className="temp-op" onClick={() => setDefaultLayout(false)}>
                    <p>Q+A</p>
                    <p>Follow Our lead</p>
                  </div>
                </div>
                <p className="text">Build trust with your backers.Learn about project updates and why they're important.Never include your backer's names, addresses, and other personal details in your updates.</p>
              </div>
              <div className="freeform">
                {defaultLayout && (
                  <>
                  <form className="detail" action="/action_page.php">
                    <p>Title</p>
                    <input className="box1" type="text" id = "title" value = {title} placeholder="Title" onChange={(e) => setTitle(e.target.value)}/>
                    <p>Body</p>
                    <input className="box2" type="text" id = "body" value = {body} placeholder="Detail" onChange={(e) => setBody(e.target.value)}/>
                    <p>Image</p>
                    <input className="box3" type="text" id = "image" value = {body} placeholder="ImageLink" onChange={(e) => setBody(e.target.value)}/>
                    <div className="footer">
                      <div className="button">Delete draft</div>
                      <div className="button">Publish</div> 
                      {/* if u click "Publish" it will call app.post add_update function from api*/}
                    </div>
                  </form>
                  </>
                )}
              </div>
              <div className="QnA">
                {!defaultLayout && (
                  <>
                  <form className="detail" onSubmit={handleSubmit}>
                    <p>Question</p>
                    <input className="box1" type="text" id = "title" value = {title} placeholder="Question" onChange={(e) => setTitle(e.target.value)}/>
                    <p>Answer</p>
                    <input className="box2" type="text" id = "body" value = {body} placeholder="Answer" onChange={(e) => setBody(e.target.value)}/>
                    <div className="footer">
                      <div className="button">Delete draft</div>
                      <input className="button" type="submit" placeholder="Publish"/>
                      {/* if u click "Publish" it will call app.post add_update function from api*/}
                    </div>
                  </form>
                  </>
                )}
              </div>
            </div>
            <div className="setting">
              
            </div>

          </div>
        </div>
      </div>
    );
  }
  
  export default AddUpdate;
  