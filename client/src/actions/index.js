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
import axios from "axios";
import history from "../history";

export const createSong = formValues => async (dispatch, getState) => {
  const authorId = getState().auth.userId;
  const response = await axios.post("/api/songs", { ...formValues, authorId });
  dispatch({
    type: CREATE_SONG,
    payload: response.data
  });
  history.push("/songs");
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
export const editSong = (id, formValues) => async (dispatch, getState) => {
  const authorId = getState().auth.userId;
  const response = await axios.patch(`/api/songs/${id}`, {
    ...formValues,
    authorId
  });
  dispatch({
    type: EDIT_SONG,
    payload: response.data
  });
  history.push("/songs");
};
export const deleteSong = id => async (dispatch, getState) => {
  const authorId = getState().auth.userId;
  await axios.delete(`/api/songs/${id}`, { data: { authorId } });
  dispatch({
    type: DELETE_SONG,
    payload: id
  });
  history.push("/songs");
};

export const signIn = userId => async dispatch => {
  await axios.post("/api/user/", { userId });
  dispatch({
    type: SIGN_IN,
    payload: userId
  });
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
