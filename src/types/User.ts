import { UserCalendar } from "@/types/Calendar";
import { Category } from "@/types/Category";

// export interface UserProfile {
//   email?: string;
//   username: string;
//   nickname: string;
//   password: string;
//   interests: string[];
// }

export type MyaccountProps = {
  UserProfile: UserProfile;
};

export interface UserData {
  userProfile: UserProfile | null;
  userCalendars: UserCalendar[];
  userScrappedPosts: null;
  userPosts: null;
}

export interface UserProfile {
  email?: string;
  username: string;
  nickname: string;
  password: string;
  interests: Category[];
}
