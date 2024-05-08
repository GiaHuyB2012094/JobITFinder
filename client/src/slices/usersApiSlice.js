import { apiSlice } from "./apiSlice";
const USERS_URL = "/api/users";

export const usersApiSlice = apiSlice.injectEndpoints({
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),

    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
      invalidatesTags: ["Users"],
    }),

    registerU: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),

    getCompanyList: builder.query({
      query: (data) => ({
        url: `${USERS_URL}/companyList`,
        method: "GET",
        body: data,
      }),
      providesTags: ["Users"],
    }),

    getCompanyItem: builder.query({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
        method: "GET",
      }),
      providesTags: ["Users"],
    }),

    getUserItem: builder.query({
      query: (id) => ({
        url: `${USERS_URL}/user/${id}`,
        method: "GET",
      }),
      providesTags: ["Users"],
    }),

    createQuestions: builder.mutation({
      query: ({ id, data }) => ({
        url: `${USERS_URL}/add-questions-company/${id}`,
        method: "POST",
        body: data,
      }),
      providesTags: ["Users"],
    }),

    updateQuestion: builder.mutation({
      query: ({ id, data }) => ({
        url: `${USERS_URL}/update-questions-company/${id}`,
        method: "POST",
        body: data,
      }),
      providesTags: ["Users"],
    }),

    deleteQuestion: builder.mutation({
      query: ({ id, data }) => ({
        url: `${USERS_URL}/delete-question-company/${id}`,
        method: "DELETE",
        body: data,
      }),
      providesTags: ["Users"],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterUMutation,
  useUpdateProfileMutation,
  useGetCompanyListQuery,
  useGetCompanyItemQuery,
  useGetUserItemQuery,
  useCreateQuestionsMutation,
  useUpdateQuestionMutation,
  useDeleteQuestionMutation,
} = usersApiSlice;
