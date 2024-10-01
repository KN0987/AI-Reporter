import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userReducer from "./user/userSlice.js";
import {persistReducer, persistStore} from 'redux-persist';
import storage from "redux-persist/lib/storage";
import { articleApi } from "./article.js";

const rootReducer = combineReducers({user: userReducer,
    [articleApi.reducerPath]: articleApi.reducer,
});

const persistConfig = {
    key: "root",
    version: 1,
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }).concat(articleApi.middleware),
});

export const persistor =  persistStore(store);