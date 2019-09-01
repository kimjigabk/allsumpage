import { SHOW_VIDEO, CLOSE_VIDEO } from "../actions/types";

const INITIAL_STATE = {
  isShow: false,
  songId: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SHOW_VIDEO:
      return { ...state, isShow: true, songId: action.payload };
    case CLOSE_VIDEO:
      return { ...state, isShow: false, songId: null };
    default:
      return state;
  }
};
