import  React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, Image, ActivityIndicator} from 'react-native';
import Constants from 'expo-constants';
import { LinearGradient } from 'expo-linear-gradient';


export default function App() {
  
  const [weatherData, setWeatherData] = useState(null);
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function showPosition(position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=7c8e042c09a447200763fa7fff3a0e64&units=metric&lang=ru`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        setWeatherData(data);
    })
})}, []);


  return (
    <View style={styles.root}>
      <LinearGradient
            colors={['rgba(2,0,36,1)','rgba(83,83,110,0)', 'rgba(0,255,236,0.35)', 'transparent']}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              height: 1000,
            }}
          />
    {!weatherData ? <ActivityIndicator size='large' color='#0000ff' /> : (
      <View style={styles.container}>
            <Text style={styles.header}> 
                {weatherData.name}
                <Image 
                style={styles.tinyLogo}
                source={{
                uri: `http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`,
                }} />
            </Text>
            <Text style={styles.paragraph}>
                Текущая температура {Math.round(weatherData.main.temp)} C° 
            </Text>
            <Text style={styles.paragraph}>
                Скорость ветра {Math.round(weatherData.wind.speed)} м
            </Text>
            <Text style={styles.paragraph}>
                Влажность {weatherData.main.humidity} %
            </Text>
        </View>
     )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
  },

  container: {
  backgroundColor: 'rgba(255, 255, 255, 0.4)',
  borderRadius: 5,
  padding: 10,
  margin: 20,
  },
  
  tinyLogo: {
    width: 50,
    height: 50,
  },

  header: {
    margin: 20,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },

  paragraph: {
    margin: 20,
    fontSize: 18,
    textAlign: 'center',
  },
});
