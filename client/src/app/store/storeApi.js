import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const storeApi = createApi({
    reducerPath: 'storeApi',
    baseQuery: fetchBaseQuery({ baseUrl: ' http://localhost:5000/api/v1' }),
    endpoints: (builder) => ({
        getHomeContent: builder.query({
            query: () => `/home`,
        }),
        getPostsById: builder.query({
            query: (id) => `/products/${id}`,
          }),
        addHomeContent: builder.mutation({
            query: (data) => ({
                url: '/home',
                method: 'POST',
                body: data,
            }),
        }),
        updateHomeContent: builder.mutation({
            query: ({ id, data }) => ({
              url: `/edit-home/${id}`,
              method: 'PUT',
              body: data,
            }),
        }),
        deletePost: builder.mutation({
            query: (id) => ({
              url: `/products/${id}`,
              method: 'DELETE',
            }),
          }),
        addUser: builder.mutation({
            query: (data) => ({
                url: '/auth/register',
                method: 'POST',
                body: data,
            }),
        }),
        loginUser: builder.mutation({
            query: (data) => ({
                url: '/auth/login',
                method: 'POST',
                body: data,
            }),
        }),
        editUser: builder.mutation({
            query: ({ userID, data }) => ({
                url: `/uploads${userID}`,
                method: 'PUT',
                body: data,
            })
        }),
        deleteUser: builder.mutation({
            query: (userID) => ({
                url: `/uploads${userID}`,
                method: 'DELETE',                
            })
        })
    })
})

export const {
    useGetHomeContentQuery,
    useAddHomeContentMutation,
    useUpdateHomeContentMutation,
    useAddPostMutation,
    useGetPostsQuery,
    useGetPostsByIdQuery,
    useDeletePostMutation,
    useUpdatePostMutation,
    useAddUserMutation,
    useEditUserMutation,
    useDeleteUserMutation,
    useLoginUserMutation
} = storeApi