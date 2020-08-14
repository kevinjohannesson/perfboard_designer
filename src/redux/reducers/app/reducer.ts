import initialState from './initialState'
import { SET_GIZMO_LOCATION } from './actionTypes';

export default function(state = initialState, action: any) {
  switch (action.type) {
    case SET_GIZMO_LOCATION: {
      return { ...state, gizmoLocation: action.location}
    }
    default:
      return state;
  }
}
