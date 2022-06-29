import React from 'react'
import { View, StyleSheet } from 'react-native'
import CodePush from 'react-native-code-push'
import LottieView from 'lottie-react-native';
import { Title, Caption, } from 'react-native-paper'

const Code_pUsh_Option = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_START,
};

const withCodePush = WrappedComponent => {
  class WrappedApp extends React.PureComponent {
    state = {
      Update: false,
      status: "Updating Tooday",
      Ready: false
    }

    componentDidMount() {
      CodePush.sync({ installMode: CodePush.InstallMode.IMMEDIATE }, this.SyncWithCode, null)
      CodePush.checkForUpdate()
        .then((update) => {
          if (!update) {
            this.setState({ Update: false })
            console.log("The app is up to date!");
          } else {
            this.setState({ Update: true })
          }
        });
    }

    SyncWithCode = (Status) => {
      console.log(Status)
    }

    render() {
      if (this.state.Update) {
        return (<>
          <WrappedComponent />
          <View style={styles.conatiner}>
            <View style={styles.animate}>
              <LottieView
                source={require('./Animations/codepush.json')}
                colorFilters={[{
                  keypath: "button",
                  color: "black"
                }, {
                  keypath: "Sending Loader",
                  color: "#F00000"
                }]}
                autoPlay={this.state.Update}
                loop={this.state.Update}
              />
            </View>
            <View style={styles.textContainer}>
              <Title style={{ fontSize: 18, fontWeight: "bold", color: "black" }}>Updating Tooday</Title>
              <Caption style={{ fontSize: 16, color: "black" }}>WITH NEW FEATURES</Caption>
            </View>
          </View>
        </>
        );
      }
      else {
        return (
          <WrappedComponent />
        );
      }
    }
  }
  return CodePush(Code_pUsh_Option)(WrappedApp)
};

export default withCodePush;

const styles = StyleSheet.create({
  conatiner: {
    position: "absolute",
    alignItems: "center",
    justifyContent: 'center',
    width: "100%",
    height: "100%",
    backgroundColor: "#f7f7f7"
  },
  animate: {
    width: "80%",
    borderRadius: 20,
    height: 250,
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  textContainer: {
    alignItems: "center",
    backgroundColor: "white",
    padding: 15, width: "100%",
    marginVertical: 20
  }
})


