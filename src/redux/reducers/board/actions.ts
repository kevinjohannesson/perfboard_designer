import { SET_WIRE_COLOR, SET_TOOL, SET_CURRENT_PTNUM, CREATE_PADS, CREATE_POINTS, ADD_CONNECTION, CREATE_HEADER, SETUP_BOARD } from "./actionTypes";
import { I_state } from './initialState';
import { I_Vector } from "../../../components/Container";

export const set__tool = (tool: I_state['tool']) => ({ type: SET_TOOL, tool })
export const set__current_ptnum = (ptnum: I_state['current_ptnum']) => ({ type: SET_CURRENT_PTNUM, ptnum})

export const create__pads = (pads: I_state['pads']) => ({ type: CREATE_PADS, pads })
export const create__points = ( points: I_Vector[] ) => ({ type: CREATE_POINTS, points })
export const add__connection = (ptnum: number) => ({ type: ADD_CONNECTION, ptnum })

export const create__header = (ptnum: number) => ({ type: CREATE_HEADER, ptnum })

export const set__wireColor = (color: string) => ({type: SET_WIRE_COLOR, color })

interface I_board {
  height: number,
  width: number,
  pitch: number,
  rows: number,
  columns: number,
}
export const setup__board = (board: I_board, mountingHoles = { radius: 1, offset: 2.5 }) => {
  
  const points = ([] as I_Vector[]).concat(...Array.from({length: board.columns}, (undef, column) => ( 
    Array.from({length:board.rows},(undef, row)=> (
      {
          x: column * board.pitch, 
          y: row * board.pitch,
          rowIndex: row,
          columnIndex: column,
          ptnum: column * board.rows + row
      })
    )
  ))) 
  const grid_width = ( board.columns - 1 ) * board.pitch
  const grid_height = ( board.rows - 1 ) * board.pitch
  const grid = {
    points,
    offset: {
      top: ( board.height - grid_height ) / 2,
      left: ( board.width - grid_width ) / 2,
    },
    width: grid_width,
    height: grid_height,
  }
  
  return {type: SETUP_BOARD, board, grid, mountingHoles }
}