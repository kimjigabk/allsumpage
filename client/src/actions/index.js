import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_SONG,
  DELETE_SONG,
  FETCH_SONG,
  FETCH_SONGS,
  EDIT_SONG
} from "./types";
import songs from "../apis/songs";
import history from "../history";
// A common pattern that I have seen is to use a try / catch block in each action creator and then dispatch an error action, with the message as a payload or even some generic custom message

//create asyncronous action creator.
export const createSong = formValues => async (dispatch, getState) => {
  // create History object on a separate file instead of "BrowserRouter's one"
  // so we can access to the
  // to acheive, make another router instead of BrowserRouter.
  const { userId } = getState().auth;
  const response = await songs.post("/songs", { ...formValues, userId });
  dispatch({
    type: CREATE_SONG,
    payload: response.data
  });
  history.push("/"); // this makes user redirect to '/' after action is called.
};
export const fetchSongs = () => async dispatch => {
  const response = await songs.get("/songs");
  dispatch({
    type: FETCH_SONGS,
    payload: response.data
  });
};
export const fetchSong = id => async dispatch => {
  const response = await songs.get(`/songs/${id}`);
  dispatch({
    type: FETCH_SONG,
    payload: response.data
  });
};
export const editSong = (id, formValues) => async dispatch => {
  const response = await songs.patch(`/songs/${id}`, formValues);
  dispatch({
    type: EDIT_SONG,
    payload: response.data
  });
  history.push("/");
};
export const deleteSong = (id, formValues) => async dispatch => {
  // const response = await songs.delete(`/songs/${id}`, formValues);
  await songs.delete(`/songs/${id}`, formValues);
  dispatch({
    type: DELETE_SONG,
    payload: id
  });
  history.push("/");
};

export const signIn = userId => {
  return {
    type: SIGN_IN,
    payload: userId
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT
  };
};
