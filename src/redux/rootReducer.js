import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';

// slices
import stakingReducer from './slices/staking';

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: []
};

const rootReducer = combineReducers({
  staking: stakingReducer
});

export { rootPersistConfig, rootReducer };
