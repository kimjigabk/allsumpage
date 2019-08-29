import {
  CREATE_SONG,
  DELETE_SONG,
  FETCH_SONG,
  FETCH_SONGS,
  EDIT_SONG
  } from "../actions/types";
  
  import _ from "lodash";
  
  export default (state = {}, action) => {
    switch (action.type) {
      case FETCH_SONGS:
        return { ...state, ..._.mapKeys(action.payload, "id") };
      case FETCH_SONG:
        return { ...state, [action.payload.id]: action.payload };
      case CREATE_SONG:
        return { ...state, [action.payload.id]: action.payload };
      case EDIT_SONG:
        //   const newState = { ...state };
        //   newState[action.payload.id] = action.payload;
        //   return newState;
        // identical to below. [] <- key interpolation, access to object
        return { ...state, [action.payload.id]: action.payload };
      case DELETE_SONG:
        return _.omit(state, action.payload);
  
      default:
        return state;
    }
  };
  