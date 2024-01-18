import React from "react";
import "./Profile.css";
const Profile = () => {
  return (
    <>
      <div className="text-light w-100 d-flex justify-content-center pt-3">
        <div className="dashboard-profile">
          <div className=" d-flex justify-content-between">
            <div className="name">
              <h3 style={{ fontSize: "1.6rem" }}>Full Name</h3>
              <hp style={{ fontSize: "1.2rem" }}>user name</hp>
            </div>
            <img
              src="/assets/icons/p.png"
              alt="User Avatar"
              style={{ height: "90px", width: "90px", borderRadius: "50%" }}
            />
          </div>
          <p style={{ color: "gray" }} className="pt-3">
            0 Follower
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
