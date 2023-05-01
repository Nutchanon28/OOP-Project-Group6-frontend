import React from "react";
import { useState, useEffect } from "react";
import "../../css/OtherPage/AddUpdate.css";

function AddUpdate() {

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
                  <div className="temp-op">
                    <p>Freeform</p>
                    <p>Your story, your way</p>
                    </div>
                  <div className="temp-op">
                    <p>Q+A</p>
                    <p>Follow Our lead</p>
                  </div>
                </div>
                <p className="text">Build trust with your backers.Learn about project updates and why they're important.Never include your backer's names, addresses, and other personal details in your updates.</p>
              </div>
              <div className="detail">
                <p>Title</p>
                <div className="box1"></div>
                <p>Body</p>
                <div className="box2"></div>
              </div>
            </div>
            <div className="setting">
              <p>Visible to</p>
              <div className="privacy-choice"> </div>
              <p>Notifications</p>
              <div className="privacy-choice"> </div>
            </div>

          </div>
          <div className="footer">
            <div className="button">Delete draft</div>
            <div className="button">Preview</div>
            <div className="button">Draft saved</div>
            <div className="button">Publish</div> 
            {/* if u click "Publish" it will call app.post add_update function from api*/}
          </div>
        </div>
      </div>
    );
  }
  
  export default AddUpdate;
  