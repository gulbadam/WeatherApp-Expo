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

import { WebBrowser } from 'expo';

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
    type: obj.weather[0].main
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
  
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
          <Text>City Weather</Text>
          <FlatList data={this.state.weatherData} keyExtractor={(item, index)=> index.toString()} 
          renderItem={({item, index})=>(
            <View>
            <Text> {item.tempC} C  / {item.tempF} F - {item.name} - {item.country}</Text>
           

            { /*<Image style = {{width: 100, height: 100}}
            source = {{uri: item.image}}
          />*/}
            
            </View>
          )}
          />

            {/*<Image
              source={
                __DEV__
                  ? require('../assets/images/robot-dev.png')
                  : require('../assets/images/robot-prod.png')
              }
              style={styles.welcomeImage}
            />
          </View>

          <View style={styles.getStartedContainer}>
            {this._maybeRenderDevelopmentModeWarning()}

            <Text style={styles.getStartedText}>Get started by opening</Text>

            <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
              <MonoText style={styles.codeHighlightText}>screens/HomeScreen.js</MonoText>
            </View>

            <Text style={styles.getStartedText}>
              Change this text and your app will automatically reload.
            </Text>
          </View>

          <View style={styles.helpContainer}>
            <TouchableOpacity onPress={this._handleHelpPress} style={styles.helpLink}>
              <Text style={styles.helpLinkText}>Help, it didn’t automatically reload!</Text>
            </TouchableOpacity> */}
            </View> 
        </ScrollView>

        <View style={styles.tabBarInfoContainer}>
          <Text style={styles.tabBarInfoText}>This is a tab bar. You can edit it in:</Text>

          <View style={[styles.codeHighlightContainer, styles.navigationFilename]}>
            <MonoText style={styles.codeHighlightText}>navigation/MainTabNavigator.js</MonoText>
          </View>
        </View>
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
    marginHorizontal: 50,
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
