import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authReducer from "@/features/auth/authSlice";
// defaults to localStorage for web
import {configureStore, combineReducers} from "@reduxjs/toolkit";
// 定义配置信息
const persistConfig = {
    key: "root",
    storage: storage,
    // 如果不想将部分state持久化，可以将其放入黑名单(blacklist)中.黑名单是设置
    blacklist: []
}
const rootReducer = combineReducers({
    auth: authReducer,
    // post: postReducer,
    // [postApi.reducerPath]: postApi.reducer,
    // [authApi.reducerPath]: authApi.reducer,
})
// 创建持久化的配置persist的信息
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    })
})
export const persistor = persistStore(store)
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch