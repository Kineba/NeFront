import { GET_CONVENTION } from "actions/convention.action";
const initialState = {};

export default function userReducer(state = initialState, action){
  switch(action.type){
    case GET_CONVENTION:
      return action.payload
    default:
      return state;
  }
}