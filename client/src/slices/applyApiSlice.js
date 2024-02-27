import { apiSlice } from "./apiSlice";
const APPLY_URL = "/api/apply"

export const applyApiSlice = apiSlice.injectEndpoints({
    tagTypes: ["Apply"],
    endpoints: (builder) => ({
        // create apply
        createApply: builder.mutation({
            query: (data) => ({
                url: `${APPLY_URL}`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Apply']
        }),
        // get applies for user by id
        getAppliesUserID: builder.query({
            query: (id) => ({
                url: `${APPLY_URL}/userID/${id}`,
                method: 'GET',
                // body: data,
            }),
            providesTags: ['Apply']
        }),
        // get applies for company by id
        getAppliesCompanyID: builder.query({
            query: (id) => ({
                url: `${APPLY_URL}/companyID/${id}`,
                method: 'GET',
                // body: data,
            }),
            providesTags: ['Apply']
        }),
        // conform apply 
        conformApply: builder.mutation({
            query: (id) => ({
                url: `${APPLY_URL}/conform-apply/${id}`,
                method: 'PUT',
                credentials: 'include',
            }),
            invalidatesTags: ['Apply']
        }),
        // reject apply 
        rejectApply: builder.mutation({
            query: (id) => ({
                url: `${APPLY_URL}/reject-apply/${id}`,
                method: 'PUT',
                credentials: 'include',
            }),
            invalidatesTags: ['Apply']
        }),
        // schedule apply 
        scheduleApply: builder.mutation({
            query: ({data, id}) => ({
                url: `${APPLY_URL}/schedule-apply/${id}`,
                method: 'PUT',
                credentials: 'include',
                body: data,
            }),
            invalidatesTags: ['Apply']
        }),
    })
})

export const {
    useCreateApplyMutation,
    useGetAppliesUserIDQuery,
    useGetAppliesCompanyIDQuery,
    useConformApplyMutation,
    useRejectApplyMutation,
    useScheduleApplyMutation,
} = applyApiSlice