import React, { useEffect, useState } from "react";
import "./Profile.css";

const Profile = () => {
  const [pic, setPic] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/api/v1/create/myposts", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setPic(result);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <div className="profile">
        {/* profile frame  */}

        <div className="profile-frame">
          <div className="profile-pic">
            <img
              src="https://plus.unsplash.com/premium_photo-1664478231441-f4d8896bcb3b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
              alt=""
            />
          </div>

          {/* profile data  */}
          <div className="profile-data">
            <h1>{JSON.parse(localStorage.getItem("user")).name}</h1>
            <div className="profile-info" style={{ display: "flex" }}>
              <p>40 Post</p>
              <p>40 followers</p>
              <p>40 folllowing</p>
            </div>
          </div>
        </div>
        <hr style={{ width: "90%", margin: "25px auto", opacity: "0.8" }} />
        {/* gallery */}
        <div className="gallery">
          {pic.map((pics) => {
            return <img key={pics._id} src={pics.photo} alt="profilePic" />;
          })}
        </div>
      </div>
    </>
  );
};

export default Profile;
