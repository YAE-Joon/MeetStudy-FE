export interface UserData {
  email?: string;
  username: string;
  nickname: string;
  password: string;
  interests: string[];
}

export type MyaccountProps = {
  userData: UserData;
};
