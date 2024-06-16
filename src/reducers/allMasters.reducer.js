import { GET_ALL_MASTER } from "actions/allMasters.action";
const initialState = {};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_MASTER:
      return action.payload;
    default:
      return state;
  }
}
