import * as React from 'react';
import {View, Text, AsyncStorage, TextInput, Image, TouchableHighlight, ScrollView, Picker  } from 'react-native';
import { RadioButton, Button  } from 'react-native-paper';
//import RadioGroup from 'react-native-radio-buttons-group';
// import DateTimePicker from "react-native-modal-datetime-picker";
import { Dropdown } from 'react-native-material-dropdown';
import DatePicker from 'react-native-datepicker';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from "expo-permissions";
import CheckBox from 'react-native-check-box'
const statesAndDistrict = require('../../assets/statesAndDistricts');
var moment = require("moment");
const axios = require('axios');

class AllSteps extends React.Component {
 
  constructor(props) {
    super(props);
    this.state = { 
	    viewSection : 'step1',
		
		name: '',
		phone: '',
		email: '',
        name_state: true,
        phone_state: true,
        email_state: true,
        checked: 'witness',
		
	    victim_name: '',
		offender_name: '',
		location: '',
		description: '',
        annomus : false,
		
		data: [
            {
                label: 'witness',
				value: 2,
            },
            {
                label: 'victim',
                value: 2,
            },
        ],
		
		offense_type: '',
		offense_type_value: 'Dowry',
		
		isTimePickerVisible: false,
		victim_date: '',
        victim_date_state: '',
		victim_time: '',
		witness_state: 'contained',
		victime_state: 'outlined',
		annomus_state: true,
		languageObj: {},
        showResults: false,
        posting_data: 0,

        date_state: true,
        victim_name_state: true,
        offender_name_state: true,
        location_state: true,
        description_state: true,
        offense_type_array: {},
        offense_option: {},
        descriptionMargin: 10,
        postcodeMargin: 10,
        allStates : [],
        text: '',
        height: 25,
        filePath: {},
        postalState: "",
        city: "",
        postal_state: true,
        city_state: true
        // postalState: '',
        // postalDistrict: ''
	};
  }
  
  componentDidMount = async () => {
      // console.log(statesAndDistrict.statesAndDistricts.states[0]);

      // const allStates = statesAndDistrict.statesAndDistricts.states.map((item,index) => {
      //     return <Picker.Item key={index} value={item.state} label={item.state} />
      // });
      // this.setState({ allStates: allStates });

      const allStates = statesAndDistrict.statesAndDistricts.states
          .map(item => ({
              label: item.state, value: item.state
          }));
      this.setState({ allStates: allStates });


      fetch("http://api.saras.care/offense-types")
        .then(res => res.json())
        .then(res => {
            // console.log(res);
		    const offense_types_options = res
               .map(item => ({
                   label: item.description, value: item.description
            }));

			this.setState({ offense_type: offense_types_options });
            this.setState({ offense_type_array: res });
            //this.setState({ offense_option: offense_option });
       })
      .catch(error => {
          console.log("Error from server :- \n", error);
      });

      let value = await AsyncStorage.getItem('language');

      if(value == ""){
		 let languageObj = require('../../translation/english.json');
		 this.setState({ 'language': 'English', 'languageObj': languageObj });
	  }
      else if(value == "English") {
	     let languageObj = require('../../translation/english.json');
         this.setState({ 'language': value, 'languageObj': languageObj });
      }
	  else if(value == "Hindi") {
		 let languageObj = require('../../translation/hindi.json');
         this.setState({ 'language': value, 'languageObj': languageObj });
	  }
	  else if(value == "Tamil") {
		 let languageObj = require('../../translation/tamil.json');
         this.setState({ 'language': value, 'languageObj': languageObj });
	  }
	  else if(value == "Telegu") {
		 let languageObj = require('../../translation/telegu.json');
         this.setState({ 'language': value, 'languageObj': languageObj });
	  }


  }

  
  verifyEmail(value) {
    var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(value)) {
      return true;
    }
    return false;
  }
  
  verifyLength(value, length) {
    if (value.length >= length) {
      return true;
    }
    return false;
  }
  
  showDatePicker = () => {
    this.setState({ isDatePickerVisible: true });
  };
 
  hideDatePicker = () => {
    this.setState({ isDatePickerVisible: false });
  };
 
  handleDatePicked = date => {
      console.log("A date has been picked: ", moment(date).format("DD/MM/YYYY  HH:mm"));
	  this.setState({
          victim_date: moment(date).format("DD/MM/YYYY HH:mm"),
          date_state: true,
          victim_date_state: moment(date).format("YYYY-MM-DD HH:mm")
	  });
      this.hideDatePicker();
  };
  
  handleTimePicked = time => {
	console.log("A time has been picked: ", moment(time).format("HH:mm"));
	this.setState({ victim_time: moment(time).format("HH:mm") });
    this.hideTimePicker();
  }
  
  showTimePicker = () => {
    this.setState({ isTimePickerVisible: true });
  };
  
  hideTimePicker = () => {
    this.setState({ isTimePickerVisible: false });
  };
  
  setWitness = () => {
	  this.setState({ witness_state: 'contained', victim_state: 'outlined' });
  }
  
  setVictim = () => {
	  this.setState({ witness_state: 'outlined', victim_state: 'contained' });
  }
  
  setAnnomus = () => { 
      this.setState({ annomus: !this.state.annomus, annomus_state: !this.state.annomus_state }); 
	  if(!this.state.annomus) {
          this.setState({ name_state: true, phone_state: true, email_state: true });
      }
  }

    descriptionBlur = () => {
        this.setState({
            descriptionMargin: 10
        })
    }

    descriptionFocus = () => {
        this.setState({
            descriptionMargin: 250
        })
    }

    postcodeBlur = () => {
        this.setState({
            // postcodeMargin: 10
            descriptionMargin: 0
        })
    }

    postcodeFocus = () => {
        this.setState({
            // postcodeMargin: 10
            descriptionMargin: 250
        })
    }

    onStateChange=(value, index)=>{
      // console.log(value);
        this.setState({ postalState: value, city: '' });


        const tmp = statesAndDistrict.statesAndDistricts.states
            .filter(book => book.state === value)
            .map((item,index) => {
            return item.districts
        });
        // console.log(tmp[0].length);
        const allStates = statesAndDistrict.statesAndDistricts.states
            .map(item => ({
                label: item.state, value: item.state
            }));
        const postalDistrict = tmp[0]
            .map((item,index) => ({
                // return <Picker.Item key={index} value={item} label={item} />
                label: item, value: item
            }));
        this.setState({ postalDistrict: postalDistrict });
    };
  
  onPress = data => this.setState({ data });
  
  onChangeHandler = (value) => {
     // console.log(`Selected value: ${value}`);
  }
    onTextChange(event) {
        const { contentSize, text } = event.nativeEvent;

        this.setState({
            text: text,
            height: contentSize.height > 100 ? 100 : contentSize.height
        });
    }
  renderStep1(){
    if(this.state.offense_type.length == 0 ) return ( <View></View>);

    if(this.state.viewSection == 'step1') {
        return (
		<View>
            <ScrollView>
           <View style={{ flexDirection: 'row', marginBottom: 10 }}>
              <View style={{width: '49%',height: 80,borderBottomLeftRadius: 20,borderBottomRightRadius: 20,borderTopLeftRadius: 20,borderTopRightRadius: 20, borderRadius: 20, overflow: 'hidden'}}>
                 {/*<Button */}
                 {/*    mode={this.state.witness_state}*/}
                 {/*    onPress={this.setWitness}*/}
	             {/*> {this.state.languageObj["victim"] || ''} </Button>*/}
                  <Text
                      onPress={this.setWitness}
                      style={this.state.victim_state == 'contained' ? { textAlignVertical: "center",textAlign: 'center',backgroundColor: 'white', borderRadius: 20, borderWidth: 1, borderColor: '#3931AA', height: 80, fontSize:20, fontWeight: 'bold', color:'#3931AA'}
                          :{textAlignVertical: "center", textAlign: 'center',backgroundColor: '#3931AA', borderRadius: 20, borderWidth: 1, borderColor: 'white', height: 80, fontSize:20, fontWeight: 'bold', color:'white'}}
                  > {this.state.languageObj["victim"] || ''}
                  </Text>
              </View>
              <View style={{width: '49%',height: 80, marginLeft: '1%',borderBottomLeftRadius: 20,borderBottomRightRadius: 20,borderTopLeftRadius: 20,borderTopRightRadius: 20, borderRadius: 20, overflow: 'hidden'}}>
                 {/*<Button*/}
				 {/*    icon="camera"*/}
                 {/* size={20}*/}
                 {/*    mode={this.state.victim_state}*/}
                 {/*    onPress={this.setVictim}*/}
                 {/*> {this.state.languageObj["witness"] || ''} </Button>*/}

                  <Text
                      onPress={this.setVictim}
                      style={this.state.witness_state == 'contained' ? {textAlignVertical: "center", textAlign: 'center',backgroundColor: 'white', borderRadius: 20, borderWidth: 1, borderColor: '#3931AA', height: 80, fontSize:20, fontWeight: 'bold', color:'#3931AA'}
                          : {textAlignVertical: "center", textAlign: 'center',backgroundColor: '#3931AA', borderRadius: 20, borderWidth: 1, borderColor: 'black', height: 80, fontSize:20, fontWeight: 'bold', color:'white'}}
                  > {this.state.languageObj["witness"] || ''}
                  </Text>
              </View>
          </View>


	      <View>
          <View style={{ marginBottom: 10 }}>
		      <TextInput
                 style={ this.state.name_state == false && this.state.annomus_state
                     ? { paddingLeft:5, backgroundColor: 'white', borderRadius: 10, borderWidth: 1, borderColor: 'red', height:40}
                     : { paddingLeft:5, backgroundColor: 'white', borderRadius: 10, borderWidth: 1, borderColor: '#3931AA', height:40}
                 }
		         // error={this.state.name == '' && this.state.annomus_state}
                 value={this.state.name}
                 onChangeText={(value) => this.setState({name: value, name_state: true})}
                 editable={!this.state.annomus}
				 placeholder={this.state.languageObj["name"] || ''}
              />
              {this.state.name_state == false &&
                 <Text style={{color:'red'}}>{this.state.languageObj["required_field"] || ''}</Text>
              }
          </View>
		  <View style={{ marginBottom: 10 }}>
              <TextInput
                 style={ this.state.phone_state == false && this.state.annomus_state
                     ? { paddingLeft:5, backgroundColor: 'white', borderRadius: 10, borderWidth: 1, borderColor: 'red', height:40}
                     : { paddingLeft:5, backgroundColor: 'white', borderRadius: 10, borderWidth: 1, borderColor: '#3931AA', height:40}
                 }
                 placeholder={this.state.languageObj["phone"] || ''}
                 value={this.state.phone}
                 editable={!this.state.annomus}
                 onChangeText={(value) => this.setState({phone: value, phone_state: true})}
              />
              {this.state.phone_state == false &&
                  <Text style={{color:'red'}}>{this.state.languageObj["required_field"] || ''}</Text>
              }
		  </View>
		  <View style={{ marginBottom: 10 }}>
	          <TextInput
                 style={ this.state.email_state == false && this.state.annomus_state
                     ? { paddingLeft:5, backgroundColor: 'white', borderRadius: 10, borderWidth: 1, borderColor: 'red', height:40}
                     : { paddingLeft:5, backgroundColor: 'white', borderRadius: 10, borderWidth: 1, borderColor: '#3931AA', height:40}
                 }
                 placeholder={this.state.languageObj["email"] || ''}
                 onChangeText={(value) => this.setState({email: value, email_state: true})}
                 value={this.state.email}
                 editable={!this.state.annomus}
		         // error={this.state.email == '' && this.state.annomus_state}
              />
              {this.state.email_state == false &&
              <Text style={{color:'red'}}>{this.state.languageObj["required_field"] || ''}</Text>
              }
			  </View>
			  <View style={{ flexDirection: 'row' }}>
                 <View style={{width: '10%',height: 40, marginTop: 7}}>
                     {/*<View style={{width: 20, height: 30}}>*/}
                     {/*    <CheckBox*/}

                     {/*        status={this.state.annomus ? 'checked' : 'unchecked'}*/}
                     {/*        onPress={this.setAnnomus}*/}
                     {/*    />*/}

                     {/*<CheckBox*/}
                     {/*    value={this.state.checkBoxChecked[val.id]}*/}
                     {/*/>*/}
                     <CheckBox
                         style={{flex: 1}}
                         onClick={this.setAnnomus}
                         isChecked={this.state.annomus}

                     />
                     {/*</View>*/}

			     </View>
			  <View style={{width: '85%',height: 40, marginTop: 7}}>
	             <Text>{this.state.languageObj["prefer"] || ''}</Text>
			  </View>
			  </View>

              <View style={{ marginBottom: 10 }}>
              <Button mode="contained"
                      style={{ borderRadius: 15, borderWidth: 1, borderColor: '#3931AA', height:45}}
                      onPress={this.gotoStep11}> {this.state.languageObj["next"] || ''} >> </Button>
              </View>
           {/*</View>*/}
          </View>
            </ScrollView>
		 </View>
        )
    }
  }

    renderStep11(){
        // if(this.state.offense_type.length == 0 ) return ( <View></View>);

        if(this.state.viewSection == 'step11') {
            return (
                <View>
                    <ScrollView>
                        <View>
                            <View style={{borderRadius: 10, borderWidth: 1, borderColor: '#3931AA', height:53, marginBottom: 10, width: '100%',paddingLeft:'2%',paddingBottom:'5%'}}>
                                <Dropdown
                                    labelHeight={20}
                                    labelPadding={-5}
                                    placeholder='Offense Type'
                                    // style={{height:40}}
                                    value={this.state.offense_type_value}
                                    data={this.state.offense_type}
                                    onChangeText={(value) => this.setState({offense_type_value: value})}
                                />
                            </View>

                            <View style={{ marginBottom: this.state.descriptionMargin }}>
                                <View style={{ marginBottom: 10 }}>
                                    <TextInput
                                        multiline={true}
                                        numberOfLines={6}
                                        style={ { paddingLeft:5, backgroundColor: 'white', borderRadius: 10, borderWidth: 1, borderColor: '#3931AA', height:100, fontSize: 16} }
                                        value={this.state.description}
                                        onChangeText={(value) => this.setState({description: value, description_state: true})}
                                        placeholder={this.state.languageObj["description"] || ''}
                                        onBlur={ () => this.descriptionBlur() }
                                        onFocus={ () => this.descriptionFocus() }
                                    />

                                </View>

                                <View>
                                    {this.state.postal_state == false &&
                                    <Text style={{color:'red'}}>{this.state.languageObj["required_field"] || ''}</Text>
                                    }
                                </View>
                                <View style={ this.state.postal_state == false ? {borderRadius: 10, borderWidth: 1, borderColor: 'red', height:53, marginBottom: 10}
                                    : {borderRadius: 10, borderWidth: 1, borderColor: '#3931AA', height:53, marginBottom: 10}}>
                                    <Dropdown
                                        labelHeight={20}
                                        labelPadding={-5}
                                        placeholder={this.state.languageObj["state"] || ''}
                                        // style={{height:40}}
                                        value={this.state.postalState}
                                        data={this.state.allStates}
                                        // onChangeText={(value) => this.setState({offense_type_value: value})}
                                        onChangeText={this.onStateChange}
                                    />
                                </View>


                                <View>
                                    {this.state.city_state == false &&
                                    <Text style={{color:'red'}}>{this.state.languageObj["required_field"] || ''}</Text>
                                    }
                                </View>
                                <View style={this.state.city_state == false ? {borderRadius: 10, borderWidth: 1, borderColor: 'red', height:53, marginBottom: 10}
                                    : {borderRadius: 10, borderWidth: 1, borderColor: '#3931AA', height:53, marginBottom: 10}}>
                                    <Dropdown
                                        labelHeight={20}
                                        labelPadding={-5}
                                        placeholder={this.state.languageObj["city"] || ''}
                                        // style={{height:40}}
                                        value={this.state.city}
                                        data={this.state.postalDistrict}
                                        onChangeText={(value) => this.setState({city: value})}
                                    />
                                </View>


                                <View style={{ marginBottom: this.state.postcodeMargin }}>
                                    <TextInput
                                        style={ { paddingLeft:5, backgroundColor: 'white', borderRadius: 10, borderWidth: 1, borderColor: '#3931AA', height:40, fontSize: 16} }
                                        value={this.state.postcode}
                                        onChangeText={(value) => this.setState({postcode: value})}
                                        placeholder={this.state.languageObj["postcode"] || ''}
                                        onBlur={ () => this.postcodeBlur() }
                                        onFocus={ () => this.postcodeFocus() }
                                    />
                                </View>

                                <View style={{ marginBottom: 10 }}>
                                    <Button mode="contained"
                                            style={{ borderRadius: 15, borderWidth: 1, borderColor: '#3931AA', height:45}}
                                            onPress={this.gotoStep2}> {this.state.languageObj["next"] || ''} >> </Button>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            )
        }
    }

    selectPicture = async () => {
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
        const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
            aspect: 1,
            allowsEditing: true,
        });
        if (!cancelled) this.setState({ image: uri });
    };

    takePicture = async () => {
        await Permissions.askAsync(Permissions.CAMERA);
        const { cancelled, uri } = await ImagePicker.launchCameraAsync({
            allowsEditing: false,
        });
        this.setState({ image: uri });
    };

  renderStep2(){
      var d = new Date();
      var minDate = new Date(new Date().setFullYear(new Date().getFullYear() - 1));
    if(this.state.viewSection == 'step2') {
        return (
        <View style={{flex:1}}>
            <ScrollView>
	    <View style={{flexDirection: 'row', marginBottom: 10 }}>
		  <View style={{width: '100%', marginTop:3 }}>

              {/*<DateTimePicker*/}
              {/*    isVisible={this.state.isDatePickerVisible}*/}
              {/*    onConfirm={this.handleDatePicked}*/}
              {/*    onCancel={this.hideDatePicker}*/}
              {/*    mode={'datetime'}*/}
              {/*    maximumDate={d}*/}
              {/*    minimumDate={minDate}*/}
              {/*/>*/}
              {/*{this.state.date_state == false &&*/}
              {/*<Text style={{color:'red'}}>{this.state.languageObj["required_field"] || ''}</Text>*/}
              {/*}*/}

              <DatePicker
                  style={{width: '100%'}}
                  date={this.state.victim_date}
                  mode="datetime"
                  placeholder={this.state.languageObj["select_date"] || ''}
                  format="YYYY-MM-DD HH:mm"
                  // minDate="2016-05-01"
                  // maxDate="2019-10-01"
                  maxDate={d}
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                      dateIcon: {
                          position: 'relative',
                          left: 0,
                          top: 4,
                          marginLeft: 0
                      },
                      dateInput: {
                          marginLeft: 0,
                          borderRadius: 10, borderWidth: 1, borderColor: '#3931AA'
                      }
                      // ... You can check the source to find the other keys.
                  }}
                  onDateChange={(date) => {this.setState({victim_date: date})}}
              />
		  </View>
		  {/*<View style={{width: '10%',height: 40, marginLeft: 5}} >*/}

		  {/*   /!*<Button mode="contained" onPress={this.showDatePicker} > {this.state.languageObj["pick"] || ''} </Button>*!/*/}
          {/*    <TouchableHighlight onPress={() => this.showDatePicker()}>*/}
          {/*    <Image source={require('../../assets/calendar.png')} style={{ width: 50, height: 40 }} />*/}
          {/*    </TouchableHighlight>*/}
		  {/*</View>*/}
		  </View>

            {this.state.witness_state == 'outlined' &&
            <View style={{marginBottom: 10}}>
                <TextInput
                    style={ this.state.victim_name_state == false
                        ? { paddingLeft: 5, backgroundColor: 'white', borderRadius: 10, borderWidth: 1, borderColor: 'red', height: 40 }
                        : { paddingLeft: 5, backgroundColor: 'white', borderRadius: 10, borderWidth: 1, borderColor: '#3931AA', height: 40 }}
                    placeholder={this.state.languageObj["victim_name"] || ''}
                    onChangeText={(value) => this.setState({victim_name: value, victim_name_state: true})}
                    value={this.state.victim_name}
                    error={this.state.victim_name == ''}
                />
                {/*{this.state.victim_name_state == false &&*/}
                {/*<Text style={{color:'red'}}>{this.state.languageObj["required_field"] || ''}</Text>*/}
                {/*}*/}
            </View>
            }
		 <View style={{ marginBottom: 10 }}>
             <TextInput
                 style={ this.state.offender_name_state == false
                     ? { paddingLeft:5, backgroundColor: 'white', borderRadius: 10, borderWidth: 1, borderColor: 'red', height:40}
                     : { paddingLeft:5, backgroundColor: 'white', borderRadius: 10, borderWidth: 1, borderColor: '#3931AA', height:40}}
                 placeholder={this.state.languageObj["offender_name"] || ''}
                 onChangeText={(value) => this.setState({offender_name: value, offender_name_state: true})}
                 value={this.state.offender_name}
                 error={this.state.offender_name == ''}
             />
             {/*{this.state.offender_name_state == false &&*/}
             {/*<Text style={{color:'red'}}>{this.state.languageObj["required_field"] || ''}</Text>*/}
             {/*}*/}
		 </View>

         <View>
             <View><Text>{this.state.languageObj["evidence"] || ''}</Text></View>
             <View style={{flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center',}}>
                 {this.state.image != '' &&
                     <Image style={{width: 300, height: 200, backgroundColor: 'gray', borderWidth: 1}}
                        source={{uri: this.state.image}}/>
                 }

                 {this.state.image == '' &&
                     <Image style={{width: 300, height: 200, backgroundColor: 'gray', borderWidth: 1}}/>
                 }
                 {/*<View style={{}}>*/}
                 {/*    <Button onPress={this.selectPicture}>Gallery</Button>*/}
                 {/*    <Button onPress={this.takePicture}>Camera</Button>*/}
                 {/*</View>*/}
                 <View style={{ flexDirection: 'row', marginBottom: 10, marginTop: 10 }}>
                     <View style={{width: '49%',height: 50,borderBottomLeftRadius: 20,borderBottomRightRadius: 20,borderTopLeftRadius: 20,borderTopRightRadius: 20, borderRadius: 20, overflow: 'hidden'}}>
                         <Text
                             onPress={this.selectPicture}
                             style={{paddingTop: 5, textAlignVertical: "center",textAlign: 'center',backgroundColor: 'white', borderRadius: 20, borderWidth: 1, borderColor: '#3931AA', height: 50, fontSize:20, fontWeight: 'bold', color:'#3931AA'}}
                         > {this.state.languageObj["gallery"] || ''}
                         </Text>
                     </View>
                     <View style={{width: '49%',height: 50, marginLeft: '1%',borderBottomLeftRadius: 20,borderBottomRightRadius: 20,borderTopLeftRadius: 20,borderTopRightRadius: 20, borderRadius: 20, overflow: 'hidden'}}>
                         <Text
                             onPress={this.takePicture}
                             style={{paddingTop: 5, textAlignVertical: "center", textAlign: 'center',backgroundColor: 'white', borderRadius: 20, borderWidth: 1, borderColor: '#3931AA', height: 50, fontSize:20, fontWeight: 'bold', color:'#3931AA'}}
                         > {this.state.languageObj["camera"] || ''}
                         </Text>
                     </View>
                 </View>

             </View>
         </View>



         <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10 }}>
              <View style={{width: '98%',height: 40, marginLeft: '1%'}}>
                  {this.state.posting_data == 0 &&
                  <Button mode="contained"
                          style={{borderRadius: 15, borderWidth: 1, borderColor: '#3931AA', height: 45}}
                          onPress={this.postDataNew}>{this.state.languageObj["submit"] || ''}
                  </Button>
                  }
                  {this.state.posting_data == 1 &&
                  <Button mode="contained"
                          style={{borderRadius: 15, borderWidth: 1, borderColor: '#3931AA', height: 45}}
                          > {this.state.languageObj["submitting"] || ''}
                  </Button>
                  }
              </View>
          </View>
            </ScrollView>
	    </View>
	  
        )
    }
  }

  renderStep3(){
        if(this.state.viewSection == 'step3') {
            return (
                <View>
                    <ScrollView>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize:24, height:45}}>{this.state.languageObj["case_id"] || ''} # {this.state.resultResponse.id}</Text>
                        </View>
                        <View>
                            <Text style={{ fontSize:18, color:'red'}}>{this.state.languageObj["for_people_text"] || ''}</Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize:24, height:45}}>{this.state.languageObj["reporter_info"] || ''}</Text>
                        </View>

                        <View>
                            <Text style={{ fontSize:18}}>{this.state.languageObj["name"] || ''}: {this.state.name}</Text>
                            <Text style={{ fontSize:18}}>{this.state.languageObj["phone"] || ''}: {this.state.phone}</Text>
                            <Text style={{ fontSize:18}}>{this.state.languageObj["email"] || ''}: {this.state.email}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <Text style={{ fontSize:24, height:45}}>{this.state.languageObj["about_offense"] || ''}</Text>
                        </View>

                        <View>
                            <Text style={{ fontSize:18}}>{this.state.languageObj["offense_type"] || ''}: {this.state.offense_type_value}</Text>
                            <Text style={{ fontSize:18}}>{this.state.languageObj["description"] || ''}: {this.state.description}</Text>
                            <Text style={{ fontSize:18}}>{this.state.languageObj["location"] || ''}: {this.state.postalState} {this.state.postalState} {this.state.postcode}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        </View>

                        <View>
                            <Text style={{ fontSize:18}}>{this.state.languageObj["date"] || ''}: {this.state.victim_date}</Text>
                            <Text style={{ fontSize:18}}>{this.state.languageObj["victim_name"] || ''}: {this.state.victim_name}</Text>
                            <Text style={{ fontSize:18}}>{this.state.languageObj["offender_name"] || ''}: {this.state.offender_name}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 15 }}>
                            <View style={{width: '98%',height: 40, marginLeft: '1%'}}>
                                <Button mode="contained"
                                        style={{ borderRadius: 15, borderWidth: 1, borderColor: '#3931AA', height:45}}
                                        onPress={this.gotoStep1}>{this.state.languageObj["another_crime"] || ''} </Button>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            )
        }
    }

  isStep1Validate() {
	  let error_flag = true;
	  //Validation Starts Here

	  if(this.state.postalState == ""){
	      error_flag = false;
          this.setState({postal_state: false})
      }
	  if(this.state.city == ""){
	      error_flag = false;
          this.setState({city_state: false})
      }
	  // if(this.state.email == ''){
	  //     error_flag = false;
      //     this.setState({email_state: false})
      // }
	  //Validation Ends here
      return error_flag;
	  // return error_flag || !this.state.annomus_state;
  }

  isStep2Validate() {
	  let error_flag = true;
	  //Validation Starts Here
	  // if( this.state.victim_date == ""){
      //     error_flag = false;
      //     this.setState({date_state: false})
      // }
      //
      // if(this.state.witness_state == 'outlined'){
      //     if( this.state.victim_name == ""){
      //         error_flag = false;
      //         this.setState({victim_name_state: false})
      //     }
      // }
      // if( this.state.offender_name == ""){
      //     error_flag = false;
      //     this.setState({offender_name_state: false})
      // }
      //
      // if( this.state.location == ""){
      //     error_flag = false;
      //     this.setState({location_state: false})
      // }
      //
      // if( this.state.description == ""){
      //     error_flag = false;
      //     this.setState({description_state: false})
      // }
	  //Validation Ends here
	  
	  return error_flag;
  }
    gotoStep11= () => {
        // if(this.isStep1Validate()) {
            this.setState({viewSection:'step11'})
        // }
    }

  gotoStep2 = () => {
	  if(this.isStep1Validate()) {
	  	  this.setState({viewSection:'step2'})
	  }
  }
  
  gotoStep1 = () => {
	  if(this.isStep2Validate()) {
	     this.setState({
             viewSection:'step1',
             name: '',
             phone: '',
             email: '',
             offense_type_value: '',
             description: '',
             location: '',
             victim_date: '',
             victim_name: '',
             offender_name: '',
             posting_data: 0,
             postalState: '',
             postal_state: true,
             city_state: true,
             city: '',
             postcode: '',
             image: ''

         })
	  }
  }

  postData = () => {
	  if(this.isStep2Validate()) {
          if(this.state.posting_data == 0) {
              this.setState({posting_data: 1});

              let offense_type_value = this.state.offense_type_value;
              let offenseId = '';
              for (let i = 0; i < this.state.offense_type_array.length; i++) {
                  if (offense_type_value == this.state.offense_type_array[i].description) {
                      offenseId = this.state.offense_type_array[i].id;
                  }
              }
              fetch("http://api.saras.care/tokens", {
                  headers: {
                      Authorization: "Basic aHVhbmk6bXlQYXNzd29yZA=="
                  },
                  method: "POST"
              }).then(res => res.json())
                  .then(res => {
                      // console.log(res['token']);

                      var date = new Date();
                      var timezoneOffset = date.getTimezoneOffset();

                      fetch("http://api.saras.care/offenses", {
                          method: 'post',
                          headers: new Headers({
                              'Authorization': 'Basic ' + res['token']
                          }),
                          body: JSON.stringify({
                              'offenseType': offenseId,
                              'offenseDate': this.state.victim_date_state,
                              'location': this.state.location,
                              'offenseStatus': '1',
                              'timezoneOffset': timezoneOffset
                          })
                      }).then(res => res.json())
                          .then(res => {
                              console.log(res);
                              this.setState({
                                  viewSection: 'step3',
                                  resultResponse: res,
                                  posting_data : 0
                              })

                          })
                          .catch(error => {
                              console.log("Error from server 2nd call :- \n", error);
                          });

                  })
                  .catch(error => {
                      console.log("Error from server :- \n", error);
                  });
          }
	  }
  }

  postDataNew = async () => {
        if(this.isStep2Validate()) {
            if(this.state.posting_data == 0) {
                this.setState({posting_data: 1});

                let offense_type_value = this.state.offense_type_value;
                let offenseId = '';
                for (let i = 0; i < this.state.offense_type_array.length; i++) {
                    if (offense_type_value == this.state.offense_type_array[i].description) {
                        offenseId = this.state.offense_type_array[i].id;
                    }
                }

                fetch("http://back.saras.care/tokens", {
                    headers: {
                        Authorization: "Basic aHVhbmk6bXlQYXNzd29yZA=="
                    },
                    method: "POST"
                }).then(res => res.json())
                    .then(res => {
                        // console.log(res['token']);

                        var date = new Date();
                        var timezoneOffset = date.getTimezoneOffset();

                        fetch("http://back.saras.care/offenses", {
                            method: 'post',
                            headers: new Headers({
                                'Authorization': 'Basic ' + res['token']
                            }),
                            body: JSON.stringify({
                                'offenseType': offenseId,
                                'offenseDate': this.state.victim_date_state,
                                'location': 'TEST',
                                // 'offenseStatus': '1',
                                'timezoneOffset': timezoneOffset,
                                'LocationState': this.state.postalState,
                                'LocationCity': this.state.city,
                                'LocationPostCode': this.state.postcode,
                                'description': this.state.description
                            })
                        }).then(res => res.json())
                            .then(res => {
                                console.log(res);
                                this.setState({
                                    viewSection: 'step3',
                                    resultResponse: res,
                                    posting_data : 0
                                })

                                //upload files here
                                if(this.state.image ) {
                                    if (res.FolderURL) {
                                        console.log(res.FolderURL);

                                        let localUri = this.state.image;
                                        let filename = localUri.split('/').pop();

                                        // Infer the type of the image
                                        let match = /\.(\w+)$/.exec(filename);
                                        let type = match ? `image/${match[1]}` : `image`;

                                        // Upload the image using the fetch and FormData APIs
                                        let formData = new FormData();
                                        formData.append("image", { uri: localUri, name: filename, type: 'image/*' });

                                        var createfolder = 'https://api.kloudless.com/v1/accounts/me/storage/folders/?';
                                        var folddata = {
                                            "parent_id": "FVjy1pRHZK1ojCOWW3YIK3AZXqjUvad1YYdcwF6_YoBdXoHlUL_ZWeSMml_OemEsSEzEkyc3BE_XIivbXDEMxDgCzQy7HKRGhP3aaKyEjmmJdirlagudjnsWwyJJxVJewpPG0RCdRyet5E1RdVIjaPw==",
                                            "name": res.id
                                        }
                                        axios.post(createfolder,folddata,{
                                            headers: {
                                                Authorization: "Bearer rC4vOjK4J35FVBby6Lnrutg22sMSF4",
                                                "Content-Type": "application/json",
                                            }},
                                        )
                                            .then(function (response) {
                                            console.log("FOLDER CREATED.....");
                                            // console.log(response.data);
                                            console.log( response.data.id);
                                            var FolderId = response.data.id;
                                            var imageData = {
                                                "parent_id": response.data.id,
                                                "name": filename
                                            }
                                            axios.post('https://api.kloudless.com/v1/accounts/me/storage/files/?', formData, {
                                                headers: {
                                                    Authorization: "Bearer rC4vOjK4J35FVBby6Lnrutg22sMSF4",
                                                    'Content-Type': "application/json",
                                                    'X-Kloudless-Metadata':  JSON.stringify({
                                                        "parent_id": response.data.id,
                                                        "name": filename
                                                    })
                                                }
                                            })
                                                .then((responseJson) => {
                                                    console.log("From File Upload SUCCESS");
                                                    // console.log(responseJson);
                                                    var fileId = responseJson.data.id;
                                                    var mimeType = responseJson.data.mime_type;
                                                    var fileName = responseJson.data.name;

                                                    fetch("http://back.saras.care/save-file", {
                                                        method: 'post',
                                                        body: JSON.stringify({
                                                            'offenseID': res.id,
                                                            'folderID': FolderId,
                                                            'fileID': fileId,
                                                            'fileName': fileName,
                                                            'fileType': mimeType
                                                        })
                                                    }).then(res => res.json())
                                                        .then(res => {
                                                        })
                                                        .catch(error => {
                                                            console.log("Error from save file :- \n", error);
                                                        });

                                                }).catch((error) => {
                                                    console.log("From File upload ERROR");
                                                    console.log(error);
                                            });

                                        })
                                            .catch(function (error) {
                                                console.log(error);
                                            });

                                    }
                                }

                            })
                            .catch(error => {
                                console.log("Error from server 2nd call :- \n", error);
                            });

                    })
                    .catch(error => {
                        console.log("Error from server :- \n", error);
                    });
            }
        }
    }
  
  render() {

    return (
	   <View style={{marginTop: 30, paddingLeft: 10, paddingRight: 10, flex: 1}} >
	     {this.renderStep1()}
	     {this.renderStep11()}
         {this.renderStep2()}
         {this.renderStep3()}
       </View >
    );
  }
}

export default AllSteps;