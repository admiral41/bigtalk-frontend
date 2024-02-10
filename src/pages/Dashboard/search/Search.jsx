import React, { useState, useEffect } from "react";
import "./Search.css";
import { searchUserApi, followUserApi } from "../../../apis/Api";
import { toast } from "react-toastify";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchMessage, setSearchMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getInitials = (name) => {
    const words = name.split(" ");
    if (words.length === 1) {
      return words[0].slice(0, 2).toUpperCase();
    } else {
      return words.map((word) => word[0]).join("").toUpperCase();
    }
  };

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const response = await searchUserApi({ name: searchTerm });
      const users = response.data.users;
  
      // Get the ID of the logged-in user from localStorage
      const loggedInUserId = JSON.parse(localStorage.getItem("user"))._id;
  
      // Set the isFollowing property based on the user's follow status
      const updatedUsers = users.map((user) => ({
        ...user,
        isFollowing: user._id !== loggedInUserId && loggedInUserId && user.followers.includes(loggedInUserId),
      }));
  
      setSearchResults(updatedUsers || []);
      setSearchMessage(updatedUsers && updatedUsers.length === 0 ? "User not found" : "");
    } catch (error) {
      console.error("Error searching users:", error.message);
      if (error.response) {
        console.error("API Response Status:", error.response.status);
        console.error("API Response Data:", error.response.data);
      }
      setSearchMessage("Error searching users. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleFollow = async (userId, isFollowing) => {
    try {
      // Send a follow/unfollow request to the server
      await followUserApi(userId);
  
      // Update the local state to reflect the change
      setSearchResults((prevResults) =>
        prevResults.map((user) =>
          user._id === userId ? { ...user, isFollowing: !isFollowing } : user
        )
      );
  
      // Update the user data in localStorage
      const updatedUser = JSON.parse(localStorage.getItem("user"));
      updatedUser.following = isFollowing ? updatedUser.following.filter(id => id !== userId) : [...updatedUser.following, userId];
      localStorage.setItem("user", JSON.stringify(updatedUser));
     
      toast.success(isFollowing ? "Unfollowed successfully" : "Followed successfully");
    } catch (error) {
      console.error("Error following/unfollowing user:", error.message);
      // Handle error if needed
    }
  };
  

  useEffect(() => {
    const performSearch = async () => {
      if (searchTerm.trim() === "") {
        setSearchMessage("Enter a name to find users");
        setSearchResults([]);
      } else {
        await handleSearch();
      }
    };

    performSearch();
  }, [searchTerm]);

  // Get the ID of the logged-in user from localStorage
  const loggedInUserId = JSON.parse(localStorage.getItem("user"))._id;

  return (
    <div className="search-container text-light">
      <h3>Search</h3>
      <div className="search-input">
        <div className="input-group mt-3">
          <span className="input-group-text" id="basic-addon1">
            <i className="bi bi-search"></i>
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="basic-addon1"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="search-result mt-3">
        {searchResults.length === 0 && searchMessage && (
          <div className="text-center text-danger">{searchMessage}</div>
        )}
        {searchResults.map((user) => (
          <div key={user._id} className="search-result-item">
            <div className="search-result-img">
              {user.avatar && isValidURL(user.avatar.url) ? (
                <img
                  src={user.avatar.url}
                  alt="User Avatar"
                  className="avatar-img"
                />
              ) : (
                <div className="avatar-placeholder">
                  <p className="fw-bold">{getInitials(user.name)}</p>
                </div>
              )}
            </div>
            <div className="search-result-details">
              <h5>{user.name}</h5>
              <p>{user.username}</p>
            </div>
            <div className="follow-button">
              {user._id === loggedInUserId ? (
                <button className="follows btn px-4">
                  View Profile
                </button>
              ) : (
                <button
                  className={`follows btn px-4 ${user.isFollowing ? "unfollow" : "follow"}`}
                  onClick={() => handleFollow(user._id, user.isFollowing)}
                >
                  {user.isFollowing ? "Unfollow" : "Follow"}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;



function isValidURL(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}
