import { I_reducer } from "../index"

export const getGizmoLocation = (reducer: I_reducer) => reducer.AppReducer.gizmoLocation

export const getScale = (reducer: I_reducer) => reducer.AppReducer.scale
export const getZoom = (reducer: I_reducer) => reducer.AppReducer.zoom