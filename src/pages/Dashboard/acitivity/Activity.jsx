import React, { useEffect, useState } from "react";
import { Routes, Route, useParams, useNavigate } from 'react-router-dom';
import All from "./pages/All";
import Replies from "./pages/Replies";
import Likes from "./pages/Likes";
import Follows from "./pages/Follows";
import { getActivitiesApi } from "../../../apis/Api";

const Activity = () => {
  const navigate = useNavigate();
  const { tab = 'all' } = useParams();
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    // Fetch activities when the component mounts
    const fetchActivities = async () => {
      try {
        const response = await getActivitiesApi();
        setActivities(response.data.activities);
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };

    fetchActivities();
  }, []);

  const handleTabClick = (tabName) => {
    const newTabPath = tabName === 'all' ? '/dashboard/activity' : `/dashboard/activity/${tabName}`;
    navigate(newTabPath);
  };
  return (
    <div className="activity-container text-light">
        <h3>Activity</h3>
      <div className="activity-tabs pt-2">
        <button
          className={`btnss me-2 tab ${tab === 'all' ? 'active' : ''}` } 
          onClick={() => handleTabClick('all')}
          style={{ width: "16%" }}
        >
          All
        </button>
        <button
          className={`btnss me-2 tab ${tab === 'follows' ? 'active' : ''}`}
          onClick={() => handleTabClick('follows')}
          style={{ width: "16%" }}
        >
          Follows
        </button>
        <button
          className={`btnss me-2 tab ${tab === 'replies' ? 'active' : ''}`}
          onClick={() => handleTabClick('replies')}
          style={{ width: "16%" }}
        >
          Replies
        </button>
        <button
          className={`btnss  tab ${tab === 'likes' ? 'active' : ''}`}
          onClick={() => handleTabClick('likes')}
          style={{ width: "16%" }}
        >
          Likes
        </button>
      </div>
      <div className="activity-content">
      <Routes>
          <Route path="/" element={<All activities={activities} />} />
          <Route path="follows" element={<Follows activities={activities} />} />
          <Route path="replies" element={<Replies activities={activities} />} />
          <Route path="likes" element={<Likes activities={activities} />} />
        </Routes>
      </div>
    </div>
  );
};

export default Activity;
