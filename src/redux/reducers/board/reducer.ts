import initialState, { I_state } from './initialState'
import { SET_TOOL, SET_CURRENT_PTNUM, CREATE_PADS, ADD_CONNECTION, CREATE_HEADER, CREATE_POINTS, SETUP_BOARD, SET_WIRE_COLOR } from './actionTypes';

export default function(state = initialState, action: any): I_state {
  switch (action.type) {
    case SETUP_BOARD: {
      return {
        ...state, 
        ...action.board,
        grid: action.grid,
        mountingHoles: action.mountingHoles
      }
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
      // console.log(action.ptnum)
      // console.log(state.connections)
      // console.log(state.connections.findIndex(connection => connection.ptnum === state.current_ptnum))
      const connections = [...state.connections]
      const new_connection = (ptnum: number, connectedPoint: number | null ) => ({ptnum, connectedPoints: connectedPoint !== null ? [connectedPoint] : [], color: state.wireColor })
      const connectionPoint_A_index = state.connections.findIndex(connection => connection.ptnum === state.current_ptnum)
      if(connectionPoint_A_index >= 0) {

        console.log('connectionPoint_A does exist.')
        connections[connectionPoint_A_index] = {
          ...connections[connectionPoint_A_index], 
          connectedPoints: [
            ...connections[connectionPoint_A_index].connectedPoints,
            action.ptnum
          ]
        }
      } 
      // else connections.push( new_connection(state.curren))
      else {
        console.log('connectionPoint_A does NOT exist.')
      }
      
      console.log(state.connections.findIndex(connection => connection.ptnum === action.ptnum))
      const connectionPoint_B_index = state.connections.findIndex(connection => connection.ptnum === action.ptnum)
      if(connectionPoint_B_index >= 0) {
        console.log('connectionPoint_B does exist.')
        connections[connectionPoint_B_index] = {
          ...connections[connectionPoint_B_index], 
          connectedPoints: [
            ...connections[connectionPoint_B_index].connectedPoints,
            action.ptnum
          ]
        }
      }
      // else connections.push( new_connection(action.ptnum) )
      // else console.log('connectionPoint_B does NOT exist.')
      else {
        console.log('connectionPoint_B does NOT exist.')
        connections.push( new_connection(action.ptnum, state.current_ptnum) )
      }
      
      console.log(connections)
      
      // console.log(state.connections.findIndex(connection => connection.ptnum === ))

      // return { 
      //   ...state, 
      //   connections: [
      //     ...state.connections, 
      //     {
      //       ptnum: action.ptnum, 
      //       connectedPoints: state.current_ptnum !== null ? [ state.current_ptnum ] : [], 
      //       color: state.wireColor
      //     }
      //   ], 
      //   current_ptnum: action.ptnum
      // }
      return { 
        ...state, 
        connections, 
        current_ptnum: action.ptnum
      }
      // const connection_point_A = state.connections.findIndex( pt => pt.ptnum === state.current_ptnum )
      // console.log(connection_point_A)
      // const connection_point_B = state.connections.findIndex( pt => pt.ptnum === action.ptnum )
      // console.log(connection_point_B)


      // const current_connection = [...state.connections].find( pt => pt.ptnum === state.current_ptnum )
      // if(current_connection){
      //   console.log('point exists')
      //   const connections = [ ...state.connections].map( connection => {
      //     if(connection.ptnum !== current_connection.ptnum) return connection
      //     else {
      //       const new_connection = { ...current_connection, connectedPoints: [ ...current_connection.connectedPoints, action.ptnum ]}
      //       console.log(new_connection)
      //       return new_connection
      //     }
      //   })
      //   return { ...state, connections }
      // }
      // else {
      //   console.log('point does not exist')
      //   if(state.current_ptnum !==  null){
      //     const new_connection_A = { ptnum: state.current_ptnum, connectedPoints: [ action.ptnum ], color: state.wireColor }
      //     const connection_B_index = state.connections.findIndex(connection => connection.ptnum === action.ptnum)
      //     console.log(connection_B_index)
      //     if(connection_B_index >= 0){
      //       console.log('b index does exist')
      //       const connections = [...state.connections].map(connection => (
      //         connection.ptnum !== action.ptnum ? connection : {...connection, connectedPoints: [...connection.connectedPoints, state.current_ptnum]}
      //       ))
      //       return {...state, connections: [...connections, new_connection_A]}
      //     } else {
      //       console.log('b index does NOT exist')
      //       const new_connection_B = { 
      //         ptnum: action.ptnum, 
      //         connectedPoints: [ state.current_ptnum ], 
      //         color: state.wireColor
      //       } 
      //       console.log(new_connection_B)
      //       return {...state, connections: [...state.connections, new_connection_A, new_connection_B]}
      //     }
      //     // const new_connection_B = connection_B_index || connection_B_index === 0 ? {...state.connections[connection_B_index], connectedPoints: [...state.connections[connection_B_index].connectedPoints, state.current_ptnum]} : { ptnum: action.ptnum, connectedPoints: [ state.current_ptnum ], color: state.wireColor} 
      //     // const connections = [...state.connections.map(connection => (
      //     //   connection.ptnum !== action.ptnum ? connection : {...connection, connectedPoints: [...connection.connectedPoints, state.current_ptnum]}
      //     // )), new_connection_A]
      //     // console.log(connections)
      //     // return {
      //     //   ...state, 
      //     //   connections: [
      //     //     ...state.connections,
      //     //     new_connection_A,

      //     //   ]
      //     // }
          
      //     // const connectedPoint = state.connections.find(connection => connection.ptnum === action.ptnum)
      //     // if(connectedPoint) {
            
      //     //   const connections = state.connections.map(connection => (
      //     //     connection.ptnum !== action.ptnum ? connection : {...connection, connectedPoints: [...connection.connectedPoints, state.current_ptnum]}
      //     //   ))
      //     //   return {...state, connections: [...state.connections, new_connection_A,  ]}
      //     // }
      //     // else return { ...state, connections: [...state.connections, new_connection_A ]}
      //     // const connectedPoint_connectedPts = 
      //     // connectedPoint ? { ...connectedPoint, connectedPoints: [...connectedPoint.connectedPoints, state.current_ptnum] } : undefined 
      //     // const connections = [ ...state.connections, new_connection_A ]
      //     // return { ...state, connections }
      //   }
      //   else throw(Error())

      // }
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