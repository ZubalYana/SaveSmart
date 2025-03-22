import React, { useState, useEffect } from "react";
import { Avatar, Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Burger from "../Burger/Burger";
import LogoutButton from "../LogoutButton/LogoutButton";
import { Calendar, User } from "lucide-react";

export default function MyProfile() {
  const token = localStorage.getItem("token");

  const { data: user, isLoading, isError, error } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3000/api/auth/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch user data");
      return response.json();
    },
  });

  const [profilePic, setProfilePic] = useState("/userPicLayout.svg");

  useEffect(() => {
    if (user?.profilePicture) {
      setProfilePic(user.profilePicture);
    }
  }, [user]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      console.log("No file selected.");
      return;
    }
  
    const formData = new FormData();
    formData.append("profilePicture", file);
  
    console.log("Uploading file:", file);
    console.log("FormData:", formData.get("profilePicture")); 
  
    try {
      const response = await fetch("http://localhost:3000/api/auth/upload-profile", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
  
      console.log("Response status:", response.status);
      
      const text = await response.text(); 
      console.log("Server response:", text);
  
      try {
        const data = JSON.parse(text);
        if (response.ok) {
          setProfilePic(data.profilePicture);
        } else {
          console.error("Image upload failed:", data.message);
        }
      } catch (jsonError) {
        console.error("Server did not return valid JSON:", text);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  const formattedBirthday = user?.dateOfBirth
    ? new Date(user.dateOfBirth).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "N/A";

  return (
    <div className="MyProfile screen xs:p-4 md:p-6 lg:p-7 text-defaultText">
      <Burger />
      <h1 className="text-xl font-medium text-black">User Profile</h1>

      <Box display="flex" alignItems="center" mt={4} mb={5}>
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          id="profile-pic-upload"
          onChange={handleImageUpload}
        />

        <label htmlFor="profile-pic-upload">
          <Avatar
            src={profilePic}
            alt="Profile"
            sx={{
              width: 100,
              height: 100,
              cursor: "pointer",
              border: "3px solid #ddd",
              transition: "0.3s",
              "&:hover": { opacity: 0.7 },
            }}
          />
        </label>

        <Box ml={3}>
          <h2 className="text-2xl font-medium text-black">{user?.name || "No Name"}</h2>
          <p className="text-base text-gray-600">{user?.email || "No Email"}</p>
        </Box>
      </Box>

      <Box display="flex" justifyContent="space-between" width={410} mt={3} mb={4}>
        <Box display="flex" alignItems="center">
          <Calendar />
          <p className="text-base ml-2">
            Birthday: <span className="text-black">{formattedBirthday}</span>
          </p>
        </Box>
        <Box display="flex" alignItems="center">
          <User />
          <p className="text-base ml-2">
            Plan: <span className="text-black">{user?.purposeOfUsage || "No Plan"}</span>
          </p>
        </Box>
      </Box>

      <LogoutButton />
    </div>
  );
}
