import { Action, combineReducers } from "redux";
import { ThunkAction } from "redux-thunk";
import magazine from "./magarineReducer";

export const rootReducers = combineReducers({
    magazine
});


//Это я конечно не сам придумал, но то, что здесь происходит я почти понимаю и могу объяснить
type RootReducersType = typeof rootReducers; 
export type AppStateType = ReturnType<RootReducersType>; 

type PropertiesType<T> = T extends { [key: string]: infer U } ? U : never;
export type InferActionTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesType<T>>;

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>;
