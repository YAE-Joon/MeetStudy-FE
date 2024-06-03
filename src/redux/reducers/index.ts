import { combineReducers } from "redux";
import certificateReducer from "./certificateReducer";
import postReducer from "./postReducer";

const rootReducer = combineReducers({
  certificates: certificateReducer,
  posts: postReducer,
});

export default rootReducer;
