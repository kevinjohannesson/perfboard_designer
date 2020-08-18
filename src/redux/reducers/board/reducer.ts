import initialState, { I_state } from './initialState'
import { SET_TOOL, SET_CURRENT_PTNUM, CREATE_PADS, ADD_CONNECTION, CREATE_HEADER, CREATE_POINTS, SETUP_BOARD, SET_WIRE_COLOR, SET_VIEW } from './actionTypes';

export default function(state = initialState, action: any): I_state {
  switch (action.type) {
    case SET_VIEW: {
      return {...state, view: action.view}
    }
    case SETUP_BOARD: {
      return {...state, board: action.board}
    }
    case SET_TOOL: {
      return { ...state, tool: action.tool}
    }
    case SET_CURRENT_PTNUM: {
      return { ...state, current_ptnum: action.ptnum}
    }
    case CREATE_PADS: {
      return { ...state, pads: action.pads}
    }
    

    case SET_WIRE_COLOR: {
      return { ...state, wireColor: action.color }
    }
    
    case ADD_CONNECTION: {
      const connections = [...state.connections]
      const new_connection = (ptnum: number, connectedPoint: number | null ) => ({ptnum, connectedPoints: connectedPoint !== null ? [connectedPoint] : [], color: state.wireColor, placement: state.view })
      
      const connectionPoint_A_index = state.connections.findIndex(connection => connection.ptnum === state.current_ptnum)
      if(state.current_ptnum && connectionPoint_A_index >= 0) {
        console.log('connectionPoint_A does exist.')
        connections[connectionPoint_A_index] = {
          ...connections[connectionPoint_A_index], 
          connectedPoints: [
            ...connections[connectionPoint_A_index].connectedPoints,
            action.ptnum
          ]
        }
      } 
      else {
        console.log('connectionPoint_A does NOT exist.')
      }
      const connectionPoint_B_index = state.connections.findIndex(connection => connection.ptnum === action.ptnum)
      if(connectionPoint_B_index >= 0) {
        console.log('connectionPoint_B does exist.')
        const connectedPoints = [...connections[connectionPoint_B_index].connectedPoints]
        if( state.current_ptnum !== null) connectedPoints.push(state.current_ptnum)
        connections[connectionPoint_B_index] = {
          ...connections[connectionPoint_B_index], 
          connectedPoints
        }
        if(connections[connectionPoint_B_index].color !== state.wireColor){
          console.log('wireColor does NOT match')
          const linkedConnectionPoint = connections[connectionPoint_B_index]
          // console.log(linkedConnectionPoint)
          const changeColor = (ptnum: number) => {connections[connections.findIndex(connection => connection.ptnum === ptnum) ].color = state.wireColor}
         
          const points: number[] = []
          const mapper = (connectedPoints: number[]) => {
            connectedPoints.map(ptnum => {
              const connection = connections[connections.findIndex(connection => connection.ptnum === ptnum)]
              if(connection.connectedPoints.length && !(points.some( pt => pt === ptnum))) {
                changeColor(connection.ptnum)
                points.push(connection.ptnum)
                mapper(connection.connectedPoints)
              }
            })
          }
          mapper(linkedConnectionPoint.connectedPoints)
        }
        else console.log('wireColor does match')
      }
      else {
        console.log('connectionPoint_B does NOT exist.')
        connections.push( new_connection(action.ptnum, state.current_ptnum) )
      }
      
      console.log(connections)
      
      return { 
        ...state, 
        connections, 
        current_ptnum: action.ptnum
      }
    }
    case CREATE_HEADER: {
      const pads = [...state.pads]
      pads[action.ptnum].header = true
      return { ...state, pads }
    }
    default:
      return state;
  }
}