import { GET_MASTER } from "actions/masters.action";
const initialState = {};

export default function userReducer(state = initialState, action){
  switch(action.type){
    case GET_MASTER:
      return action.payload
    default:
      return state;
  }
}