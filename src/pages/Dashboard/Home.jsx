import React, { useState, useRef } from "react";
import { toast } from "react-toastify";
import { createPostApi } from "../../apis/Api";

const Home = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

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
        console.error(err);
        toast.error("Internal server error");
      });
  };

  const getInitials = (name) => {
    if (!name) return "";
    const names = name.split(" ");
    return names.map((n) => (n ? n.charAt(0) : "")).join("").toUpperCase();
  };

  return (
    <div className="dashboard-home text-white">
      <div className="container add-post">
        <div className="user-input d-flex align-items-center gap-2">
          {user.avatar && isValidURL(user.avatar) ? (
            <img
              src={user.avatar}
              alt="User Avatar"
              className="avatar-img"
            />
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
          <img
            src={previewImage}
            alt="Preview"
            className="mt-2 post-image"
          />
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
          <div className="d-flex justify-content-between">
            <div className="user-input d-flex align-items-start gap-2">
              <img
                src="/assets/icons/p.png"
                alt="Logo"
                className="avatar-img"
              />
              <p className="fw-bold">Test User</p>
            </div>
            <p>1m ago</p>
          </div>
          {/* Additional post content here */}
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
