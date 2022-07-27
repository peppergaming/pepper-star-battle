import {
    Action,
    configureStore,
    ConfigureStoreOptions,
    ThunkAction,
} from "@reduxjs/toolkit";
import { pepperApi } from "../services/api/pepperApi";
import authReducer from "./auth/authSlice";
import { createWrapper } from "next-redux-wrapper";

export const makeStore = (options?: ConfigureStoreOptions) =>
    configureStore({
        reducer: {
            auth: authReducer,
            [pepperApi.reducerPath]: pepperApi.reducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(pepperApi.middleware),
        ...options,
    });

// const store = makeStore();
export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    Action
    >;
// @ts-ignore
const wrapper = createWrapper<AppStore>(makeStore);
// export const wrapper = createWrapper<AppStore>(makeStore);

// export type AppDispatch = typeof wrapper.dispatch;
export type AppDispatch = ReturnType<AppStore["dispatch"]>;

export default wrapper;
