import React from 'react';
import { Animated, View, Text, ButtonText, Button,  AppRegistry, Image, ImageBackground, StyleSheet,  TextInput} from 'react-native';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation'; // Version can be specified in package.json

class FadeInView extends React.Component {
  state = {
    fadeAnim: new Animated.Value(0),  // Initial value for opacity: 0
  }

  componentDidMount() {
    Animated.timing(                  // Animate over time
      this.state.fadeAnim,            // The animated value to drive
      {
        toValue: 1,                   // Animate to opacity: 1 (opaque)
        duration: 8000,              // Make it take a while
      }
    ).start();                        // Starts the animation
  }

  render() {
    let { fadeAnim } = this.state;

    return (
      <Animated.View                 // Special animatable View
        style={{
          ...this.props.style,
          opacity: fadeAnim,         // Bind opacity to animated value
        }}
      >
        {this.props.children}
      </Animated.View>
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

  buttonContainer: {
    margin: 20
  },
  
  alternativeLayoutButtonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
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
        <FadeInView style={{width: 250, height: 60, backgroundColor: 'powderblue'}}>
          <Text style={{fontSize: 30, textAlign: 'center', margin: 10}}>Hello, World </Text>
        </FadeInView>

          

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
   constructor(props) {
    super(props);
    this.state = {text: ''};
  }
render() {
    return (
       <View style={{padding: 10}}>
        <TextInput
          style={{height: 40}}
          placeholder="Type here to translate!"
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
  
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





