import React from "react";
import "../ProfileInfo/ProfileInfo.scss";

function ProfileInfo({ user, handleLogout }) {
  return (
    <main className="profile-info">
      <section className="profile-info__elem">
        <img src="" alt="user avatar"></img>
        <h1>Hi, {user.name}!</h1>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
        <p>id: {user.id}</p>
        <p>role: {user.role}</p>
        <button className="profile__logout" onClick={handleLogout}>
          Logout
        </button>
      </section>
    </main>
  );
}

export default ProfileInfo;
