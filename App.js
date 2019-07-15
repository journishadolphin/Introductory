import React from 'react';
import { Animated, View, Text, ButtonText, Button,  AppRegistry, Image, ImageBackground, StyleSheet, TextInput, ActivityIndicator} from 'react-native';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation'; // Version can be specified in package.json

class FadeInView extends React.Component {
  state = {
    fadeAnim: new Animated.Value(0),  
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

  input: {
    height: 40,
    borderColor: 'gray', 
    borderWidth: 1, 
    width: 250,
    margin: 5
  },

   activityIndicator: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: 80
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
  this.state = {
    name: "",
    email: "",
    password: ""
  }
}
   render() {
    return (
  
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{fontSize: 30, textAlign: 'center', margin: 10, color: "black"}}>Sign Up </Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({name: text})}
          ref={ref => {this._nameInput = ref}}
          placeholder=" Full Name"
          autoFocus={true}
          autoCapitalize="words"
          autoCorrect={true}
          keyboardType="default"
          returnKeyType="next"
          onSubmitEditing={this._next}
          blurOnSubmit={false}
         />
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({email: text})}
          ref={ref => {this._nameInput = ref}}
          placeholder=" Email"
          autoFocus={true}
          autoCapitalize="words"
          autoCorrect={true}
          keyboardType="default"
          returnKeyType="next"
          onSubmitEditing={this._next}
          blurOnSubmit={false}
        />
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({password:text})}
          secureTextEntry={true}
          placeholder="  Password"
        />
        <Button
           onPress={() => {
            this.props.navigation.dispatch(StackActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({ routeName: 'Confirmation' })
              ],
            }))
          }}
          title="Submit"
          color="#841584"
        />
        
        <Button
          title="Go Back"
          onPress={() => {
            this.props.navigation.dispatch(StackActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({ routeName: 'Home' })
              ],
            }))
          }}
        />
        
           
      </View>
    );
  }  
}



//Confirmation Screen 

class ConScreen extends React.Component {
	constructor(){
		super()
		this.state= {
			showME: true
		}

	}
   
   componentWillMount()
   {
   	setTimeout(() => {
   	this.setState({
   		showME: false
 })
   	},
   		3000)
   }
   

	render() {
	
		return (
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			{
				this.state.showME ?
				<ActivityIndicator color = '#bc2b78' size = "large"/>
				:
				 <View>
					<FadeInView> 
						<Text> You're Signed Up! </Text> 
					</FadeInView>
				</View>


			}
			
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
  Confirmation: {
    screen: ConScreen,
  },


}, {
    initialRouteName: 'Home',
});

export default createAppContainer(AppNavigator);




