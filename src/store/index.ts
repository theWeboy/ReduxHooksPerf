import { DispatchAction, InitialStateType, rootReducer } from './rootReducer';
import { createStore } from 'redux';

export const store = createStore<InitialStateType, DispatchAction, null, null>(rootReducer);
