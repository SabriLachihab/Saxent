import { createStore, applyMiddleware,compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../Reducers';
import {
  persistStore,
  persistReducer,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const middleWare = [];

const config = {
  key: "root",
  storage,
};


const Reducer = persistReducer(config,rootReducer);


const loggerMiddleware = createLogger({
  predicate: () => process.env.NODE_ENV === 'development',
});
middleWare.push(loggerMiddleware)
middleWare.push(thunk)

const store = createStore(
  Reducer,
  applyMiddleware(...middleWare)
);

const persistor = persistStore(store);

export default () => { return{store , persistor}}