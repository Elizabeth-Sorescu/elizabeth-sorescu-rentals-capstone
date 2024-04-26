import React from "react";

function ProfileInfo({
  onClose,
  showProfileInfo,
  setShowProfileInfo,
  user,
  handleLogout,
}) {
  return (
    <div className="profile-info">
      <h1>Hi, {user.name}!</h1>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>id: {user.id}</p>
      <p>role: {user.role}</p>
      <button className="profile__logout" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default ProfileInfo;
