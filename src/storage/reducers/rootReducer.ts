import { combineReducers } from "redux";
import authReducer from "../schemas/auth/reducer";


let rootReducer = combineReducers({
  auth: authReducer
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;