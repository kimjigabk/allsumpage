import {
  SIGN_IN,
  SIGN_OUT,
  ADD_FAVORITES,
  CREATE_SONG,
  DELETE_SONG,
  FETCH_SONG,
  FETCH_SONGS,
  EDIT_SONG,
  SHOW_VIDEO,
  CLOSE_VIDEO
} from "./types";

import axios from "axios";
import history from "../history";

//songs
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

//auth
export const signIn = (userId, name) => async dispatch => {
  const response = await axios.post("/api/user/", { userId, name });
  const { displayName, favoritedSongsIds } = response.data;
  dispatch({
    type: SIGN_IN,
    payload: { userId, displayName, favoritedSongsIds }
  });
};

export const signOut = () => {
  return {
    type: SIGN_OUT
  };
};

export const addToFavorites = (userId, songId) => async dispatch => {
  await axios.patch("/api/user", {
    userId,
    songId
  });
  // return value 의미 없음 user를 받는데 어차피 전 데이터라 상관 0
  dispatch({
    type: ADD_FAVORITES,
    payload: songId
  });
};

//video
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
