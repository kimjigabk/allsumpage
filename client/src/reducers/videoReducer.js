import { SHOW_VIDEO, CLOSE_VIDEO } from "../actions/types";

const INITIAL_STATE = {
  isShow: false,
  youtubeUrl: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SHOW_VIDEO:
      return { ...state, isShow: true, youtubeUrl: action.payload };
    case CLOSE_VIDEO:
      return { ...state, isShow: false, youtubeUrl: null };
    default:
      return state;
  }
};
