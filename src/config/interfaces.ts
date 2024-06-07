import { APIRequestConfig } from "@/lib/types";

interface UserAPI {
  checkEmail: APIRequestConfig;
  checkNickname: APIRequestConfig;
  join: APIRequestConfig;
  login: APIRequestConfig;
}

interface MyPageAPI {
  getUserInfo: APIRequestConfig;
  deleteUser: APIRequestConfig;
  editUserInfo: APIRequestConfig;
  getScrapList: APIRequestConfig;
}

interface AdminAPI {
  getPosts: APIRequestConfig;
  getPostById: APIRequestConfig;
  deletePostById: APIRequestConfig;
  getUserPosts: APIRequestConfig;
  getUsers: APIRequestConfig;
  getUserById: APIRequestConfig;
  deleteUserById: APIRequestConfig;
}

interface CategoryAPI {
  createCategory: APIRequestConfig;
  editCategory: APIRequestConfig;
  deleteCategory: APIRequestConfig;
  getCategories: APIRequestConfig;
  getCategoryById: APIRequestConfig;
}

interface CalendarAPI {
  getCalendar: APIRequestConfig;
  addPersonalEvent: APIRequestConfig;
  deletePersonalEvent: APIRequestConfig;
  getStudyRoomCalendar: APIRequestConfig;
  addStudyRoomEvent: APIRequestConfig;
  deleteStudyRoomEvent: APIRequestConfig;
  getAllCalendars: APIRequestConfig;
  getCalendarDetail: APIRequestConfig;
  editCalendarDetail: APIRequestConfig;
  deleteCalendarDetail: APIRequestConfig;
}

interface PostAPI {
  createPost: APIRequestConfig;
  deletePost: APIRequestConfig;
  editPost: APIRequestConfig;
  createPostInCategory: APIRequestConfig;
  getAllPosts: APIRequestConfig;
  getPostById: APIRequestConfig;
  getPostsByCategory: APIRequestConfig;
  searchPostsInCategory: APIRequestConfig;
  searchAllPosts: APIRequestConfig;
  getUserPosts: APIRequestConfig;
}

interface CommentAPI {
  getAllComments: APIRequestConfig;
  deleteComment: APIRequestConfig;
  editComment: APIRequestConfig;
  createComment: APIRequestConfig;
  getPostComments: APIRequestConfig;
  searchPostComments: APIRequestConfig;
  searchAllComments: APIRequestConfig;
}

interface ScrapAPI {
  scrapPost: APIRequestConfig;
  unsrapPost: APIRequestConfig;
  getScrapCategories: APIRequestConfig;
  scrapCategory: APIRequestConfig;
  unscrapCategory: APIRequestConfig;
}

interface StudyRoomAPI {
  getAllStudyRooms: APIRequestConfig;
  getStudyRoomById: APIRequestConfig;
  updateStudyRoom: APIRequestConfig;
  deleteStudyRoom: APIRequestConfig;
  addStudyRoom: APIRequestConfig;
  getUserStudyRooms: APIRequestConfig;
}

interface UserStudyRoomAPI {
  getAllUserStudyroomPermissions: APIRequestConfig;
  joinStudyroom: APIRequestConfig;
  quitStudyroom: APIRequestConfig;
}

interface ChatRoomAPI {
  getChatRoomById: APIRequestConfig;
  deleteChatRoomById: APIRequestConfig;
  addChatRoom: APIRequestConfig;
  updateNotice: APIRequestConfig;
  getChatRoomsByStudyRoomId: APIRequestConfig;
}

interface QuestionAPI {
  addQuestion: APIRequestConfig;
  editQuestion: APIRequestConfig;
  getAllQuestions: APIRequestConfig;
  getQuestionById: APIRequestConfig;
  deleteQuestion: APIRequestConfig;
}

interface AnswerAPI {
  editAnswer: APIRequestConfig;
  deleteAnswer: APIRequestConfig;
  addAnswer: APIRequestConfig;
  getAnswerByQuestionId: APIRequestConfig;
}

export interface RouterConfig {
  user: UserAPI;
  mypage: MyPageAPI;
  admin: AdminAPI;
  category: CategoryAPI;
  calendar: CalendarAPI;
  post: PostAPI;
  comment: CommentAPI;
  scrap: ScrapAPI;
  studyroom: StudyRoomAPI;
  userStudyroom: UserStudyRoomAPI;
  chatroom: ChatRoomAPI;
  question: QuestionAPI;
  answer: AnswerAPI;
}
