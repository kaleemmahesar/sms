// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const wheelsApi = createApi({
  reducerPath: 'wheelsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3002/' }),
  endpoints: (builder) => ({
    getAllWheels: builder.query({
      query: () => ({
        url: 'users',
        method: 'GET'
      })
    }),
    getwheelUser: builder.query({
      query: (id) => ({
        url: `users/${id}`,
        method: 'GET'
      })
    }),
    createWheelUser: builder.mutation({
      query: (newPost) => ({
        url: 'users',
        method: 'POST',
        body: newPost,
        headers: {
          'Content-type' : 'application/json; charset=UTF-8'
        }
      })
    }),
    deleteWheelUser: builder.mutation({
      query: (id) => ({
          url: `users/${id}`,
          method: 'DELETE'
      })
    })
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllWheelsQuery, useGetwheelUserQuery, useCreateWheelUserMutation, useDeleteWheelUserMutation } = wheelsApi