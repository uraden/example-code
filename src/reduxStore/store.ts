"use client";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from './feature/cartSlice';
import userDataReducer from './feature/saveUserDataSlice';
import categoryReducer from './feature/categorySlice';
import { 
  persistStore, 
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import { createWrapper } from 'next-redux-wrapper'; 

const persistConfig = {
  key: 'root',
  storage,
};


const combinedReducer = combineReducers({
  cart: cartReducer,
  userData: userDataReducer,
  productCategory: categoryReducer,
});

const persistedReducer = persistReducer(persistConfig, combinedReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Create the persistor (on the client side only)
export const persistor = persistStore(store);

// Create the wrapper for Next.js integration
export const wrapper = createWrapper(store as any);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;