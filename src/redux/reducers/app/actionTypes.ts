import { I_Vector } from "../../../components/Container"

export const SET_GIZMO_LOCATION = 'SET_GIZMO_LOCATION'

export const SET_CONTEXT_MENU_LOCATION = 'SET_CONTEXT_MENU_LOCATION'


interface set__gizmoLocation {
  type: typeof SET_GIZMO_LOCATION
  location: I_Vector
}

interface set__contextMenuLocation {
  type: typeof SET_CONTEXT_MENU_LOCATION
  location: I_Vector
}


export type appActionTypes = set__gizmoLocation | set__contextMenuLocation