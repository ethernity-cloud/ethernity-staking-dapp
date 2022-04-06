import { useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import thunkMiddleware from 'redux-thunk';

//
import { rootPersistConfig, rootReducer } from './rootReducer';

// ----------------------------------------------------------------------
//
// const store = configureStore({
//   reducer: persistReducer(rootPersistConfig, rootReducer),
//   middleware: getDefaultMiddleware({
//     serializableCheck: false,
//     immutableCheck: false
//   })
// });

const composedEnhancer = applyMiddleware(thunkMiddleware);
const persistedReducer = persistReducer(rootPersistConfig, rootReducer);
const store = createStore(persistedReducer, composedEnhancer);
const persistor = persistStore(store);

const useSelector = useReduxSelector;

const useDispatch = () => useReduxDispatch();

export { store, persistor, useSelector, useDispatch };
