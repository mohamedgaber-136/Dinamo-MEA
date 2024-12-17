import { configureStore } from '@reduxjs/toolkit';
import { api } from './Api';

// Configure the Redux store
const store = configureStore({
  reducer: {
    // Add the API reducer
    [api.reducerPath]: api.reducer,
  },
  // Add the API middleware for handling caching, invalidation, etc.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;

// Export RootState and AppDispatch for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
