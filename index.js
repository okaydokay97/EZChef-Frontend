import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './reducers/index'
import { AppRegistry } from 'react-native'
import App from './App'
import { name as appName } from './app.json'

const store = createStore(rootReducer)

class MyApp extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}

console.disableYellowBox = true

AppRegistry.registerComponent(appName, () => MyApp)