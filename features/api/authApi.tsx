import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query";
import {RootState} from "@/app/store";

export const authApi = createApi({
    baseQuery:fetchBaseQuery({
        baseUrl:'http://localhost:8080/user',
        prepareHeaders: (headers, {getState}) => {
            // By default, if we have a token in the store, let's use that for authenticated requests
            const token = (getState() as RootState).auth.user?.token
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),
    endpoints: (builder) => ({

    })
    }
)