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

const Likes = ({ activities }) => {
  // Log the received activities for debugging
  console.log("Received activities:", activities);

  // Filter activities to include only those with actionType "liked"
  const likedActivities = activities.filter((activity) => activity.actionType === "liked");

  // Log the filtered likedActivities for debugging
  console.log("Filtered likedActivities:", likedActivities);

  return (
    <div>
      <h2>Likes</h2>
      <ul className="list-group mt-3">
        {likedActivities.map((activity) => (
          <li key={activity._id} className="list-group-item">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <div className="me-3">
                  {activity.user && activity.user.avatar && isValidURL(activity.user.avatar.url) ? (
                    <img
                      src={activity.user.avatar.url}
                      alt="User Avatar"
                      className="avatar-img"
                    />
                  ) : (
                    <div className="avatar-placeholder">
                      <p className="fw-bold">
                        {activity.user ? getInitials(activity.user.name) : ""}
                      </p>
                    </div>
                  )}
                </div>
                <div>
                  <h5 className="mb-0">{activity.user ? activity.user.name : ""}</h5>
                  <p className="mb-0">
                    {activity.actionType === "liked" && activity.user ? "liked your post." : ""}
                  </p>
                </div>
              </div>
              <p className="mb-0">{activity.createdAt ? formatTimestamp(activity.createdAt) : ""}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Likes;

function isValidURL(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};
