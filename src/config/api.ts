export const apiPaths = {
  user: {
    checkEmail: "/api/user/check-email",
    checkNickname: "/api/user/check-nickname",
    join: "/api/user/join",
    login: "/api/user/login",
  },
  mypage: {
    info: "/api/mypage",
    delete: "/api/mypage/delete",
    edit: "/api/mypage/edit",
    scraplist: "/api/mypage/scraplist",
  },
  admin: {
    posts: "/api/admin/posts",
    post: (postId: string) => `/api/admin/posts/${postId}`,
    userPosts: (userId: string) => `/api/admin/posts/user/${userId}`,
    users: "/api/admin/users",
    user: (id: string) => `/api/admin/users/${id}`,
  },
  category: {
    create: "/api/admin/categories",
    update: (id: string) => `/api/admin/categories/${id}`,
    delete: (id: string) => `/api/admin/categories/${id}`,
    public: "/api/admin/categories/public",
    publicById: (id: string) => `/api/admin/categories/public/${id}`,
  },
  calendar: {
    base: "/api/calendar",
    byStudyRoom: (studyRoomId: string) => `/api/calendar/${studyRoomId}`,
    all: "/api/calendarAll",
    detail: (calendarDetailId: string) =>
      `/api/calendarDetail/${calendarDetailId}`,
  },
  post: {
    create: "/api/post",
    delete: (postId: string) => `/api/post/${postId}`,
    update: (postId: string) => `/api/post/${postId}`,
    createInCategory: (categoryId: string) =>
      `/api/post/category/direct/${categoryId}`,
    all: "/api/post/public",
    detail: (postId: string) => `/api/post/public/${postId}`,
    byCategory: (categoryId: string) =>
      `/api/post/public/category/${categoryId}`,
    searchInCategory: (categoryId: string) =>
      `/api/post/public/category/${categoryId}/search`,
    search: "/api/post/public/search",
    userPosts: "/api/post/user",
  },
  comment: {
    all: "/api/comment",
    delete: (commentId: string) => `/api/comment/${commentId}`,
    update: (commentId: string) => `/api/comment/${commentId}`,
    create: (postId: string) => `/api/comment/${postId}`,
    byPost: (postId: string) => `/api/comment/public/${postId}`,
    searchInPost: (postId: string) => `/api/comment/public/${postId}/search`,
    search: "/api/comment/search",
  },
  scrap: {
    post: (postId: string) => `/api/scrap/${postId}`,
    category: "/api/scrap/category",
    addCategory: (categoryId: string) => `/api/scrap/category/${categoryId}`,
    deleteCategory: (categoryId: string) => `/api/scrap/category/${categoryId}`,
  },
  studyrooms: {
    all: "/api/studyrooms",
    detail: (id: number) => `/api/studyrooms/${id}`,
    update: (id: number) => `/api/studyrooms/${id}`,
    delete: (id: number) => `/api/studyrooms/${id}`,
    create: "/api/studyrooms/add",
    byUser: (email: string) => `/api/studyrooms/user/${email}`,
  },
  userStudyrooms: {
    all: "/api/userstudyrooms",
    join: (id: string) => `/api/userstudyrooms/add/${id}`,
    leave: (id: string) => `/api/userstudyrooms/quit/${id}`,
  },
  chatroom: {
    detail: (chatRoomId: number) => `/api/chatroom/${chatRoomId}`,
    delete: (chatRoomId: number) => `/api/chatroom/${chatRoomId}`,
    create: "/api/chatroom/add",
    updateNotice: "/api/chatroom/notice",
    byStudyRoom: (studyRoomId: number) =>
      `/api/studyrooms/${studyRoomId}/chatroom`,
    getRecords: (chatRoomId: number) => `/api/chat/${chatRoomId}`,
  },
  question: {
    create: "/api/question",
    update: (questionId: string) => `/api/question/${questionId}`,
    all: "/api/question/public",
    detail: (questionId: string) => `/api/question/public/${questionId}`,
    delete: (questionId: string) => `/api/question/public/${questionId}`,
  },
  answer: {
    update: (answerId: string) => `/api/admin/answer/${answerId}`,
    delete: (answerId: string) => `/api/admin/answer/${answerId}`,
    create: (questionId: string) => `/api/admin/answer/${questionId}`,
    detail: (questionId: string) => `/api/answer/public/${questionId}`,
  },
};
