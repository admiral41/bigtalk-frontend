import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { forgotPasswordApi, loginApi } from "../apis/Api";
import { toast } from "react-toastify";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  
  // step 2: create a function to handle the changing the state variable
  const navigate = useNavigate();
  useEffect(() => {
    const isAuthenticated = !!localStorage.getItem("token");
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [navigate]);
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleForgotPasswordEmail = (e) => {
    setForgotPasswordEmail(e.target.value);
}

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  // step 3: create a function to handle the form submission
  const handelSubmit = (e) => {
    e.preventDefault();

    // Step 1 : Check data in console
    console.log(email, password);

    // creating json data (fieldName:)
    const data = {
      email: email,
      password: password,
    };
    //  send data to backend
    loginApi(data)
      .then((res) => {
        if (res.data.success == true) {
          toast.success(res.data.message);
          // save token in local storage
          localStorage.setItem("token", res.data.token);
          // converting incomming json
          const convertedJson = JSON.stringify(res.data.user);
          localStorage.setItem("user", convertedJson);
          navigate("/dashboard");
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Internal server error");
      });
  };
  const forgotPassword = (e) => {
    e.preventDefault();
    const data = {
      email: forgotPasswordEmail,
    };
    forgotPasswordApi(data)
      .then((res) => {
        if (res.data.success == true) {
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.error(err);
  toast.error(err.response?.data?.message || "Internal server error");
      });
};
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          {/* Left Section - Image and Content */}
          <div className="col-md-6 d-flex justify-content-center align-items-center text-white bg-dark vh-100">
            <div className="text-center">
              <img
                src="/assets/images/Logo.png"
                alt="Login Page Image"
                className="img-fluid"
              />
              <p className="mt-2">Where Conversations Come Alive!</p>
            </div>
          </div>

          {/* Right Section - Login Form */}
          <div className="col-md-6">
            <div className="d-flex flex-column align-items-center vh-100 justify-content-center">
              <form style={{ maxWidth: "400px", width: "100%" }}>
                <h2 className="text-center mb-4">Login</h2>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    onChange={handleEmail}
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter your username"
                    style={{ color: "black" }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    onChange={handlePassword}
                    className="form-control"
                    id="password"
                    placeholder="Enter your password"
                    style={{ color: "black" }}
                  />
                </div>
                <button
                  onClick={handelSubmit}
                  type="submit"
                  className="btn btn-dark text-white w-100"
                >
                  Login
                </button>
                <div className="mt-3 d-flex justify-content-end w-100">
                  <a
                    type="button"
                    className="text-decoration-none text-muted"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                  >
                    Forgot Password?
                  </a>

                  <div
                    class="modal fade"
                    id="staticBackdrop"
                    data-bs-backdrop="static"
                    data-bs-keyboard="false"
                    tabindex="-1"
                    aria-labelledby="staticBackdropLabel"
                    aria-hidden="true"
                  >
                    <div class="modal-dialog">
                      <div class="modal-content bg-dark text-white">
                        <div class="modal-header text-center align-items-center">
                          <h5
                            class="modal-title w-100"
                            id="staticBackdropLabel"
                          >
                            Change Password
                          </h5>
                          <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div class="modal-body">
                          <label>Enter your email</label>
                          <input
                            type="email"
                            onChange={handleForgotPasswordEmail}
                            className="form-control text-light"
                            id="email"
                            placeholder="Enter your email"
                            style={{ color: "white" }}
                          />
                        </div>
                        <div class="modal-footer">
                          {/* <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
                          <button
                            type="button"
                            class="btn btn-secondary"
                            onClick={forgotPassword}
                          >
                            Update Password
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-center mt-3">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="text-decoration-none text-danger"
                  >
                    Sign up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
