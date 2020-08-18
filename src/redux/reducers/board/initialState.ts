import { I_Vector } from "../../../components/Container"
import { wireColorName } from "../../../components/CONSTANTS"
import { Board } from "../../../components/Board.d"

export type T_ptnum = number

export type T_header = {
  ptnum: T_ptnum,
  type: 'male' | 'female',
  placement: Placement,
  orientation: 'horizontal' | 'vertical',
}


export type Placement = 'front' | 'back'
export interface I_state {
  view: Placement,

  board: Board

  width: number | null,
  height: number | null,

  mountingHoles: {
    offset: number,
    radius: number
  } | null,

  rows: number | null,
  columns: number | null,

  pitch: 2.54 | 1.27 | null,

  grid: {
    points: {
      x: number, 
      y: number,
      rowIndex: number,
      columnIndex: number,
      ptnum: number,
      purpose: {
        type: 'connection' ,
      } | {
        type: 'header',
      } | {
        type: 'empty'
      },
    }[],
    offset: {
      top: number,
      left: number
    }
    width: number,
    height: number,
  } | null,


  wireColor: wireColorName,

  connections: {
    ptnum: number,
    connectedPoints: number[],
    color: wireColorName,
    placement: Placement,
  }[],

  headers: T_header[],


  pads: {
    location: I_Vector,
    connections: number[],
    header: boolean,
    socket: boolean,
    // Letter en nummer van pcb'tje?
  }[], 
  tool: 'connection' | 'header' | null,
  current_ptnum: number | null,
}
 
const initialState: I_state = {
  view: 'front',

  board: {
    width: 0,
    height: 0,
    layer: 'single',
    grid: {
      width: 0,
      height: 0,
      columns: 0,
      rows: 0,
      pitch: 2.54,
      points: {},
      offset: {
        top: 0,
        left: 0
      }
    }
  },
  
  width: null,
  height: null,

  mountingHoles: null,
  
  rows: null,
  columns: null,

  pitch: null,

  wireColor: 'black', 
  
  grid: null,

  connections: [
    {
      ptnum: 431,
      connectedPoints: [420],
      color: 'blue',
      placement: 'back',
    },
    {
      ptnum: 420,
      connectedPoints: [366, 431],
      color: 'blue',
      placement: 'back',
    },
    {
      ptnum: 366,
      connectedPoints: [420],
      color: 'blue',
      placement: 'back',
    },
    
    {
      ptnum: 15,
      connectedPoints: [0],
      color: 'red',
      placement: 'front',
    },
    {
      ptnum: 0,
      connectedPoints: [15, 18],
      color: 'red',
      placement: 'front',
    },
    {
      ptnum: 18,
      connectedPoints: [0, 27],
      color: 'red',
      placement: 'back',
    },
    {
      ptnum: 27,
      connectedPoints: [18, 117],
      color: 'red',
      placement: 'back',
    },
    {
      ptnum: 117,
      connectedPoints: [27, 123, 113],
      color: 'red',
      placement: 'back',
    },
    {
      ptnum: 123,
      connectedPoints: [117],
      color: 'red',
      placement: 'back',
    },
    {
      ptnum: 113,
      connectedPoints: [117, 167],
      color: 'red',
      placement: 'back',
    },
    {
      ptnum: 167,
      connectedPoints: [113],
      color: 'red',
      placement: 'back',
    },
    {
      ptnum: 159,
      connectedPoints: [357],
      color: 'purple',
      placement: 'back',
    },
    {
      ptnum: 357,
      connectedPoints: [159, 350],
      color: 'purple',
      placement: 'back',
    },
    {
      ptnum: 350,
      connectedPoints: [357],
      color: 'purple',
      placement: 'back',
    },
    {
      ptnum: 205,
      connectedPoints: [308],
      color: 'yellow',
      placement: 'back',
    },
    {
      ptnum: 308,
      connectedPoints: [205],
      color: 'yellow',
      placement: 'back',
    }
  ],
  headers: [
    {
      ptnum: 377,
      type: 'male',
      placement: 'front',
      orientation: 'horizontal'
    },
    {
      ptnum: 395,
      type: 'male',
      placement: 'front',
      orientation: 'horizontal'
    },
    {
      ptnum: 413,
      type: 'male',
      placement: 'front',
      orientation: 'horizontal'
    },
    {
      ptnum: 431,
      type: 'male',
      placement: 'front',
      orientation: 'horizontal'
    },
    {
      ptnum: 348,
      type: 'female',
      placement: 'front',
      orientation: 'vertical'
    },
    {
      ptnum: 349,
      type: 'female',
      placement: 'front',
      orientation: 'vertical'
    },
    {
      ptnum: 350,
      type: 'female',
      placement: 'front',
      orientation: 'horizontal'
    },
    
    {
      ptnum: 366,
      type: 'female',
      placement: 'front',
      orientation: 'vertical'
    },
    {
      ptnum: 367,
      type: 'female',
      placement: 'front',
      orientation: 'vertical'
    },
    {
      ptnum: 368,
      type: 'female',
      placement: 'front',
      orientation: 'horizontal'
    },


  ],


  pads: [],
  tool: null,
  // tool: 'connection',
  current_ptnum: null,
}

 export default initialState