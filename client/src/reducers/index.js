import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import songsReducer from "./songsReducer";
import videoReducer from "./videoReducer";

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  songs: songsReducer,
  video: videoReducer
});
