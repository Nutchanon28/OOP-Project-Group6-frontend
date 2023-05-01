import React, { useContext } from "react";
import { useState, useEffect } from "react";
import DataContext from "../../context/DataContext";
import "../../css/OtherPage/AddUpdate.css";
import axios from "axios";

function AddUpdate() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [defaultLayout, setDefaultLayout] = useState(true);
  const { projectId, userId } = useContext(DataContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("you have entered");

    const data = defaultLayout
      ? {
          project_id: parseInt(projectId),
          user_id: parseInt(userId),
          update_title: title,
          update_detail: body,
          update_image: imageUrl,
        }
      : {
          project_id: parseInt(projectId),
          user_id: parseInt(userId),
          question: title,
          answer: body,
        };
    const response = await axios.post(
      defaultLayout
        ? "http://127.0.0.1:8000/add_update"
        : "http://127.0.0.1:8000/add_faq",
      data
    );
    console.log(response);
  };

  return (
    <div className="addUpdate">
      <div className="addUpdate-container">
        <div className="addUpdate-con">
          <div className="menu"></div>
          <div className="content">
            <div className="header">
              <p>New Update</p>
              <p>choose an update style</p>
              <div className="template-option">
                <div className="temp-op" onClick={() => setDefaultLayout(true)}>
                  <p>Freeform</p>
                  <p>Your story, your way</p>
                </div>
                <div
                  className="temp-op"
                  onClick={() => setDefaultLayout(false)}
                >
                  <p>Q+A</p>
                  <p>Follow Our lead</p>
                </div>
              </div>
              <p className="text">
                Build trust with your backers.Learn about project updates and
                why they're important.Never include your backer's names,
                addresses, and other personal details in your updates.
              </p>
            </div>
            <div className="freeform">
              {defaultLayout && (
                <>
                  <form className="detail" onSubmit={handleSubmit}>
                    <p>Title</p>
                    <input
                      className="box1"
                      type="text"
                      id="title"
                      value={title}
                      placeholder="Title"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <p>Body</p>
                    <input
                      className="box2"
                      type="text"
                      id="body"
                      value={body}
                      placeholder="Detail"
                      onChange={(e) => setBody(e.target.value)}
                    />
                    <p>Image</p>
                    <input
                      className="box3"
                      type="text"
                      id="image"
                      value={imageUrl}
                      placeholder="ImageLink"
                      onChange={(e) => setImageUrl(e.target.value)}
                    />
                    <div className="footer">
                      <button className="button">Delete draft</button>
                      <button className="button" type="submit">
                        Publish
                      </button>
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
                    <input
                      className="box1"
                      type="text"
                      id="title"
                      value={title}
                      placeholder="Question"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <p>Answer</p>
                    <input
                      className="box2"
                      type="text"
                      id="body"
                      value={body}
                      placeholder="Answer"
                      onChange={(e) => setBody(e.target.value)}
                    />
                    <div className="footer">
                      <div className="button">Delete draft</div>
                      <input
                        className="button"
                        type="submit"
                        placeholder="Publish"
                      />
                      {/* if u click "Publish" it will call app.post add_update function from api*/}
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
          <div className="setting"></div>
        </div>
      </div>
    </div>
  );
}

export default AddUpdate;
