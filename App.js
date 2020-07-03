import  React, {useState, useEffect} from 'react';
import { Text, View, ScrollView, StyleSheet, Image, ActivityIndicator, TextInput, Button} from 'react-native';
import Constants from 'expo-constants';
import { LinearGradient } from 'expo-linear-gradient';


export default function App() {
  
  const [weatherData, setWeatherData] = useState(null);
  const [response, setResponse] = useState('');
  console.log(response)

  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function showPosition(position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=7c8e042c09a447200763fa7fff3a0e64&units=metric&lang=ru`; 
    // Not using https://www.metaweather.com/api/ because access to fetch has been blocked by CORS policy. Besides 'openweathermap' has better geolocation options and more locations to find.
  
    fetch(url)
    .then(res => res.json())
    .then(data => {
      
      
    
        setWeatherData(data)
    
      
    })
  })}, []); // get current weather
  
  const returnToStart = () => {
    setWeatherData(
      () => {
        navigator.geolocation.getCurrentPosition(function showPosition(position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=7c8e042c09a447200763fa7fff3a0e64&units=metric&lang=ru`;
    
        fetch(url)
        .then(res => res.json())
        .then(data => setWeatherData(data))
    })}
    )
  };// get back to start
  
  const weatherCheck = (submit) => {
    const location = submit.nativeEvent.text
    console.log(submit.nativeEvent.text)
    setTimeout(() => {
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=7c8e042c09a447200763fa7fff3a0e64&units=metric&lang=ru`;
    
      fetch(url)
      .then(res => res.json())
      .then(data => setWeatherData(data))
    }, 1000);

      
         // Set timeout for better UI
  };// get select weather
  
  if (!weatherData ) {
    return <ActivityIndicator size='large' color='#0000ff' />
  }; // Render when we haven't any data from server
  if (weatherData.cod === '404') {
    return (
      <View style={styles.root}>
      <LinearGradient
            colors={['rgba(2,0,36,1)','rgba(83,83,110,0)', 'rgba(0,255,236,0.35)', 'transparent']}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              height: 1200,
            }}
          />
      <ScrollView>
      <View style={styles.container}>
               <Text style={styles.header}>
                    Населённый пункт не найдет!
               </Text>
               <Text style={styles.paragraph}>
               Возможна ошибка при вводе.
               </Text>
               <Text style={styles.paragraph}>
               Вернитесь к началу и повторите попытку.
               </Text>
                   <Button title='Вернуться к началу' onPress={returnToStart} />
      </View>
      </ScrollView>
      </View>                   
    )
  }; // Render when we get cod 404
  if (weatherData.cod === '400') {
    return (
      <View style={styles.root}>
      <LinearGradient
            colors={['rgba(2,0,36,1)','rgba(83,83,110,0)', 'rgba(0,255,236,0.35)', 'transparent']}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              height: 1200,
            }}
          />
      <ScrollView>
      <View style={styles.container}>
               <Text style={styles.header}>
                    Вы ничего не ввели!
               </Text>
               <Text style={styles.paragraph}>
               Вернитесь к началу и введите населённый пункт для поиска.
               </Text>
                   <Button title='Вернуться к началу' onPress={returnToStart} />
      </View>
      </ScrollView>
      </View>                   
    )
  }; // Render when we get cod 400

  return (
    <View style={styles.root}>
      <LinearGradient
            colors={['rgba(2,0,36,1)','rgba(83,83,110,0)', 'rgba(0,255,236,0.35)', 'transparent']}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              height: 1200,
            }}
          />
      <ScrollView>
      <View style={styles.container}>
            <TextInput style={styles.header}
            defaultValue={weatherData.name} 
            onChangeText={text => setResponse(text)}
            onSubmitEditing={(submit) => weatherCheck(submit)}
            returnKeyType={"search"}
            /> 
                <Text style={styles.paragraph}>
                    Сейчас {weatherData.weather[0].description}
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
        </ScrollView>
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
  marginTop: '50%',
  marginBottom: '50%',
  },
  
  tinyLogo: {
    width: 50,
    height: 50,
  },

  header: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 7,
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
