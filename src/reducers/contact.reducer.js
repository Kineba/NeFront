import { GET_CONTACTS } from "actions/contact.action";

const initialState = {};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CONTACTS:
      return action.payload;

    default:
      return state;
  }
}
