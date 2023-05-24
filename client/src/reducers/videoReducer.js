/* eslint-disable import/no-anonymous-default-export */
import { SHOW_VIDEO, CLOSE_VIDEO } from '../actions/types';

const INITIAL_STATE = {
  isShow: false,
  songId: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SHOW_VIDEO:
      return { ...state, isShow: true, songId: action.payload };
    case CLOSE_VIDEO:
      return { ...INITIAL_STATE };
    default:
      return state;
  }
};
