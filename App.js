import React from 'react';
import { Animated, View, Text, ButtonText, Button,  AppRegistry, Image, ImageBackground, StyleSheet,  TextInput} from 'react-native';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation'; // Version can be specified in package.json


//Hello World Animation 
class FadeInView extends React.Component {
  state = {
    fadeAnim: new Animated.Value(0),  
  }

  componentDidMount() {
    Animated.timing(                  
      this.state.fadeAnim,            
      {
        toValue: 1,                   
        duration: 8000,              
      }
    ).start();                      
  }

  render() {
    let { fadeAnim } = this.state;

    return (
      <Animated.View                
        style={{
          ...this.props.style,
          opacity: fadeAnim,         
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}
//End of Hello World Animation 


//Styles 
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
//End of Styles 


//HomeScreen 
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
//End of HomeScreen 

//Second page (aka DetailsPage)
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
//End of Second page 

//HomePage and DetailsPage Directory
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





