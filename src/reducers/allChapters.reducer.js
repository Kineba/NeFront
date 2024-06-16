import { GET_ALL_CHAPTER } from "actions/allChapters.action";
const initialState = {};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_CHAPTER:
      return action.payload;
    default:
      return state;
  }
}
