import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { PersistGate } from 'redux-persist/integration/react'
import { createStackNavigator } from 'react-navigation'
import rootReducer from './reducers'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import Main from './screens/Main'
import Dimension from './screens/Dimension'

const middleware = applyMiddleware(thunk);

const persistConfig = {
  key: 'liska',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(
  persistedReducer,
  composeWithDevTools(middleware)  
)
const persistor = persistStore(store)

const RootStack = createStackNavigator({
  Home: Main,
  Dimension: Dimension
})

if(module.hot) {
  module.hot.accept(() => {
    const nextRootReducer = require('./reducers')
    store.replaceReducer(
      persistReducer(persistConfig, nextRootReducer)
    )
  })
}

export default class App extends React.PureComponent {

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RootStack />
        </PersistGate>
      </Provider>
    );
  }
}