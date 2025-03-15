import React from "react";
import "./MyProfile.css";
import Burger from "../Burger/Burger";
import LogoutButton from "../LogoutButton/LogoutButton";
export default function MyProfile() {
  return (
    <div className="MyProfile screen xs:p-4 md:p-6 lg:p-7">
      <Burger />
      <div className="mb-4">My Profile</div>
      <LogoutButton />
    </div>
  );
}
