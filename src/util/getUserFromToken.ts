import { jwtDecode } from "jwt-decode";
import { UserPayload } from "@/types/User";

export const getUserFromToken = (token: string): UserPayload | null => {
  try {
    return jwtDecode(token);
  } catch (error) {
    return null;
  }
};
