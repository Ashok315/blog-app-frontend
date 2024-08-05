import { configureStore} from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import storage from "redux-persist/lib/storage";
import {persistReducer, persistStore } from "redux-persist";
import { encryptTransform } from "redux-persist-transform-encrypt";


// encrypt redux state data
const encryptor=encryptTransform({
    secretKey:"blog-web-app-for-persist-data",
    onError:function (error){
        throw new Error(error.message)
    }
})

//config persist
const persistConfig={
    key:"root",
    storage,
    transforms:[encryptor]
}
const persistedReducer=persistReducer(persistConfig,authSlice)

export const store=configureStore({
    reducer:{
        auth:persistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
});

export const persistor=persistStore(store);