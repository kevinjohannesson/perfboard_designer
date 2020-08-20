import { ADD_CONNECTION_POINT, SET_VIEW, SET_WIRE_COLOR, SET_TOOL, SET_HEADER_HEIGHT, DRAW_HEADER_FINISH,  SET_HEADER_WIDTH, SET_CURRENT_PTNUM, CREATE_PADS, CREATE_POINTS, ADD_CONNECTION, CREATE_HEADER, SETUP_BOARD, DRAW_HEADER_INIT } from "./actionTypes";
import { I_state, NewHeader } from './initialState';
import { I_Vector } from "../../../components/Container";
import { Board, Header } from "../../../components/Board.d";

export const set__tool = (tool: I_state['tool'], tooltype?: Header['type']) => ({ type: SET_TOOL, tool, tooltype })
export const set__current_ptnum = (ptnum: I_state['current_ptnum']) => ({ type: SET_CURRENT_PTNUM, ptnum})

export const create__pads = (pads: I_state['pads']) => ({ type: CREATE_PADS, pads })
export const create__points = ( points: I_Vector[] ) => ({ type: CREATE_POINTS, points })
export const add__connection = (ptnum: number) => ({ type: ADD_CONNECTION, ptnum })
export const add__connectionPoint = (ptnum: number) => ({ type: ADD_CONNECTION_POINT, ptnum })

export const create__header = (ptnum: number) => ({ type: CREATE_HEADER, ptnum })

export const set__wireColor = (color: string) => ({type: SET_WIRE_COLOR, color })

interface I_board {
  height: number,
  width: number,
  pitch: number,
  rows: number,
  columns: number,
}
// export const setup__board = (board: I_board, grid: any, mountingHoles = { radius: 1, offset: 2.5 }) => ( {type: SETUP_BOARD, board, grid, mountingHoles })
export const setup__board = (board: Board) => ( {type: SETUP_BOARD, board})

export const draw__headerInit = (ptnum: number) => {
  const header: Partial<NewHeader> = {
    ptnum,
    height: 1,
    width: 1,
  }
  return ({type: DRAW_HEADER_INIT, header})
}

export const draw__headerFinish = () => ({type: DRAW_HEADER_FINISH})

export const set__headerWidth = (width: number) => ({type: SET_HEADER_WIDTH, width})
export const set__headerHeight = (height: number) => ({type: SET_HEADER_HEIGHT, height})

export const set__view = (view: 'front' | 'back') => ({type: SET_VIEW, view})