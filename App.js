import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { PermissionsAndroid } from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      error: null,
    };
  }
  
  async componentDidMount() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': 'Cool RideNow App need your current Location Permission',
          'message': 'We need your permission to access your current location.'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Thank you so much");
        this.getCurrentLocation();
      } else {
        console.log("Location permission denied")
      }
    } catch (err) {
      console.warn(err)
    }
  }
  
  getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        debugger;
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }
  
  
  render() {
    return (
      <View 
        style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}
      >
        <Text>
          Latitude: { this.state.latitude }
        </Text>
        <Text>
          Longitude: { this.state.longitude }
        </Text>
       { this.state.error ? <Text>Error: { this.state.error }</Text> : null }
     </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
