import React, { useState, useEffect } from "react";
import Sidebar from "../../components/SideBarAndBottomNav";
import "./Dashboard.css";
import Home from "./Home.jsx"
import Navbar from "../../components/NavBar.jsx";
import Search from "./search/Search.jsx";
import Profile from "./profile/Profile.jsx";
import { Routes, Route, useNavigate } from 'react-router-dom';
import Activity from "./acitivity/Activity.jsx";

const Dashboard = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 900);
  const [activeNavItem, setActiveNavItem] = useState(""); // Added state for active navigation item
  const navigate = useNavigate();
  const handleNavClick = (item) => {
    setActiveNavItem(item);
  };
  console.log(localStorage.getItem("user"));  
  console.log(localStorage.getItem("token"));
  useEffect(() => {
   
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 900);
    };

    handleResize();

    let timeoutId;
    const debouncedHandleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 200);
    };

    window.addEventListener("resize", debouncedHandleResize);

    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
    
  }, [navigate]);

  return (
   <div className="dashboard">
      <Navbar />
      <Sidebar onNavClick={handleNavClick} activeNavItem={activeNavItem} />
      <div className="main-container bg-dark ">
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/activity/*" element={<Activity/>} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
