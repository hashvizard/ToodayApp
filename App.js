import React from 'react'
import Route from './src/navigation/main'
import { QueryClient, QueryClientProvider } from 'react-query'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import withCodePush from './CodePush'
import { LogBox, StatusBar } from 'react-native';
import { navigationRef } from './RootNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { connect } from 'react-redux';
import { updateCheck } from './src/redux/actions';


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
  LogBox.ignoreAllLogs();
  return (
    <SafeAreaProvider>
      <StatusBar barStyle='dark-content' />
      <PaperProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <NavigationContainer ref={navigationRef}>
              <Route />
            </NavigationContainer>
          </QueryClientProvider>
      </PaperProvider>
    </SafeAreaProvider>
  )
}

// Passing Dispatch to codepush
const mapDispatchToProps = (dispatch) => {
  return {
      updates: (val) => dispatch(updateCheck(val))
  }
};

export default connect(null, mapDispatchToProps) (withCodePush(App))