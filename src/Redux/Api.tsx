import { AddItemResponse, ItemType } from '../types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = import.meta.env.VITE_API_BASE_URL;
console.log(baseUrl);

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  tagTypes: [
    "posts"
  ], // Define tag types
  endpoints: (builder) => ({
    getItems: builder.query<ItemType[], string>({
      query: (itemId) => `${itemId}`,
      providesTags: (result) =>
        result
          ? result.map(() => ({ type: 'posts' })) // Marks the query with the 'posts' tag
          : [{ type: 'posts' }], // If no data, still marks with 'posts'
    }),
    addItem: builder.mutation<AddItemResponse, {newItem: Partial<ItemType> }>({
      query: ({newItem }) => ({
        url: 'posts',
        method: 'POST',
        body: newItem,
      }),
      invalidatesTags: [
        "posts"
      ], // Invalidates 'posts', causing related queries to refetch
    }),
    deleteItem: builder.mutation<AddItemResponse, { endpoint: string }>({
      query: ({ endpoint }) => ({
        url: endpoint,
        method: 'DELETE',
      }),
      invalidatesTags: [
        "posts"
      ], // Invalidates 'posts', causing related queries to refetch
    }),
  }),
});

// Export hooks for usage in components
export const {
  useGetItemsQuery,
  useAddItemMutation,
  useDeleteItemMutation,
} = api;
