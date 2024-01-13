import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { personSlice } from './features/personSlice'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
}

const reducers = combineReducers({
    person: personSlice.reducer
})

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
    reducer: persistedReducer
})