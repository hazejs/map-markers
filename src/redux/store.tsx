import { combineReducers, configureStore } from '@reduxjs/toolkit';
import markersReducer from './index';

const rootReducer = combineReducers({
    markers: markersReducer,
  });
  
  const store = configureStore({
    reducer: rootReducer,
  });
  
  export type RootState = ReturnType<typeof rootReducer>;
  

export default store;
