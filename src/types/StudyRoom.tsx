// 향후 extens해서 사용할 것
export interface BasicUser {
  email: string;
  password: string;
}

export interface UserStudyRoom {
  id: number;
  joinDate: string;
  permission: string;
  studyRoomId: number;
  user: BasicUser;
}

export interface StudyRoomMember {
  id: number;
  joinDate: string;
  permission: string;
  email: string;
}

export interface StudyRoom {
  id: number;
  title: string;
  description: string;
  createdDate: string;
  maxCapacity: number;
  userStudyRooms: UserStudyRoom[];
}
