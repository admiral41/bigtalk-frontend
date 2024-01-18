import React, { useState, useEffect } from "react";
import "./Search.css";
import { searchUserApi } from "../../../apis/Api";

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

      setSearchResults(users || []);
      setSearchMessage(users && users.length === 0 ? "User not found" : "");
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
              <p>{user.email}</p>
            </div>
            <div className="follow-button">
              <button className="follows btn px-4">Follow</button>
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
