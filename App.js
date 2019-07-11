import React from 'react';
import { View, Text, ButtonText, Button,  AppRegistry, Image, ImageBackground, StyleSheet } from 'react-native';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation'; // Version can be specified in package.json

class CustomBlinkingTxt extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showText: true };
   
    setInterval(() => {
        this.setState(previousState => {
          return { showText: !previousState.showText };
        });
      },
    
      1000
    );
  }

render() {
    let display = this.state.showText ? this.props.text : ' ';
    return (
      <Text style={{ color: 'red'}}>{display}</Text>
    );
  }
}

const styles = StyleSheet.create({
  greetingText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
  },

  container: {
    paddingTop: 60,
    alignItems: 'center'
  },

 
});

class HomeScreen extends React.Component {
  render() {
    let pic = {
      url: 'https://media3.giphy.com/media/3ohhwNqFMnb7wZgNnq/giphy.gif'
    };
    return (
       <ImageBackground source={pic} style={{width: '100%', height: '100%'}}>

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style = {styles.greetingText}>Hello, World </Text>
            <CustomBlinkingTxt text="Journisha's App"/>

        <Button
          title="Press to Continue"
          onPress={() => {
            this.props.navigation.dispatch(StackActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({ routeName: 'Details' })
              ],
            }))
          }}
        />
      </View>
      </ImageBackground>
    );
  }  
}
  

class DetailsScreen extends React.Component {
   render() {
    return (
      <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
      </View>
    );
  }  
}


const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
  Details: {
    screen: DetailsScreen,
  },

}, {
    initialRouteName: 'Home',
});

export default createAppContainer(AppNavigator);