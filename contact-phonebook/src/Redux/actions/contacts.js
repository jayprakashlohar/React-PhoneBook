import {
  ADD_CONTACT_REQUEST,
  ADD_CONTACT_SUCCESS,
  ADD_CONTACT_FAILURE,
  FETCH_CONTACTS_REQUEST,
  FETCH_CONTACTS_SUCCESS,
  FETCH_CONTACTS_FAILURE,
  DELETE_CONTACT_REQUEST,
  DELETE_CONTACT_SUCCESS,
  DELETE_CONTACT_FAILURE,
  UPDATE_CONTACT_REQUEST,
  UPDATE_CONTACT_SUCCESS,
  UPDATE_CONTACT_FAILURE,
  ADD_TO_BOOKMARK,
  REMOVE_FROM_BOOKMARK,
  FETCH_FROM_BOOKMARK,
} from "./types";
import axios from "axios";

export const addContact = (data) => async (dispatch) => {
  try {
    dispatch({ type: ADD_CONTACT_REQUEST });
    let responce = await axios.post(
      "https://phonebook-json-production.up.railway.app/contacts",
      data
    );
    dispatch({ type: ADD_CONTACT_SUCCESS, payload: responce.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: ADD_CONTACT_FAILURE });
  }
};

export const fetchContacts = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_CONTACTS_REQUEST });
    let responce = await axios.get(
      "https://phonebook-json-production.up.railway.app/contacts"
    );
    dispatch({ type: FETCH_CONTACTS_SUCCESS, payload: responce.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: FETCH_CONTACTS_FAILURE });
  }
};

export const deleteContact = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_CONTACT_REQUEST });
    await axios.delete(
      `https://phonebook-json-production.up.railway.app/contacts/${id}`
    );
    dispatch({ type: DELETE_CONTACT_SUCCESS, payload: id });
  } catch (error) {
    console.log(error);
    dispatch({ type: DELETE_CONTACT_FAILURE });
  }
};

export const editContact = (id, data) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_CONTACT_REQUEST });
    await axios.patch(
      `https://phonebook-json-production.up.railway.app/contacts/${id}`,
      data
    );
    dispatch({ type: UPDATE_CONTACT_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: UPDATE_CONTACT_FAILURE });
  }
};

export const addToBookmark = (data) => async (dispatch) => {
  try {
    let responce = await axios.post(
      "https://phonebook-json-production.up.railway.app/bookmarks",
      data
    );
    dispatch({ type: ADD_TO_BOOKMARK, payload: responce.data });
  } catch (error) {
    console.log(error);
  }
};

export const fetchBookmarkData = () => async (dispatch) => {
  try {
    let responce = await axios.get(
      "https://phonebook-json-production.up.railway.app/bookmarks"
    );
    dispatch({ type: FETCH_FROM_BOOKMARK, payload: responce.data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteBookmark = (id) => async (dispatch) => {
  try {
    await axios.delete(
      `https://phonebook-json-production.up.railway.app/bookmarks/${id}`
    );
    dispatch({ type: REMOVE_FROM_BOOKMARK, payload: id });
  } catch (error) {
    console.log(error);
  }
};
