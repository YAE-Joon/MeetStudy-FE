import { combineReducers } from "redux";
import categoryReducer from "./categoryReducer";
import certificationReducer from "./certificateReducer";

const rootReducer = combineReducers({
  categories: categoryReducer,
  certificates: certificationReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
