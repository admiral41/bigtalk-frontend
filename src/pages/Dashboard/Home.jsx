import React, { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { createPostApi, getPostOfFollowingUsersApi, likeAndUnlikePostApi } from "../../apis/Api";

const Home = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [posts, setPosts] = useState([]);
  const fileInputRef = useRef(null);

  useEffect(() => {
    // Fetch posts from following users and own posts when the component mounts
    getPostOfFollowingUsersApi()
      .then((res) => {
        if (res.data.success) {
          setPosts(res.data.posts);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error fetching posts");
      });
  }, []);

  const handleImage = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      setImage(selectedImage);
      setPreviewImage(URL.createObjectURL(selectedImage));
    }
  };

  const handleFileButtonClick = () => {
    fileInputRef.current.click();
  };

  const handlePost = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("image", image);
    formData.append("user", user._id);

    createPostApi(formData)
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          setCaption("");
          setImage(null);
          setPreviewImage(null);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Internal server error");
      });
  };
  const handleLike = (postId) => {
    likeAndUnlikePostApi(postId)
      .then((res) => {
        if (res.data.success) {
          // Refresh the posts after liking or unliking
          getPostOfFollowingUsersApi()
            .then((res) => {
              if (res.data.success) {
                setPosts(res.data.posts);
              } else {
                toast.error(res.data.message);
              }
            })
            .catch((err) => {
              console.log(err);
              toast.error("Error fetching posts");
            });
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error liking/unliking post");
      });
  };

  const getInitials = (name) => {
    if (!name) return "";
    const names = name.split(" ");
    return names
      .map((n) => (n ? n.charAt(0) : ""))
      .join("")
      .toUpperCase();
  };

  return (
    <div className="dashboard-home text-white">
      <div className="container add-post">
        <div className="user-input d-flex align-items-center gap-2">
          {user.avatar && isValidURL(user.avatar) ? (
            <img src={user.avatar} alt="User Avatar" className="avatar-img" />
          ) : (
            <div className="avatar-placeholder">
              <p className="fw-bold">{getInitials(user.name)}</p>
            </div>
          )}
          <p className="fw-bold">{user.name}</p>
        </div>
        <textarea
          onChange={(e) => setCaption(e.target.value)}
          value={caption}
          className="form-control mt-3"
          rows="3"
          placeholder="What's on your mind?"
        ></textarea>
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleImage}
          style={{ display: "none" }}
        />
        {/* Preview Image */}
        {previewImage && (
          <img src={previewImage} alt="Preview" className="mt-2 post-image" />
        )}
        <div className="d-flex justify-content-between mt-3">
          <button className="btn btn-secondary" onClick={handleFileButtonClick}>
            <i className="bi bi-paperclip"></i> Attach Image
          </button>
          <button className="btn btn-primary" onClick={handlePost}>
            Post
          </button>
        </div>
        <hr />
        <div className="posts">
          {posts.length === 0 ? (
            <p>No posts to show. Please follow someone.</p>
          ) : (
            posts.map((post) => (
              <div key={post._id} className="post-container">
                <div className="d-flex justify-content-between">
                  <div className="user-input d-flex align-items-start gap-2">
                    {post.owner.avatar && isValidURL(post.owner.avatar) ? (
                      <img
                        src={post.owner.avatar}
                        alt="User Avatar"
                        className="avatar-img"
                      />
                    ) : (
                      <div className="avatar-placeholder">
                        <p className="fw-bold">
                          {getInitials(post.owner.name)}
                        </p>
                      </div>
                    )}
                    <p className="fw-bold">{post.owner.name}</p>
                  </div>
                  <p>{formatTimestamp(post.createdAt)}</p>
                </div>
                <p>{post.caption}</p>
                {post.image && isValidURL(post.image) && (
                  <img src={post.image} alt="Post" className="post-image" />
                )}
                {/* Display other information, such as likes */}
                <div className="post-actions pt-2">   
                  <button
                    className="like-button bg-transparent border-0"
                    onClick={() => handleLike(post._id)}
                  >
                    <i className="bi bi-heart"></i> 
                  </button>
                  {post.likes.length} Likes
                  {/* Add more actions as needed */}
                </div>
                <hr />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;

function isValidURL(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}
function formatTimestamp(timestamp) {
  const now = new Date();
  const postDate = new Date(timestamp);
  const timeDifference = now - postDate;

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
}
