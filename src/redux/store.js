import { configureStore} from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import themeReducer from "./themeSlice";
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

//persist configuration for auth reducer
const persistAuthConfig={
    key:"auth",
    storage,
    transforms:[encryptor]
}

//persist configuration for theme reducer
const persistThemeConfig={
    key:"theme",
    storage
}

const persistedAuthReducer=persistReducer(persistAuthConfig,authReducer);
const persistedThemeReducer=persistReducer(persistThemeConfig,themeReducer)

export const store=configureStore({
    reducer:{
        auth:persistedAuthReducer,
        theme:persistedThemeReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
});

export const persistor=persistStore(store);