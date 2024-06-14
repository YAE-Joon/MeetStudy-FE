// 향후 extens해서 사용할 것
export interface BasicUser {
  email: string;
  password: string;
}

export interface UserStudyRoom {
  id: number;
  joinDate: string | null;
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

export interface Category {
  id?: number;
  name: string;
  description: string;
}

export interface StudyRoom {
  id?: number;
  title: string;
  description: string;
  createdDate: string;
  userCapacity: number | null;
  category: Category;
  userStudyRooms?: UserStudyRoom[];
  currMembers?: number;
}

export interface StudyRoomTableData {
  category: string;
  description: string;
  memberNum: number;
}

interface dummyStudyrooms {
  items: "object";
}
