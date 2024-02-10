// Register.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { registerApi } from "../apis/Api";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username,setUserName] = useState("");
  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleUserName = (e) => {
    setUserName(e.target.value);
  }
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // Step 1: Check data in console
    console.log(name, email, password);

    // Step 2: Add form validation logic here if needed

    const data = {
      name: name,
      username:username,
      email: email,
      password: password,
    };
    registerApi(data)
      .then((res) => {
        if (res.data.success === true) {
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Internal server error");
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

          {/* Right Section - Registration Form */}
          <div className="col-md-6">
            <div className="d-flex flex-column align-items-center vh-100 justify-content-center">
              <form style={{ maxWidth: "400px", width: "100%" }} >
                <h2 className="text-center mb-4">Register</h2>
                <div className="mb-3">
                  <label htmlFor="fullName" className="form-label">
                    Full Name
                  </label>
                  <input
                    onChange={handleName}
                    type="text"
                    className="form-control"
                    id="fullName"
                    placeholder="Enter your full name"
                    style={{ color: 'black' }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    onChange={handleUserName}
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Enter your full name"
                    style={{ color: 'black' }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    onChange={handleEmail}
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter your email"
                    style={{ color: 'black' }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    onChange={handlePassword}
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter your password"
                    style={{ color: 'black' }}
                  />
                </div>
                <button onClick={handleSubmit} type="submit" className="btn btn-dark text-white w-100">
                  Register
                </button>
                <p className="text-center mt-3">
                  Already have an account?{" "}
                  <Link to="/" className="text-decoration-none text-danger">
                    Login
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

export default Register;
