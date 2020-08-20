import initialState, { I_state } from './initialState'
import { SET_TOOL, SET_HEADER_WIDTH, DRAW_HEADER_FINISH, SET_HEADER_HEIGHT, SET_CURRENT_PTNUM, CREATE_PADS, ADD_CONNECTION, CREATE_HEADER, CREATE_POINTS, SETUP_BOARD, SET_WIRE_COLOR, SET_VIEW, DRAW_HEADER_INIT } from './actionTypes';
import { Header } from '../../../components/Board.d';

export default function(state = initialState, action: any): I_state {
  switch (action.type) {
    case SET_VIEW: {
      return {...state, view: action.view}
    }
    case SETUP_BOARD: {
      return {...state, board: action.board}
    }

    case DRAW_HEADER_INIT: {
      return {...state, newHeader: {...state.newHeader, ...action.header}}
    }

    case DRAW_HEADER_FINISH: {
      console.log(state.newHeader)

      const {height, width, ptnum} = state.newHeader
      if(ptnum){

      const ptnums = (()=>{
        const pts = []
        for(let i = 0; (height > 0 ? i < height : i > height); (height > 0 ? i++ : i--)){
          for(let j = 0; width > 0 ? j < width : j > width; width > 0 ? j++ : j--){
            pts.push(ptnum + i + (j * state.board.grid.rows))
          }
        }
        return pts
      })()
      console.log(state.newHeader.type)
      const vertical = Math.abs(height) > Math.abs(width)
      const horizontal = Math.abs(width) > Math.abs(height)
      const headers: Header[] = ptnums.map(ptnum => (
        {
          ptnum,
          type: state.newHeader.type,
          orientation: vertical ? 'vertical' : 'horizontal',
          placement: state.view,
          double: ((vertical && Math.abs(width) === 2 ) || (horizontal && Math.abs(height) === 2)) ? true : false,
        }  
      ))
      // console.log(ptnum ? ptnum + height : '')
      return {
        ...state,
        headers: [
          ...state.headers,
          ...headers
        ],
        newHeader: {
          ptnum: null,
          height: 0,
          width: 0,
          type: state.newHeader.type,
        },
        // tool: null
      }
      }
    }

    case SET_HEADER_WIDTH: {
      const newHeader = {...state.newHeader, width: action.width}
      return {...state, newHeader}
    }
    case SET_HEADER_HEIGHT: {
      const newHeader = {...state.newHeader, height: action.height}
      return {...state, newHeader}
    }



    case SET_TOOL: {
      return { 
        ...state, 
        tool: action.tool,
        newHeader: action.tooltype ? {...state.newHeader, type: action.tooltype} : {...state.newHeader}
      }
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

      /// DIT WERKT NOG NIET MET OBJECT BASED 
      const connections = [...state.connections]
      const new_connection = (ptnum: number, connectedPoint: number | null, connectedPoint2?: number ) => ({ptnum, connectedPoints: connectedPoint !== null ? connectedPoint2 ? [connectedPoint, connectedPoint2] : [connectedPoint] : [], color: state.wireColor, placement: state.view })
      
      const connectionPoint_A_index = state.connections.findIndex(connection => connection.ptnum === state.current_ptnum && connection.placement === state.view)
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
      if(connectionPoint_B_index >= 0 ) {
        console.log('connectionPoint_B does exist.')
        const connectedPoints = [...connections[connectionPoint_B_index].connectedPoints]
        if(connections[connectionPoint_B_index].placement !== state.view) {
          console.log('connectionPoint_B placement does NOT match.')
          console.log(state.current_ptnum, action.ptnum)
          const nConnection = {
            ptnum: action.ptnum, 
            connectedPoints: state.current_ptnum ? [state.current_ptnum, action.ptnum] : [action.ptnum],
            color: state.wireColor, 
            placement: state.view }
          // const nConnection = new_connection(action.ptnum, state.current_ptnum, action.ptnum)
          console.log(nConnection)
          connections.push(nConnection)
          // connections.push(new_connection(action.ptnum, state.current_ptnum, action.ptnum))
          connectedPoints.push(action.ptnum)
        }
        else {
          
          console.log('connectionPoint_B placement does match.')
          if( state.current_ptnum !== null) connectedPoints.push(state.current_ptnum)
        }
        connections[connectionPoint_B_index] = {
          ...connections[connectionPoint_B_index], 
          connectedPoints,
          // placement: state.view
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