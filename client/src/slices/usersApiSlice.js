import { apiSlice } from "./apiSlice";
const USERS_URL = '/api/users';

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/auth`,
                method: 'POST',
                body: data,
            })
        }),

        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST',
            })
        }),

        registerU: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}`,
                method: 'POST',
                body: data,
            })
        }),

        updateProfile: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/profile`,
                method: 'PUT',
                body: data,
            })
        }),

        getCompanyList: builder.query({
            query: (data) => ({
                url: `${USERS_URL}/companyList`,
                method: 'GET',
                body: data,
            })
        }),
        
        getCompanyItem: builder.query({
            query: (id) => ({
                url: `${USERS_URL}/${id}`,
                method: 'GET',
            })
        })
    })
})

export const { 
    useLoginMutation, 
    useLogoutMutation, 
    useRegisterUMutation, 
    useUpdateProfileMutation, 
    useGetCompanyListQuery,
    useGetCompanyItemQuery,
} = usersApiSlice;