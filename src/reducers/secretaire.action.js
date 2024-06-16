import { GET_SECRETAIRE } from "actions/secretaire.action";

const initialState = {};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SECRETAIRE:
      return action.payload;

    default:
      return state;
  }
}