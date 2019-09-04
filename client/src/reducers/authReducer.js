import { SIGN_IN, SIGN_OUT } from "../actions/types";

const INITIAL_STATE = {
  isSignedIn: null,
  userId: null,
  displayName: null,
  favoritedSongsIds: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, isSignedIn: true, ...action.payload };
    case SIGN_OUT:
      return { ...INITIAL_STATE, isSignedIn: false };
    default:
      return state;
  }
};
