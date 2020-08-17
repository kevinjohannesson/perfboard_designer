import { I_reducer } from '../index'

export const get__tool = ( reducer: I_reducer ) => reducer.BoardReducer.tool
export const get__current_ptnum = ( reducer: I_reducer ) => reducer.BoardReducer.current_ptnum
export const get__pads = ( reducer: I_reducer ) => reducer.BoardReducer.pads
export const get__points = ( reducer: I_reducer ) => reducer.BoardReducer.grid?.points
export const get__width = ( reducer: I_reducer ) => reducer.BoardReducer.width
export const get__height = ( reducer: I_reducer ) => reducer.BoardReducer.height

export const get__rows = ( reducer: I_reducer ) => reducer.BoardReducer.rows
export const get__columns = ( reducer: I_reducer ) => reducer.BoardReducer.columns

export const get__pitch = ( reducer: I_reducer ) => reducer.BoardReducer.pitch

export const get__mountingHoles = ( reducer: I_reducer ) => reducer.BoardReducer.mountingHoles
export const get__grid = ( reducer: I_reducer ) => reducer.BoardReducer.grid

export const get__connections = ( reducer: I_reducer ) => reducer.BoardReducer.connections
export const get__headers = ( reducer: I_reducer ) => reducer.BoardReducer.headers

export const get__wireColor = ( reducer: I_reducer ) => reducer.BoardReducer.wireColor