// Import necessary modules and components
import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, TextInput, Alert } from 'react-native';
import firebase from "firebase"


export default class DeleteScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            bloodType:'',
            phone:'',
            registrationTime:'',
            province:'',
          };
    }
    componentDidMount() {
       // console.log(firebase.auth().currentUser.uid)
       this.getInfo()
    }
 
    getInfo() {

        firebase
          .database()
          .ref('/users/' + firebase.auth().currentUser.uid)
         
         .once('value')
  .then(snapshot => {
    this.setState({name:snapshot.val().name, province:snapshot.val().province, registrationTime:snapshot.val().registrationTime, email:snapshot.val().email, phone:snapshot.val().phone, bloodType:snapshot.val().blood_type})
  });

       
    }
    render()
 { return (
    <View style={styles.container}>
      <Text style={styles.heading}>Profile</Text>
      <TextInput defaultValue={this.state.name} style={{ height: 50,
                width:300,
              margin: 12,
              borderWidth: 5,
              padding: 10,
              backgroundColor: 'white',
              borderColor: '#FB6B90',
              borderRadius: 10,}} onChangeText={text => firebase.database().ref('/users/'+ firebase.auth().currentUser.uid).update({
                name:text
              })}/>
      <Text style={{fontSize:20}}>{"Province: "+this.state.province}</Text>
      <View style={{height:30}}></View>
      <Text style={{fontSize:20}}>{"Email: "+this.state.email}</Text>
      <View style={{height:30}}></View>

      <Text style={{fontSize:20}}>{"Phone: "+this.state.phone}</Text>

      <Text style={{fontSize:20, marginTop:30}}>{"Blood Type: "+this.state.bloodType}</Text>
      <Text style={{fontSize:20, marginTop:30}}>{"Registration Time: "+this.state.registrationTime}</Text>




      <TouchableOpacity style={styles.button} onPress={()=>{
        Alert.alert(
            'Are you sure you want to delete your account?',
            '',
            [
              {text: 'NO', onPress: () => console.warn('NO Pressed'), style: 'cancel'},
              {text: 'YES', onPress: () => {firebase.database().ref('/users/'+firebase.auth().currentUser.uid).remove();
              const user = firebase.auth().currentUser; 
      user.delete().then(() => {
          // User deleted.
      }).catch((error) => {
          // An error occurred
          // ...
      });
              alert("User Deleted")
              this.props.navigation.navigate("Login")}},
            ]
          );
        

      }}>
      <Text style={styles.buttonText}>Delete Account</Text>
    </TouchableOpacity>
      {/* Add your components and screens here */}
    </View>
  );}
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
   // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FB8DA0',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop:50
  },
  button: {
    backgroundColor: 'red',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    padding: 10,
    marginTop:250
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

