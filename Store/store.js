import MemberStore from './member.js';
import DeviceStore from './devices.js';
import { combineReducers, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import FSStorage, { CacheDir } from 'redux-persist-fs-storage';


const persistConfig = {
  key: 'root',
  keyPrefix: 'test', // the redux-persist default is `persist:` which doesn't work with some file systems
  storage: FSStorage(CacheDir, 'ScheduleAppData'),
};

const rootReducer = combineReducers({members: MemberStore.reducer, devices: DeviceStore.reducer});
const persistedReducer = persistReducer(persistConfig, rootReducer)
const Store = createStore(persistedReducer)

const modules = {
    Store,
    persistor: persistStore(Store)
   
}
module.exports = modules;