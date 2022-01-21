import React from 'react'
import { View, Text } from 'react-native'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import Route from './src/navigation/main'
import rootReducer from './src/redux/reducers'
import {QueryClient, QueryClientProvider} from 'react-query'

const store = createStore(rootReducer, applyMiddleware(thunk))

const queryClient = new QueryClient({
  defaultOptions:{queries: {refetchInterval: false, staleTime: Infinity}}
})

const App = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
      <Route />
      </QueryClientProvider>
    </Provider>
  )
}

export default App
