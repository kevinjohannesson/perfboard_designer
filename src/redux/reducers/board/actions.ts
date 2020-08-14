import { SET_TOOL } from "./actionTypes";
import { I_state } from './initialState';

export const setTool = (tool: I_state["tool"] | null) => ({ type: SET_TOOL, tool })