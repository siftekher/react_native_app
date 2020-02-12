import * as React from 'react';
import {View, Text, TextInput, AsyncStorage, Image} from 'react-native';
import { RadioButton, Button } from 'react-native-paper';
class Signup extends React.Component {
 
  constructor(props) {
    super(props);
    this.state = { 
		password: '',
		email: '',
		languageObj: {}
	};
  }
  
    componentDidMount = () => {
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
        })
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
	  console.log("Signup Pressed");
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
				  onChangeText={(value) => this.setState({email: value})}
				  value={this.state.email}
				  placeholder={this.state.languageObj["email"] || ''}
			  />
		 </View>
		 <View style={{ marginBottom: 5, marginLeft:5, marginRight:5 }}>
			<TextInput
				style={this.state.email_state == 'Error' ?
					{ paddingLeft:5, backgroundColor: 'white', borderRadius: 10, borderWidth: 1, borderColor: 'red', height:40}
					: { paddingLeft:5, backgroundColor: 'white', borderRadius: 10, borderWidth: 1, borderColor: '#3931AA', height:40}}
			    onChangeText={(value) => this.setState({password: value})}
			    value={this.state.password}
			/>
		</View>
        <View style={{ marginBottom: 5, marginLeft:5, marginRight:5 }}>
	  	  {/*<Button*/}
          {/*  onPress={this.onPressButton}*/}
          {/*  title={this.state.languageObj["signup"] || ''}*/}
          {/*  color="#841584"*/}
          {/*/>*/}
			<Button mode="contained"
					style={{ borderRadius: 15, borderWidth: 1, borderColor: '#3931AA', height:45}}
					onPress={this.onPressButton}> {this.state.languageObj["submit"] || ''}
			</Button>
		</View>
      </View>
    );
  }
}

export default Signup;