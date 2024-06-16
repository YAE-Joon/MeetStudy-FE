"use client";
import Cookies from "js-cookie";

export const fetchUserInfo = async () => {
  const token = Cookies.get("accessToken");

  if (!token) {
    console.error("No token found");
    return null;
  }

  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
    const response = await fetch(`${baseUrl}/api/mypage`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.error("Failed to fetch user info");
      return null;
    }

    const data = await response.json();
    //console.log(data);
    return data.nickname;
  } catch (error) {
    console.error("Error fetching user info:", error);
    return null;
  }
};
