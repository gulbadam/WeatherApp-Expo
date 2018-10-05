import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  StatusBar,
  View,
  FlatList
} from 'react-native';

import { WebBrowser, LinearGradient } from 'expo';

import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
   constructor(props) {
     super(props);
     this.state = {
       list: [
          {
    "id": 524894,
    "name": "Moskva",
    "country": "RU",
    "coord": {
      "lon": 37.606667,
      "lat": 55.761665
    }
  },
  {
    "id": 587081,
    "name": "Baku City",
    "country": "AZ",
    "coord": {
      "lon": 49.882221,
      "lat": 40.395279
    }
  },
    {
    "id": 5391997,
    "name": "San Francisco County",
    "country": "US",
    "coord": {
      "lon": -122.45108,
      "lat": 37.766602
    }
  },
  {
    "id": 5388319,
    "name": "Rocklin",
    "country": "US",
    "coord": {
      "lon": -121.235779,
      "lat": 38.79073
    }
  },
    {
    "id": 5389519,
    "name": "Sacramento County",
    "country": "US",
    "coord": {
      "lon": -121.317734,
      "lat": 38.466579
    }
  },
   {
    "id": 5856194,
    "name": "Honolulu County",
    "country": "US",
    "coord": {
      "lon": -157.966675,
      "lat": 21.466669
    }
  },
    {
    "id": 5400075,
    "name": "Sunnyvale",
    "country": "US",
    "coord": {
      "lon": -122.036346,
      "lat": 37.368832
    }
  }
       ],
       weatherData: [],
       loading: false,
       refreshing: false,
       newAlert: 0

       
     }
     
   }

fetchCityTemp(city, country){
  this.setState({
    loading: true
  });
fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=1d85be1cb12df86525d2bd57ef4c4e29`)
.then((response)=>response.json())
.then((responseJson) => {console.log("respJson", responseJson);
  const r = responseJson.main;
  const obj = responseJson;
  const cityWeather = {
    id: obj.id,
    name: obj.name,
    country: country,
    tempC: (Math.ceil(r.temp)-273),
    tempF: Math.ceil(9 / 5 * (Math.ceil(r.temp) - 273) + 32),
    type: obj.weather[0].main,
    humidity : `Humidity ${r.humidity} %`
  }
  //this.state.weatherData.push(cityWeather)
  console.log("weatherData", this.state.weatherData);
  this.setState({
    weatherData: [...this.state.weatherData, cityWeather],
    loading: false,
    refreshing: false
  })
})
    .catch((error)=>{
      console.log(error)
    })
   }
  getTempRange = (t) => {
    if (t < 11) {
      return 1;
    }
    else if (t > 10 && t < 20) {
      return 2

    } else if (t >= 20 && t < 30) {
      return 3
    }
    else {
      return 4
    }
  }
  getEmoji=(type)=>{
    if (type=="Clouds"){
      return "☁️";
    } else if (type=="Clear") {
      return "☀️"
      
    } else if (type=="Haze") {
      return "🌥"
      
    } else if (type=="Thunderstorm") {
      return "⛈"

    }else if (type == "Rain") {
      return "🌧"
    } else if (type == "Snow") {
        return "❄️"
    
        } else if (type == "Drizzle") {
          return "🌦"
          } else if (type == "Fog") {
            return "🌫"
}
  }
fetchTemp=()=> {
  
  for (let i = 0; i < this.state.list.length; i++) {
    const name = this.state.list[i].name;
    const country =this.state.list[i].country;
    this.fetchCityTemp(name, country)
    
  }
  
}
componentDidMount = () => {
  this.fetchTemp()
};





static navigationOptions = {
    header: null,
  };





  render() {
    console.log("list", this.state.list)
  console.log("data", this.state.weatherData)
  //alert(`${item.humidity}   ${item.type}`)
    return (
      <View style={styles.container}>
        <ScrollView style={{width: '100%'}}>
          <View style={styles.welcomeContainer}>
          <Text style={styles.headText}> ☀️City Weather☀️</Text>
          <FlatList style={{width: '100%'}} data={this.state.weatherData} keyExtractor={(item, index)=> index.toString()} 
          renderItem={({item, index})=>(
            <TouchableHighlight  underlayColor="grey" onPress={()=>this.setState({newAlert: 1, alertMsg: `${item.humidity}  -  ${item.type}`})}>
            <LinearGradient colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,0)']} start={[0,0.5]} style={{borderRadius: 10}}>
            <View style={styles.row}>
              <Text style={[
                (this.getTempRange(item.tempC)==1) ? styles.cold : styles.temp,
                (this.getTempRange(item.tempC) == 2) ? styles.medium : styles.temp,
                (this.getTempRange(item.tempC) == 3) ? styles.high : styles.temp,
                (this.getTempRange(item.tempC) == 4) ? styles.hot : styles.temp,
                styles.temp]}> {this.getEmoji(item.type)} {item.tempC} °C</Text>
              <Text style={[
                (this.getTempRange(item.tempC) == 1) ? styles.cold : styles.temp,
                (this.getTempRange(item.tempC) == 2) ? styles.medium : styles.temp,
                (this.getTempRange(item.tempC) == 3) ? styles.high : styles.temp,
                (this.getTempRange(item.tempC) == 4) ? styles.hot : styles.temp,
                styles.temp]}> {item.tempF} °F</Text>
              <Text style={styles.cityName}>{item.name}</Text>
            </View>
            </LinearGradient>
            </TouchableHighlight>
          )}
          />
        </View> 
        </ScrollView>
        {this.state.newAlert ==1 ? (
          <View style={{flex:1, justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 0,  left: 0, height: '100%', width: '100%', backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <View style={{width: "75%", height: 100}}>
          <LinearGradient colors={['#136a8a', '#267871']} start={[0, 0.65]} style={{flex: 1, borderRadius: 20, justifyContent: 'space-between', padding: 5, shadowColor: 'black', shadowOffset:{width: 0, height: 2}, shadowOpacity: 0.3, shadowRadius: 2}}>
          <Text style={{fontSize: 16, color: "white", padding: 10, textAlign: 'center'}}>{this.state.alertMsg}</Text>
          <TouchableHighlight underlayColor="grey" onPress={()=>this.setState({alertMsg: "", newAlert: 0})}>
          <Text style={{fontWeight: 'bold', color: 'white', padding: 10, textAlign: 'center'
          }}>Close</Text>
          </TouchableHighlight>
          </LinearGradient>
          </View>
          </View>
        ): ""}
    </View>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  headText: {
    paddingTop: 30,
    paddingBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: "green",
    width: "100%",
    textAlign:'center',
  },
  row: {
    flex: 1,
    paddingVertical: 25,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: "white",
},
  temp: {
    fontSize: 22,
    lineHeight: 40,
    width: 95,
    fontWeight: 'bold',
    fontFamily: 'Avenir',
  },
  cityName: {
    fontSize: 20,
    lineHeight: 40,
    fontFamily: 'Avenir',
},
cold: {
color: "blue"
},
medium: {
  color: "green"
},
high: {
  color: 'orange'
},
hot: {
  color: "red"
},
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    width:"100%"
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
