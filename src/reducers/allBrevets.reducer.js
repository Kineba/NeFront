import { GET_ALL_BREVET } from "actions/allBrevets.action";
const initialState = {};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_BREVET:
      return action.payload;
    default:
      return state;
  }
}
