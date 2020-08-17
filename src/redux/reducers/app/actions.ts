import { 
  SET_GIZMO_LOCATION ,
  SET_CONTEXT_MENU_LOCATION, 
} from "./actionTypes";
import { I_Vector } from "../../../components/Container";

export const setGizmoLocation = (vector: I_Vector | null) => ({type: SET_GIZMO_LOCATION, location: vector})

export const set__contextMenuLocation = (location: I_Vector | null ) => ({type: SET_CONTEXT_MENU_LOCATION, location })