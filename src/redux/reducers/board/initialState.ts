import { I_Vector } from "../../../components/Container"
import { wireColorName } from "../../../components/CONSTANTS"

export type T_ptnum = number

export type T_header = {
  ptnum: T_ptnum,
  type: 'male' | 'female',
}


export interface I_state {
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
    points: I_Vector[],
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
      ptnum: 18,
      connectedPoints: [27],
      color: 'red'
    },
    {
      ptnum: 27,
      connectedPoints: [18, 117],
      color: 'red'
    },
    {
      ptnum: 117,
      connectedPoints: [27, 113],
      color: 'red'
    },
    {
      ptnum: 113,
      connectedPoints: [117, 167],
      color: 'red'
    },
    {
      ptnum: 167,
      connectedPoints: [113],
      color: 'red'
    },
    {
      ptnum: 159,
      connectedPoints: [357],
      color: 'purple'
    },
    {
      ptnum: 357,
      connectedPoints: [159],
      color: 'purple'
    },
    {
      ptnum: 205,
      connectedPoints: [308],
      color: 'yellow'
    },
    {
      ptnum: 308,
      connectedPoints: [205],
      color: 'yellow'
    }
  ],
  headers: [
    {
      ptnum: 377,
      type: 'male'
    },
    {
      ptnum: 395,
      type: 'male'
    },
    {
      ptnum: 413,
      type: 'male'
    },
    {
      ptnum: 431,
      type: 'male'
    },
    {
      ptnum: 348,
      type: 'female'
    },
    {
      ptnum: 349,
      type: 'female'
    },
    {
      ptnum: 350,
      type: 'female'
    },


  ],


  pads: [],
  tool: null,
  current_ptnum: null,
}

 export default initialState