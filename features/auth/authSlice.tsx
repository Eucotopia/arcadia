import {createSlice} from "@reduxjs/toolkit";
import {UserV0} from "@/types";
import {RootState} from "@/app/store";

const AuthSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null as UserV0 | null
    },
    reducers: {
        setCredentials: (state, action) => {
            state.user = action.payload
        },
        removeCredentials: (state) => {
            state.user = null
        }
    },
    extraReducers: (builder) => {
    },
})
export const {setCredentials, removeCredentials} = AuthSlice.actions
export default AuthSlice.reducer
export const selectCurrentUser = (state: RootState) => state.auth.user


