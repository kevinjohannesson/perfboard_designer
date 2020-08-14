import initialState from './initialState'
import { SET_TOOL } from './actionTypes';

export default function(state = initialState, action: any) {
  switch (action.type) {
    case SET_TOOL: {
      return { ...state, tool: action.tool}
    }
    default:
      return state;
  }
}