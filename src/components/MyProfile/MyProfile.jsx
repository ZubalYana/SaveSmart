import React from "react";
import "./MyProfile.css";
import Burger from "../Burger/Burger";
import LogoutButton from "../LogoutButton/LogoutButton";
import { useQuery } from "@tanstack/react-query";
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

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  const formattedBirthday = new Date(user.dateOfBirth).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  return (
    <div className="MyProfile screen xs:p-4 md:p-6 lg:p-7 text-defaultText">
      <Burger />
      <h1 className="dynamicGreeting text-base font-medium xs:text-xl lg:text-2xl text-black">
        User profile
      </h1>
      <div className="w-[500px] flex mt-5 mb-5">
        <img src="/userPicLayout.svg" alt="userPicLayout" />
        <div className="ml-4">
          <p className="text-2xl font-medium text-black">{user.name}</p>
          <p className="text-base font-light mt-1">{user.email}</p>
        </div>
      </div>
      <div className="w-[410px] flex justify-between mb-4">
      <div className="flex items-center">
        <Calendar />
        <p className="text-base font-medium ml-2 xs:text-sm lg:text-base">
          Birthday: <span className="text-black">{formattedBirthday}</span>
        </p>
      </div>
      <div className="flex items-center">
        <User />
        <p className="text-base font-medium ml-2 xs:text-sm lg:text-base">
          Plan: <span className="text-black">{user.purposeOfUsage}</span>
        </p>
      </div>
      </div>

      <LogoutButton />
    </div>
  );
}

