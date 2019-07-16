import React from 'react';
import { Animated, View, Text, ButtonText, Button,  AppRegistry, Image, ImageBackground, StyleSheet, TextInput, ActivityIndicator, TouchableOpacity} from 'react-native';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation'; // Version can be specified in package.json


//Text Fade in Animation 
class FadeInView extends React.Component {
  state = {
    fadeAnim: new Animated.Value(0),  
  }

  componentDidMount() {
    Animated.timing(                  
      this.state.fadeAnim,            
      {
        toValue: 1,
        duration: 6000,              
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
// End of Text Fade in Animation 


//StyleSheets
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

    button: {
    marginTop: 20,
    marginBottom: 10,
    width: 260,
    alignItems: 'center',
    backgroundColor: '#2196F3'
  },

  buttonText: {
    padding: 10,
    color: 'white'
  },

 
});
//End of StyleSheets


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
          <Text style={{fontFamily: 'Al Nile', fontSize: 30, textAlign: 'center', margin: 10}}>Hello, World </Text>
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


//Details Page (aka Sign Up Screen)
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
      <View style={{width: 250, height: 60, marginBottom: 50, backgroundColor: 'powderblue'}}>
          <Text style={{fontSize: 30, textAlign: 'center', margin: 10}}>Hello, World </Text>
      </View>
      <Text style={{fontSize: 25, textAlign: 'center', margin: 10, color: "black"}}>Sign Up </Text>
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

         <TouchableOpacity 
          onPress={() => {
            this.props.navigation.dispatch(StackActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({ routeName: 'signConfirmation' })
              ],
            }))
          }}
          >
        <View style={styles.button}>
            <Text style={styles.buttonText}>Submit</Text>
          </View>
        </TouchableOpacity>
      

        
        <Text> 
        <Text> Already signed up? Click </Text>
		<Text style = {{color: "blue",}}
          onPress={() => {
            this.props.navigation.dispatch(StackActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({ routeName: 'Login' })
              ],
            }))
          }}
          >
          Here
        </Text>





        </Text>    

        
           
      </View>
    );
  }  
}
//End of Details Page 


// Sign up Confirmation Screen 
class signConScreen extends React.Component {
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
   		2000)
   }
   

	render() {
	
		return (
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			{
				this.state.showME ?
				<ActivityIndicator color = 'steelblue' size = "large"/>
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
//End of Confirmation Screen 

//Login Screen
class LoginScreen extends React.Component {
  constructor(props) {
  super(props);
  this.state = {
    email: "",
    password: ""
  }
}
   render() {
    return (
  
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{fontSize: 30, textAlign: 'center', margin: 10, color: "black"}}>Login</Text>
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
                NavigationActions.navigate({ routeName: 'logConfirmation' })
              ],
            }))
          }}
          title="Submit"
          color="#841584"
        />   
        
           
      </View>
    );
  }  
}
//End of Login Screen


// Login Confirmation Screen  
class logConScreen extends React.Component {
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
   		2000)
   }
   

	render() {
	
		return (
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			{
				this.state.showME ?
				<ActivityIndicator color = 'steelblue' size = "large"/>
				:
				 <View>
					<FadeInView> 
						<Text> You're Logged in! </Text> 
					</FadeInView>
				</View>


			}
			
               </View>
              
			
			);
	}
}
// End of Login Confirmation Screen 

//Screen Navigator constants 
const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
  Details: {
    screen: DetailsScreen,
  },
  signConfirmation: {
    screen: signConScreen,
  },
  Login: {
  	screen: LoginScreen,
  },
  logConfirmation: {
  	screen: logConScreen,
  }

}, {
    initialRouteName: 'Home',
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
	}
});

export default createAppContainer(AppNavigator);

//End of Screen Navigator Constants 


