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
  REMOVE_FROM_BOOKMARK,
  FETCH_FROM_BOOKMARK,
  ADD_TO_BOOKMARK,
} from "../actions/types";

const initialState = {
  contacts: [],
  isLoading: false,
  isError: null,
  bookmarks: [],
};

export const contactsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CONTACT_REQUEST:
    case FETCH_CONTACTS_REQUEST:
    case DELETE_CONTACT_REQUEST:
    case UPDATE_CONTACT_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: null,
      };

    case ADD_CONTACT_SUCCESS:
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
        isLoading: false,
        isError: null,
      };

    case ADD_CONTACT_FAILURE:
    case FETCH_CONTACTS_FAILURE:
    case DELETE_CONTACT_FAILURE:
    case UPDATE_CONTACT_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    case FETCH_CONTACTS_SUCCESS:
      return {
        ...state,
        contacts: action.payload,
      };
    case DELETE_CONTACT_SUCCESS:
      return {
        ...state,
        contacts: state.contacts.filter(
          (contact) => contact.id !== action.payload
        ),
        isLoading: false,
        isError: null,
      };

    case UPDATE_CONTACT_SUCCESS:
      return {
        ...state,
        contacts: state.contacts.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    case ADD_TO_BOOKMARK:
      return {
        ...state,
        bookmarks: [...state.bookmarks, action.payload],
      };

    case FETCH_FROM_BOOKMARK:
      return {
        ...state,
        bookmarks: action.payload,
      };
    case REMOVE_FROM_BOOKMARK:
      return {
        ...state,
        bookmarks: state.bookmarks.filter(
          (contact) => contact.id !== action.payload
        ),
        isLoading: false,
        isError: null,
      };

    default:
      return state;
  }
};
