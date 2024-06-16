import { GET_ALL_HABILITATION } from "actions/allHabilitations.action";
const initialState = {};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_HABILITATION:
      return action.payload;
    default:
      return state;
  }
}
