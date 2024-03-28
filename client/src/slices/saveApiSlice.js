import { apiSlice } from "./apiSlice";
const SAVE_URL = "/api/saved";

export const saveApiSlice = apiSlice.injectEndpoints({
    tagTypes: ["Save"],
    endpoints: (builder) => ({
        createSavePost : builder.mutation({
            query: ({userID, postID}) => ({
                url: `${SAVE_URL}/${userID}/${postID}`,
                method: 'POST',
            }),
            invalidatesTags: ['Save']
        }),

        deleteSave: builder.mutation({
            query: ({idSaved}) => ({
                url: `${SAVE_URL}/${idSaved}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Save']
        }),

        getSave: builder.query({
            query: (id) => ({
                url: `${SAVE_URL}/${id}`,
                method: 'GET',
            }),
            providesTags: ['Save']
        }),

    })
})

export const {
    useCreateSavePostMutation,
    useDeleteSaveMutation,
    useGetSaveQuery,
} = saveApiSlice;