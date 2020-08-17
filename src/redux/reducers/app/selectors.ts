import { I_reducer } from "../index"

export const getGizmoLocation = (reducer: I_reducer) => reducer.AppReducer.gizmoLocation

export const get__contextMenuLocation = (reducer: I_reducer) => {
  if(reducer.AppReducer.contextMenu) return reducer.AppReducer.contextMenu.location
  else return null
}

export const getScale = (reducer: I_reducer) => reducer.AppReducer.scale
export const getZoom = (reducer: I_reducer) => reducer.AppReducer.zoom