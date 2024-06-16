import { GET_ALL_OUVRAGE } from "actions/allOuvrages.action";
const initialState = {};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_OUVRAGE:
      return action.payload;
    default:
      return state;
  }
}
