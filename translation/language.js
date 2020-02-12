import { AsyncStorage } from 'react-native';

export function getString (key)  {
	let str = '';
    AsyncStorage.getItem('language')
        .then(value => {
            if(value == "English") {
			    let languageObj = require('./english.json');

				str = languageObj[key];
	        }
			console.log(str);
			return str;
          
        })
		
	
    
}