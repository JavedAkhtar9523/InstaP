import React, { useEffect, useState } from "react";
import "./CreatePost.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const navigate = useNavigate();

  // Toast Function
  const NotifyA = (msg) => toast.error(msg);
  const NotifyB = (msg) => toast.success(msg);

  useEffect(() => {
    if (url) {
      fetch("http://localhost:5000/api/v1/create/createpost", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          body,
          pic: url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            NotifyA(data.error);
          } else {
            NotifyB("Successfully Posted");
            navigate("/");
          }
        })
        .catch((err) => console.log(err));
    }
  }, [url]);

  // Posting image to cloudinary
  const postDetails = () => {
    console.log(body, image);
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "insta-clone");
    data.append("cloud_name", "davwhkyqy");
    fetch("https://api.cloudinary.com/v1_1/davwhkyqy/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => setUrl(data.url))
      .catch((err) => console.log(err));

    // Saving post to mmongodb
  };

  const loadfile = (event) => {
    var output = document.getElementById("output");
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src); // free memory
    };
  };
  return (
    <>
      <div className="create-post">
        <div className="post-header">
          <h4 style={{ margin: "3px auto" }}>Create New Post</h4>
          <button
            id="post-btn"
            onClick={() => {
              postDetails();
            }}
          >
            Share
          </button>
        </div>
        <div className="main-div">
          <img
            id="output"
            src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-512.png"
            alt="dummy"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(event) => {
              loadfile(event);
              setImage(event.target.files[0]);
            }}
          />
        </div>
        <div className="details">
          <div className="card-header">
            <div className="card-pic">
              <img
                src="https://plus.unsplash.com/premium_photo-1664478231441-f4d8896bcb3b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
                alt=""
              />
            </div>
            <h5>jenny</h5>
          </div>
          <textarea
            type="text"
            value={body}
            onChange={(e) => {
              setBody(e.target.value);
            }}
            placeholder="write a caption..."
          ></textarea>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
