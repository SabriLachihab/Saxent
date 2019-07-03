import React, {Component} from 'react';
import {Provider} from 'react-redux'
import Routes from './Root'
import { PersistGate } from "redux-persist/integration/react";
import factory from "../App/Store/index"
import SplashScreen from 'react-native-splash-screen'

const { store, persistor } = factory()

class App extends React.Component {

  componentDidMount() {
    SplashScreen.hide()
  }

  render() {
    return (
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
          <Routes/>
        </PersistGate>
      </Provider>
    );
  }
}
export default App
