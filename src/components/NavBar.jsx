import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand text-danger fw-bold" to="/dashboard">
          BigTalk
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <form className="d-flex gap-2" role="search">
                {user ? (
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Welcome {user.name}
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <button
                          onClick={logout}
                          className="dropdown-item"
                          to="/logout"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                ) : null}
              </form>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
