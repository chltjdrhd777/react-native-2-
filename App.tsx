import React from "react";
import Loading from "./Loading";
import { Alert } from "react-native";
import * as Location from "expo-location";
import axios from "axios";

const API_KEY = "d213b68a1c2f6cd45b8f3f9d88f05486";

//to use the immediate reaction of my app, I chose "class" to use "componentDidMount"
//async() => {const something = await specific fucntion} <--- make intentional delay to wait for calling all information I want
export default class App extends React.Component {
  state = {
    isLoading: true
  };
  getWeather = async (latitude: number, longitude: number) => {
    const { data } = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
    );
    console.log(data);
  };

  getLocation = async () => {
    try {
      await Location.requestPermissionsAsync();
      const {
        coords: { latitude, longitude }
      } = await Location.getCurrentPositionAsync();
      this.getWeather(latitude, longitude);
      this.setState({ isLoading: false });
    } catch (error) {
      Alert.alert("Are you in universe or somewhere?", "Alien...");
    }
  };

  componentDidMount() {
    this.getLocation();
  }

  render() {
    const { isLoading } = this.state;
    return isLoading ? <Loading /> : null;
  }
}
