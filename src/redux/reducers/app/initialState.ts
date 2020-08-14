import { I_Vector } from "../../../components/Container";

export interface I_state {
  zoom: number, // normalized
  scale: number, // screen dependant on pixels per mm, trial & error measuring
  gizmoLocation: null | I_Vector;
}

const inititialState: I_state = {
  zoom: 2, 
  scale: 4.44, 
  gizmoLocation: null,
}

export default inititialState