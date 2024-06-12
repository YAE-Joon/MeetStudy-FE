import { UserCalendar } from "@/types/Calendar";

export interface UserProfile {
  email?: string;
  username: string;
  nickname: string;
  password: string;
  interests: string[];
}

export type MyaccountProps = {
  UserProfile: UserProfile;
};

export interface UserData {
  userProfile: UserProfile | null;
  userCalendars: UserCalendar[];
  userScrappedPosts: null;
  userPosts: null;
}
