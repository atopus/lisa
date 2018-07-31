import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducer from './reducers';
import Main from './screens/Main';
import Dimension from './screens/Dimension'

import { createStackNavigator } from 'react-navigation';

const persistedState = {};

const middleware = applyMiddleware(thunk);
const store = createStore(
  reducer,
  persistedState,
  composeWithDevTools(middleware)
)

const RootStack = createStackNavigator({
  Home: Main,
  Dimension: Dimension
})

export default class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <RootStack />
      </Provider>
    );
  }
}