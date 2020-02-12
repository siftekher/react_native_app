import * as React from 'react';
import { View, Text, TextInput, AsyncStorage, Image, Linking } from 'react-native';
import { Button } from 'react-native-paper';
import { Dropdown } from 'react-native-material-dropdown';

class Home extends React.Component {
 
  constructor(props) {
    super(props);
    this.state = { 
	    offender_name: '',
		language: 'English',
		languageObj: {},
		data : [{
		     label: 'English', value: 'English',
		  }, {
		     label: 'भाषा',   value: 'Hindi',
		  }, {
		     label: 'மொழி',   value: 'Tamil',
		  }, {
		     label: 'భాష',   value: 'Telegu',
		  }
		  ]
	};
  }

  componentDidMount = async () => {
  	  let storeLanguage  = await AsyncStorage.getItem('language');
	  if(storeLanguage == "English") {
		  let languageObj = require('../../translation/english.json');
		  this.setState({ 'language': storeLanguage, 'languageObj': languageObj });
	  }
	  else if(storeLanguage == "Hindi") {
		  let languageObj = require('../../translation/hindi.json');
		  this.setState({ 'language': storeLanguage, 'languageObj': languageObj });
	  }
	  else if(storeLanguage == "Tamil") {
		  let languageObj = require('../../translation/tamil.json');
		  this.setState({ 'language': storeLanguage, 'languageObj': languageObj });
	  }
	  else if(storeLanguage == "Telegu") {
		  let languageObj = require('../../translation/telegu.json');
		  this.setState({ 'language': storeLanguage, 'languageObj': languageObj });
	  }
	  else {
		  let languageObj = require('../../translation/english.json');
		  this.setState({ 'language': storeLanguage, 'languageObj': languageObj });
	  }
  }

   setLanguageName = (value) => {
      AsyncStorage.setItem('language', value.value);
      this.setState({ 'language': value.value });
	  
		  if(value.value == "English") {
		      let languageObj = require('../../translation/english.json');
              this.setState({ 'language': value.value, 'languageObj': languageObj });
		  }
		  else if(value.value == "Hindi") {
		      let languageObj = require('../../translation/hindi.json');
              this.setState({ 'language': value.value, 'languageObj': languageObj });
		  }	
		  else if(value.value == "Tamil") {
		      let languageObj = require('../../translation/tamil.json');
              this.setState({ 'language': value.value, 'languageObj': languageObj });
		  }
		  else if(value.value == "Telegu") {
		      let languageObj = require('../../translation/telegu.json');
              this.setState({ 'language': value.value, 'languageObj': languageObj });
		  } else {
			  let languageObj = require('../../translation/english.json');
			  this.setState({ 'language': "English", 'languageObj': languageObj });
		  }
	  
   }

  render() {
    const { checked } = this.state;
	
	if(this.state.languageObj == null) return (<View></View>);
	
	let title = '';
	if(this.state.languageObj["language"] != 'undefined')
		title = this.state.languageObj["language"];

    return (

	    <View style={{ backgroundColor: '#3931AA', flex: 1 }}>
		<View style={{ marginTop: '10%', justifyContent: 'center', alignItems: 'center' }}>
		    <Image source={require('../../assets/sarascare-logo.png')} style={{ width: 220, height: 100 }} />

			<View style={{ marginBottom: 100, marginTop: 5, borderRadius: 10, borderWidth: 1, borderColor: '#3931AA', overflow: 'hidden', width: 220, backgroundColor: '#706AC0', paddingLeft:'3%', height: 50 }}>
				<Dropdown
					labelHeight={20}
					labelPadding={-5}
					style={{color: 'white', backgroundColor: '#706AC0'}}
					placeholder={this.state.languageObj["language"] || ''}
					value={this.state.language}
					data={this.state.data}
					onChangeText={(value) => this.setLanguageName({value})}
				/>
			</View>
		</View>
            {/*<View style={{ marginBottom: 100, marginLeft: 70, marginTop: 5, borderRadius: 10, borderWidth: 1, borderColor: '#3931AA', overflow: 'hidden', width: 220, backgroundColor: '#706AC0' }}>*/}
            {/*</View>*/}
            <View style={{flexDirection: 'row', marginLeft:2, marginRight:2, marginBottom:5}}>
			    <View style={{width: '96%',height: 50,  borderWidth: 1, marginLeft: '2%',
					borderBottomLeftRadius: 20,borderBottomRightRadius: 20,borderTopLeftRadius: 20,borderTopRightRadius: 20, borderRadius: 20, overflow: 'hidden'}}>
                    {/*<Button mode="contained" borderRadius: 10, borderColor: '#3931AA',*/}
                    {/*onPress={() => this.props.navigation.navigate('AllSteps')} >{this.state.languageObj["offense"]}</Button>*/}
					<Text
						onPress={() => this.props.navigation.navigate('AllSteps')}
						style={{paddingTop: 5,textAlignVertical: "center", textAlign: 'center', height:50, backgroundColor: '#E4344B',
							color:'white', fontSize:20, fontWeight: 'bold' }}
					> {this.state.languageObj["offense"]} </Text>
				</View>
            </View>
            <View style={{flexDirection: 'row', marginLeft: 2, marginRight:2, paddingBottom:150, marginTop:'1%',}}>
			   <View style={{width: '47%',height: 40, backgroundColor: '#3931AA', marginLeft: '2%'}}>
                 {/*<Button mode="contained" */}

				 {/*onPress={() => this.props.navigation.navigate('Login')}*/}
				 {/*>{this.state.languageObj["login"]} </Button>*/}
				 <Text
				   // onPress={() => this.props.navigation.navigate('Login')}
				   onPress={ ()=> Linking.openURL('https://app.saras.care/') }
				   style={{paddingTop: 5,textAlignVertical: "center", textAlign: 'center',backgroundColor: '#3931AA', borderRadius: 10, borderWidth: 1, borderColor: 'white', height: 40, fontSize:16, fontWeight: 'bold', color:'white'}}
				 > {this.state.languageObj["login"]}
				 </Text>
               </View>
               <View style={{ width: '47%',height: 40, marginLeft: '2%'}}>
                 {/*<Button mode="contained" */}
				 {/*onPress={() => this.props.navigation.navigate('Signup')}*/}
				 {/*>{this.state.languageObj["signup"]} </Button>*/}
				 <Text
				   // onPress={() => this.props.navigation.navigate('Signup')}
				   onPress={ ()=> Linking.openURL('https://app.saras.care/') }
                   style={{paddingTop: 5,textAlignVertical: "center", textAlign: 'center',backgroundColor: '#3931AA', borderRadius: 10, borderWidth: 1, borderColor: 'white', height: 40, fontSize:16, fontWeight: 'bold', color:'white'}}
				 >{this.state.languageObj["signup"]}</Text>
               </View>
			</View>  
        </View>
    );
  }
}

export default Home;