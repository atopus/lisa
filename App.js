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
import CreateDimension from './screens/CreateDimension'
import * as StyleVariables from './Styles'

const middleware = applyMiddleware(thunk);

const _PERSIST = true
const _HOTRELOAD = true
const _PURGE = false

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
if(_PURGE) persistor.purge()

const RootStack = createStackNavigator(
  {
    Home: Main,
    Dimension: Dimension,
    CreateDimension: CreateDimension
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerStyle : {
        backgroundColor: StyleVariables.PRIMARY.neutral
      },
      headerTintColor : '#fff'
    }
  }
)

if(module.hot && _HOTRELOAD) {
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
        {_PERSIST ? (
          <PersistGate loading={null} persistor={persistor}>
          <RootStack />
        </PersistGate>
        ) : (
          <RootStack />
        )}
        
      </Provider>
    );
  }
}