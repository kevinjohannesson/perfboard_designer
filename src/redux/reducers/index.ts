import { combineReducers } from "redux";

import AppReducer from "./app/reducer";
import { I_state as AppState } from './app/initialState';

import BoardReducer from "./board/reducer";
import { I_state as BoardState } from './board/initialState';


export interface I_reducer  {
  AppReducer: AppState,
  BoardReducer: BoardState,
}

export default combineReducers({ AppReducer, BoardReducer });
