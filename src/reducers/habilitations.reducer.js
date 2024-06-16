import { GET_HABILITATION } from "actions/habilitations.action";
const initialState = {};

export default function userReducer(state = initialState, action){
  switch(action.type){
    case GET_HABILITATION:
      return action.payload
    default:
      return state;
  }
}