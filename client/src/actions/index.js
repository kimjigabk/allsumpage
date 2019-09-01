import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_SONG,
  DELETE_SONG,
  FETCH_SONG,
  FETCH_SONGS,
  EDIT_SONG,
  SHOW_VIDEO,
  CLOSE_VIDEO
} from "./types";
// import axios from "../apis/songs";
import axios from 'axios'
import history from "../history";

export const createSong = formValues => async (dispatch, getState) => {
  const authorId = getState().auth.userId;
  const response = await axios.post("/api/songs", { ...formValues, authorId });
  dispatch({
    type: CREATE_SONG,
    payload: response.data
  });
  history.goBack();
};
export const fetchSongs = () => async dispatch => {
  const response = await axios.get("/api/songs");
  // console.log(response.data);
  dispatch({
    type: FETCH_SONGS,
    payload: response.data
  });
};
export const fetchSong = id => async dispatch => {
  const response = await axios.get(`/api/songs/${id}`);
  dispatch({
    type: FETCH_SONG,
    payload: response.data
  });
};
export const editSong = (id, formValues) => async dispatch => {
  const response = await axios.patch(`/api/songs/${id}`, formValues);
  dispatch({
    type: EDIT_SONG,
    payload: response.data
  });
  history.goBack();
};
export const deleteSong = (id, formValues) => async dispatch => {
  // const response = await songs.delete(`/songs/${id}`, formValues);
  await axios.delete(`/api/songs/${id}`, formValues);
  dispatch({
    type: DELETE_SONG,
    payload: id
  });
  history.goBack();
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

export const showVideo = songId => {
  return {
    type: SHOW_VIDEO,
    payload: songId
  };
};
export const closeVideo = () => {
  return {
    type: CLOSE_VIDEO
  };
};