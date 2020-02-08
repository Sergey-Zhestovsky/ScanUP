import { Action } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { RootState } from "../reducers/rootReducer";
import { RootConnector } from "../connections/rootConnector";


declare interface DispatchPropAction {
  (...args: any[]): void;
}

declare interface DispatchThunkWrapper
  <WrapperObject, Return, State, ExtraArgs, A extends Action<any>> {

  (arg: WrapperObject): ThunkAction<Return, State, ExtraArgs, A>;
}

declare type ServerError = ServerErrorObject | object | string;

declare type ThunkDispatch = ThunkDispatch<RootState, RootConnector, Action>;