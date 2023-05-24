/* eslint-disable import/no-anonymous-default-export */
import { SIGN_IN, SIGN_OUT, ADD_FAVORITES } from '../actions/types';

const INITIAL_STATE = {
  isSignedIn: null,
  userId: null,
  displayName: null,
  favoritedSongsIds: null,
  isAdmin: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, isSignedIn: true, ...action.payload };
    case SIGN_OUT:
      return { ...INITIAL_STATE, isSignedIn: false };
    case ADD_FAVORITES:
      const arr = state.favoritedSongsIds;
      // console.log("전");
      // console.log(arr);
      if (arr.includes(action.payload)) {
        // console.log("이미 있군..");
      } else {
        arr.push(action.payload);
        // console.log("후");
        // console.log(state.favoritedSongsIds);
      }
      return { ...state, favoritedSongsIds: arr };
    default:
      return state;
  }
};
