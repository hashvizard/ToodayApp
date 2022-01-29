import React from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import Route from './src/navigation/main'
import rootReducer from './src/redux/reducers'
import { QueryClient, QueryClientProvider } from 'react-query'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import withCodePush from './CodePush'

const store = createStore(rootReducer, applyMiddleware(thunk))

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchInterval: false, staleTime: Infinity } }
})

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  },
};

const App = () => {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <Route />
          </QueryClientProvider>
        </Provider>
      </PaperProvider>
    </SafeAreaProvider>
  )
}
// export default withCodePush(App)

export default App