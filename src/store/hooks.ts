import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import type { AppDispatch, AppState } from "./store";
import { Dispatch } from "redux";

export const useAppDispatch: () => Dispatch = () => {
    return useDispatch<AppDispatch>();
};

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
