import { apiSlice } from "./apiSlice";
const POST_URL = "/api/jobPost";

export const postApiSlice = apiSlice.injectEndpoints({
    tagTypes: ["Jobs"],
    endpoints: (builder) => ({
        getPosts: builder.query({
            query: (data) => ({
                url: `${POST_URL}/listJobs`,
                method: 'GET',
                body: data,
            }),
            providesTags: ['Jobs']
        }),

        createJobPost: builder.mutation({
            query: (data) => ({
                url: `${POST_URL}`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Jobs']
        }),

        getPostItemWithCompany: builder.query({
            query: (id) => ({
                url: `${POST_URL}/job/${id}`,
                method: 'GET',
            }),
            providesTags: ['Jobs']
        }),

        getPostItem: builder.query({
            query: (id) => ({
                url: `${POST_URL}/job-item/${id}`,
                method: 'GET',
            }),
            providesTags: ['Jobs']
        }),

        deletePost: builder.mutation({
            query: (id) => ({
                url: `${POST_URL}/job/${id}`,
                method: 'DELETE',
                credentials: 'include',
            }),
            invalidatesTags: ['Jobs']
        }),

        updatePost: builder.mutation({
            query: ({postId, postBody}) => ({   
                url: `${POST_URL}/job/${postId}`,
                method: 'PUT',
                body: postBody,
                credentials: 'include',
            }),
            invalidatesTags: ['Jobs']
        })
    })
})

export const { 
    useGetPostsQuery,
    useCreateJobPostMutation,
    useGetPostItemWithCompanyQuery,
    useGetPostItemQuery,
    useDeletePostMutation,
    useUpdatePostMutation,
} = postApiSlice;