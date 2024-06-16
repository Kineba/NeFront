import { GET_ALL_THESE } from "actions/allTheses.action";
const initialState = {};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_THESE:
      return action.payload;
    default:
      return state;
  }
}
