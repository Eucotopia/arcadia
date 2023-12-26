import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {RootState} from "@/app/store";
import {LoginRequest, ResultResponse, UserV0} from "@/types";

export const authApi = createApi({
        baseQuery: fetchBaseQuery({
            baseUrl: 'http://localhost:8080/user',
            prepareHeaders: (headers, {getState}) => {
                // By default, if we have a token in the store, let's use that for authenticated requests
                const token = (getState() as RootState).auth.user?.token
                console.log("token" + token)
                if (token) {
                    headers.set('Authorization', `Bearer ${token}`)
                }
                return headers
            },
        }),
        endpoints: (builder) => ({
            login: builder.mutation<ResultResponse<UserV0>, LoginRequest>({
                query: (credentials) => ({
                    url: '/login',
                    method: 'POST',
                    body: credentials
                })
            })
        }),
    }
)
export const {useLoginMutation} = authApi