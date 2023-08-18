import * as React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  TextInput,
  Alert,
  TouchableOpacity,
  Text,
  ImageBackground,
} from 'react-native';
import Constants from 'expo-constants';
//import db from "../config"
import firebase from 'firebase';
// You can import from local files

export default class LoginScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }
  signIn = async (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.props.navigation.replace('Dashboard');
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView
          style={{
            marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
          }}
        />
        <ImageBackground
          resizeMode={'cover'}
          source={require('./background.png')}
          style={{
            flex: 1,
            width: '100%',
            height: '100%',
            alignSelf: 'center',
          }}
        >
          <View
            style={{
              width: 100,
              alignSelf: 'center',
              backgroundColor: '#FB4570',
              height: 40,
              justifyContent: 'center',
              borderRadius: 10,
            }}
          >
            <Text style={{ fontSize: 25, alignSelf: 'center' }}>Giriş Yap</Text>
          </View>

          <TextInput
            style={{
              height: 50,
              margin: 12,
              borderWidth: 5,
              padding: 10,
              backgroundColor: 'white',
              borderColor: '#FB6B90',
              borderRadius: 10,
            }}
            placeholder="E-posta"
            onChangeText={(text) => {
              this.setState({ email: text });
            }}
          ></TextInput>
          <TextInput
            style={{
              height: 50,
              margin: 12,
              borderWidth: 5,
              padding: 10,
              backgroundColor: 'white',
              borderColor: '#FB6B90',
              borderRadius: 10,
            }}
            placeholder="Şifre"
            onChangeText={(text) => {
              this.setState({ password: text });
            }}
            secureTextEntry
          ></TextInput>
          <TouchableOpacity
            onPress={() => {
              this.signIn(this.state.email, this.state.password);
            }}
          >
            <Text style={styles.button}>Giriş Yap</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.text}
            onPress={() => {
              this.props.navigation.navigate('Register');
            }}
          >
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17, textDecorationLine: 'underline' }}>Hesabınız yok mu? Kayıt Olun</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FB8DA0' },

  text: { alignSelf: 'center', fontSize: 25, marginTop: 40, color: 'white' },
  button: { alignSelf: 'center', color: 'white', fontWeight: 'bold', fontSize: 17 },
  textInputContainer: {
    alignSelf: 'center',
    borderWidth: 5,
    borderColor: 'pink',
    borderRadius: 10,
    width: 200,
    height: 50,
    justifyContent: 'center',
    marginTop: 5,
    backgroundColor: 'white', // Added background color
    paddingHorizontal: 30, // Added horizontal padding
  },
});
