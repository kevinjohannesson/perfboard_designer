export type Layer = 'single' | 'double'
export type Pitch = 2.54 | 1.27
export type Vector = {
  x: number,
  y: number
}
export type Placement = 'front' | 'back'

export type HeaderType = 'male' | 'female'

export interface Board {
  width: number,
  height: number,
  layer: Layer,
  grid: Grid,
}
export interface Grid {
  width: number,
  height: number,
  offset: {
    top: number,
    left: number
  },
  columns: number,
  rows: number,
  pitch: Pitch,
  points: {[key: string]: Point}
}
export interface Point {
  row: number,
  column: number,
  ptnum: number,
  index: string,
  location: {
    front: Vector,
    back: Vector
  }
}

export interface Header {
  ptnum: number,
  type: HeaderType,
  placement: Placement,
  orientation: 'horizontal' | 'vertical',
  double: boolean,
}

