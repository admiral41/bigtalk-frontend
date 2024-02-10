import React from "react";

const getInitials = (name) => {
  const words = name.split(" ");
  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  } else {
    return words.map((word) => word[0]).join("").toUpperCase();
  }
};

const formatTimestamp = (timestamp) => {
  const now = new Date();
  const activityDate = new Date(timestamp);
  const timeDifference = now - activityDate;

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) {
    return `${seconds} seconds ago`;
  } else if (minutes < 60) {
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  } else if (hours < 24) {
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  } else {
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  }
};

const Follows = ({ activities, loggedInUserId }) => (
  <div className="search-container text-light">
    <h3>Follow</h3>
    <ul className="search-result mt-3">
      {activities.map((activity) => (
        <li key={activity._id} className="search-result-item position-relative">
          <div className="search-result-img">
            {activity.targetUser && activity.targetUser.avatar && isValidURL(activity.targetUser.avatar.url) ? (
              <img
                src={activity.targetUser.avatar.url}
                alt="User Avatar"
                className="avatar-img"
              />
            ) : (
              <div className="avatar-placeholder">
                <p className="fw-bold">
                  {activity.targetUser ? getInitials(activity.targetUser.name) : ""}
                </p>
              </div>
            )}
          </div>
          <div className="search-result-details">
            <div className="user-info d-flex justify-content-between">
              <h5>{activity.targetUser ? activity.targetUser.name : ""}</h5>
              <p className="timestamp position-absolute top-0 end-0 p-2">{activity.createdAt ? formatTimestamp(activity.createdAt) : ""}</p>
            </div>
            <p>
              {activity.targetUser ? `${activity.targetUser.name} started following you.` : ""}{" "}
            </p>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default Follows;

function isValidURL(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}
