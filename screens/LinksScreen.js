import React from 'react';
import { ScrollView,
  TextInput,
Image,
Platform,
StyleSheet,
Text,
TouchableOpacity,
TouchableHighlight,
StatusBar,
View,
FlatList
}
from 'react-native';
import {
  ExpoLinksView,
  LinearGradient
} from '@expo/samples';

export default class SearchScreen extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          searchInput: "",
          searchResult: "",
          error: "Search for a city...",
          item: {}
        }
      }
      fetchCityTemp(city) {
          this.setState({
            loading: true,
            item: {},
            searchResult: 0,
            error: "Search for a city..."});
            fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=1d85be1cb12df86525d2bd57ef4c4e29`)
              .then((response) => response.json())
              .then((responseJson) => {
                console.log("respJson", responseJson);
                const r = responseJson.main;
                const obj = responseJson;
                if (responseJson.cod !== 200) {
                  this.setState({
                    searchResult: 0,
                    error: "City not found!"
                  })

                } else {
                  const cityWeather = {
                    id: obj.id,
                    name: obj.name,
                    country: country,
                    tempC: (Math.ceil(r.temp) - 273),
                    tempF: Math.ceil(9 / 5 * (Math.ceil(r.temp) - 273) + 32),
                    type: obj.weather[0].main,
                    humidity: `Humidity ${r.humidity} %`
                  }
                  console.log("weatherData", this.state.weatherData);
                  this.setState({
                    item: cityWeather,
                    searchResult: 1
                  })
                }
              })
              .catch((error) => {
                console.log(error)
              })
            }
            getTempRange = (t) => {
              if (t < 11) {
                return 1;
              } else if (t > 10 && t < 20) {
                return 2

              } else if (t >= 20 && t < 30) {
                return 3
              } else {
                return 4
              }
            }
            getEmoji = (type) => {
              if (type == "Clouds") {
                return "☁️";
              } else if (type == "Clear") {
                return "☀️"

              } else if (type == "Haze") {
                return "🌥"

              } else if (type == "Thunderstorm") {
                return "⛈"

              } else if (type == "Rain") {
                return "🌧"
              } else if (type == "Snow") {
                return "❄️"

              } else if (type == "Drizzle") {
                return "🌦"
              } else if (type == "Fog") {
                return "🌫"
              }
            }
            fetchTemp = () => {

              for (let i = 0; i < this.state.list.length; i++) {
                const name = this.state.list[i].name;
                const country = this.state.list[i].country;
                this.fetchCityTemp(name, country)

              }

            }
            componentDidMount = () => {
              // this.fetchTemp()
            };

  static navigationOptions = {
    title: 'Search',
  };

  render() {
    return (
      <View style={styles.container}>
      <ScrollView style={{width: '100%'}}>
         <View style={styles.welcomeContainer}>
          <Text style={styles.headText}> ☀️City Weather☀️</Text>
          <View style={styles.welcomeContainer}>
          <Text style={{textAlign:'center', lineHeight: 20,  padding: 5, fontSize: 15}}>Search for City</Text>
          <TextInput 
          style={{width: 250, padding: 15, margin: 5, backgroundColor: 'gray', color: "white", justifyContent: "center", borderRadius: 8, fontSize: 16, fontWeight: "600"}}
          onChangeText={(text)=> this.setState({searchInput: text})}
          value={this.state.searchInput}
          />
          <TouchableHighlight
          style={{backgroundColor: "blue", padding: 20, borderRadius: 8}}
          onPress={()=>{this.searchCity()}}>
          <Text style={{fontSize: 14, color: "white", fontWeight: 'bold', textAlign: 'center'}}>Search</Text>
          </TouchableHighlight>
          </View>
          {this.state.searchResult ==1 ? (
          <TouchableHighlight  underlayColor="grey" onPress={()=>alert(`${this.state.item.humidity}   ${this.state.item.type}`)}>
            <LinearGradient colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,0)']} start={[0,0.5]} style={{borderRadius: 10}}>
            <View style={styles.row}>
              <Text style={[
                (this.getTempRange(this.state.item.tempC) == 1) ? styles.cold: styles.temp,
                (this.getTempRange(this.state.item.tempC) == 2) ? styles.medium: styles.temp,
                (this.getTempRange(this.state.item.tempC) == 3) ? styles.high: styles.temp,
                (this.getTempRange(this.state.item.tempC) == 4) ? styles.hot: styles.temp,
                styles.temp]}> {this.getEmoji(this.state.item.type)} {this.state.item.tempC} °C</Text>
              <Text style={[
                (this.getTempRange(this.state.item.tempC) == 1) ? styles.cold: styles.temp,
                (this.getTempRange(this.state.item.tempC) == 2) ? styles.medium: styles.temp,
                (this.getTempRange(this.state.item.tempC) == 3) ? styles.high: styles.temp,
                (this.getTempRange(this.state.item.tempC) == 4) ? styles.hot: styles.temp,
                styles.temp]}> {this.state.item.tempF} °F</Text>
              <Text style={styles.cityName}>{this.state.item.name}</Text>
            </View>
            </LinearGradient>
            </TouchableHighlight>
            ): (
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text>{this.state.error}</Text>
              </View>
            )
          }
         
            </View> 
      </ScrollView>
      </View>
    );
  }
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
      textAlign: 'center'


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
      justifyContent: 'center',
      width: "100%"
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
          shadowOffset: {
            height: -3
          },
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
