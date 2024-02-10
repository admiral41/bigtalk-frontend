import React, { useEffect, useState } from "react";
import "./Profile.css";
const Profile = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    // Retrieve user data from local storage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  if (!user) {
    return null; // Render nothing if user data is not available yet
  }
  const getInitials = (name) => {
    const words = name.split(" ");
    if (words.length === 1) {
      return words[0].slice(0, 2).toUpperCase();
    } else {
      return words.map((word) => word[0]).join("").toUpperCase();
    }
  };
  const { name, username, following, followers } = user;

  return (
    <>
      <div className="text-light w-100 d-flex justify-content-center pt-3">
        <div className="dashboard-profile">
          <div className=" d-flex justify-content-between">
            <div className="name">
            <h3 style={{ fontSize: "1.6rem" }}>{name}</h3>
            <p style={{ color: "gray", fontSize: "1.2rem" }}>{username}</p>
            </div>

              {user.avatar && isValidURL(user.avatar.url) ? (
                <img
                  src={user.avatar.url}
                  alt="User Avatar"
                  className="avatar-img"
                  style={{ height: "90px", width: "90px", borderRadius: "50%" }}
                />
              ) : (
                <div className="avatar-placeholder"  style={{ height: "90px", width: "90px", borderRadius: "50%" }}> 
                  <p className="fw-bold">{getInitials(user.name)}</p>
                </div>
              )}
           
          </div>
          <p style={{ color: "gray" }} className="pt-3">
          {followers.length} Follower{followers.length !== 1 && "s"} |{" "}
          {following.length} Following
        </p>
          <div className="bottons d-flex justify-content-between">
            <button
              type="button"
              className="btnss "
              style={{ width: "48%" }}
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            >
              Edit Profile
            </button>

            <div
              class="modal fade "
              id="staticBackdrop"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabindex="-1"
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog ">
                <div class="modal-content bg-dark text-light">
                  <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">
                      Edit Profile
                    </h5>
                    <button
                      type="button"
                      class="btn-close"
                      style={{ color: "white" }}
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">...</div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-light w-100">
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <button className="btnss " style={{ width: "48%" }}>
              Shared Profile
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;

function isValidURL(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}
