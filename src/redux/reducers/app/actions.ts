import { SET_GIZMO_LOCATION } from "./actionTypes";
import { I_Vector } from "../../../components/Container";

export const setGizmoLocation = (vector: I_Vector | null) => ({type: SET_GIZMO_LOCATION, location: vector})