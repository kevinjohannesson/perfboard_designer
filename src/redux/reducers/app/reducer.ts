import initialState, { I_state } from './initialState'
import { SET_GIZMO_LOCATION, SET_CONTEXT_MENU_LOCATION, appActionTypes } from './actionTypes';

export default function(state = initialState, action: appActionTypes): I_state {
  switch (action.type) {
    case SET_CONTEXT_MENU_LOCATION: {
      if(action.location === null) return { ...state, contextMenu: null }
      else return { ...state, contextMenu: {...state.contextMenu, location: action.location}}
    }
    case SET_GIZMO_LOCATION: {
      return { ...state, gizmoLocation: action.location}
    }
    default:
      return state;
  }
}
