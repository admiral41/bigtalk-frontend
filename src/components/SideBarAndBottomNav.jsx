import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ onNavClick }) => {
  const menuItems = [
    { icon: "bi bi-house-door", label: "Home", to: "/dashboard" },
    { icon: "bi bi-search", label: "Search", to: "/dashboard/search" }, // Updated route
    { icon: "bi bi-heart", label: "Activity", to: "/dashboard/activity" }, // Updated route
    { icon: "bi bi-person", label: "Profile", to: "/dashboard/profile" }, // Updated route
  ];

  const handleItemClick = (content) => {
    onNavClick(content);
  };

  return (
    <div className="side-container bg-dark">
      <div className="asides">
        {menuItems.map((item, index) => (
          <NavLink to={item.to} key={index} activeClassName="active-link">
            <div
              className="aside-link d-flex gap-2"
              onClick={() => handleItemClick(item.label.toLowerCase())}
            >
              <i className={item.icon}></i>
              <a>{item.label}</a>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
