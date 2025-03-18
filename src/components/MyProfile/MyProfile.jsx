import React from "react";
import "./MyProfile.css";
import Burger from "../Burger/Burger";
import LogoutButton from "../LogoutButton/LogoutButton";
import { useQuery } from "@tanstack/react-query";

export default function MyProfile() {
  const token = localStorage.getItem('token');

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
  console.log(user);
  

  return (
    <div className="MyProfile screen xs:p-4 md:p-6 lg:p-7">
      <Burger />
      <h1 className="dynamicGreeting text-base font-medium xs:text-xl lg:text-2xl">User profile</h1>
      <LogoutButton />
    </div>
  );
}
