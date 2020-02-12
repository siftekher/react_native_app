import * as React from 'react';
import {View, Text, TextInput, AsyncStorage, Image} from 'react-native';
import { RadioButton, Button } from 'react-native-paper';
var utf8 = require('utf8');
var binaryToBase64 = require('binaryToBase64');

global.Buffer = global.Buffer || require('buffer').Buffer;

class Login extends React.Component {
 
  constructor(props) {
    super(props);
    this.state = { 
		password: '',
		email: '',
		password_state: '',
		email_state: '',
		language: '',
		languageObj: {}
	};
  }
  
  
  componentDidMount() {
//	  let encryptedCredentials = new Buffer("huani:myPassword").toString("base64");
//console.log(encryptedCredentials);
	  AsyncStorage.getItem('language')
        .then(value => {
          if(value == ""){
			  let languageObj = require('../../translation/english.json');
			  this.setState({ 'language': 'English', 'languageObj': languageObj });
		  }
		  
		  if(value == "English") {
		      let languageObj = require('../../translation/english.json');
              this.setState({ 'language': value, 'languageObj': languageObj });
		  }
		  
		  if(value == "Hindi") {
		      let languageObj = require('../../translation/hindi.json');
              this.setState({ 'language': value, 'languageObj': languageObj });
		  }
		  if(value == "Tamil") {
		      let languageObj = require('../../translation/tamil.json');
              this.setState({ 'language': value, 'languageObj': languageObj });
		  }
		  if(value == "Telegu") {
		      let languageObj = require('../../translation/telegu.json');
              this.setState({ 'language': value, 'languageObj': languageObj });
		  }
        });

	  // var text = 'huani:myPassword';
	  // var bytes = utf8.encode(text);
	  // var encoded = binaryToBase64(bytes);
	  // console.log(encoded);
  }

	verifyLength = (value, length) => {
		if (value.length >= length) {
			return true;
		}
		return false;
	};
	// function that verifies if value contains only numbers
	verifyNumber = value => {
		var numberRex = new RegExp("^[0-9]+$");
		if (numberRex.test(value)) {
			return true;
		}
		return false;
	};
	change = (event, stateName, type, stateNameEqualTo, maxValue) => {
		switch (type) {
			case "email":
				if (this.verifyEmail(event)) {
					this.setState({ [stateName + "_state"]: "Success" });
				} else {
					this.setState({ [stateName + "_state"]: "Error" });
				}
				break;
			case "length":
				if (this.verifyLength(event, stateNameEqualTo)) {
					this.setState({ [stateName + "_state"]: "Success" });
				} else {
					this.setState({ [stateName + "_state"]: "Error" });
				}

				break;
			case "number":
				if (this.verifyNumber(event, stateNameEqualTo)) {
					this.setState({ [stateName + "_state"]: "Success" });
				} else {
					this.setState({ [stateName + "_state"]: "Error" });
				}
				break;
			default:
				break;
		}
		this.setState({ [stateName]: event });
	};

	isValidate() {
		let return_flag = true;
		//Validation goes here
		if(this.state.email == "") {
			this.setState({ email_state: "Error" });
			return_flag = false;
		} else {
			this.setState({ email_state: "Success" });
		}
		if(this.state.password == "") {
			this.setState({ password_state: "Error" });
			return_flag = false;
		} else {
			this.setState({ password_state: "Success" });
		}

		return return_flag;
	}
  onPressButton = () => {
	  if(this.isValidate()) {
	  	  //login code here
		  let encryptedCredentials = new Buffer(this.state.email+":"+this.state.password).toString("base64");
		  fetch("http://api.saras.care/tokens", {
			  headers: {
				  Authorization: "Basic "+encryptedCredentials
			  },
			  method: "POST"
		  }).then(res => res.json())
			  .then(res => {
			  	var isLogin = res.hasOwnProperty('token');
			  	if(!isLogin){
					this.setState({ email_state: "Error" });
					this.setState({ password_state: "Error" });
				} else {
			  		alert("Login Successful...");
				}
			  })
			  .catch(error => {
				  console.log("Error from server :- \n", error);
			  });
	  }
  }

  render() {
    const { checked } = this.state;

    return (
	
      <View>
		  <View style={{ marginTop: 10, marginLeft: 65, marginBottom: 20 }}>
			  <Image source={require('../../assets/sarascare-logo.png')} style={{ width: 220, height: 100 }} />
		  </View>
         <View style={{ marginBottom: 5, marginLeft:5, marginRight:5 }}>
			  <TextInput
				  style={this.state.email_state == 'Error' ?
					 { paddingLeft:5, backgroundColor: 'white', borderRadius: 10, borderWidth: 1, borderColor: 'red', height:40}
				   : { paddingLeft:5, backgroundColor: 'white', borderRadius: 10, borderWidth: 1, borderColor: '#3931AA', height:40}}
			      placeholder={this.state.languageObj["register.email"] || ''}
				  // style={{height: 40, borderColor: 'gray', borderWidth: 1}}
				  // onChangeText={(value) => this.setState({email: value})}
				  onChangeText={e => this.change(e, "email", "length", 1)}
				  value={this.state.email}
			  />
		 </View>
		 <View style={{ marginBottom: 5, marginLeft:5, marginRight:5 }}>
			<TextInput
				style={this.state.password_state == 'Error' ?
					{ paddingLeft:5, backgroundColor: 'white', borderRadius: 10, borderWidth: 1, borderColor: 'red', height:40}
					: { paddingLeft:5, backgroundColor: 'white', borderRadius: 10, borderWidth: 1, borderColor: '#3931AA', height:40}}
				placeholder={this.state.languageObj["register.password"] || ''}
			    // style={{height: 40, borderColor: 'gray', borderWidth: 1}}
			    // onChangeText={(value) => this.setState({password: value})}
				onChangeText={e => this.change(e, "password", "length", 1)}
				value={this.state.password}
				secureTextEntry={true}
			/>
		</View>
        <View style={{ marginBottom: 5, marginLeft:5, marginRight:5 }}>
	  	  {/*<Button*/}
          {/*  onPress={this.onPressButton}*/}
          {/*  title={this.state.languageObj["login"] || ''}*/}
          {/*  color="#841584"*/}
          {/*/>*/}
		  <Button mode="contained"
		    style={{ borderRadius: 15, borderWidth: 1, borderColor: '#3931AA', height:45}}
		     onPress={this.onPressButton}> {this.state.languageObj["login"] || ''}
		  </Button>
		</View>
      </View>
    );
  }
}

export default Login;