import MemberStore from './member.js';
import DeviceStore from './devices.js';
import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux';

const rootReducer = combineReducers({members: MemberStore.reducer, devices: DeviceStore.reducer});
const Store = configureStore({reducer: rootReducer});


export default Store;