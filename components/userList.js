import React, { useEffect, useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import firebase from 'firebase';

const UserList = ({ bloodTypeLookingFor, provinceLookingFor }) => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const usersRef = firebase.database().ref('users');
    usersRef.on('value', (snapshot) => {
      const users = snapshot.val();
      console.log('users:', users); // Add this line for debugging
      if (users) {
        const userList = Object.keys(users).map((userId) => ({
          id: userId,
          ...users[userId],
        }));
       
        //   console.log('userList:', userList); // Add this line for debugging
        setUserList(userList);
      }
    });
  }, []);

  return (
    <View style={{ backgroundColor: '', flex: 1 }}>
      <FlatList
        data={userList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          if (
            item.blood_type === bloodTypeLookingFor &&
            item.province === provinceLookingFor
          ) {
            return (
              <View
                style={{
                  alignItems: 'center',
                  marginTop: 30,
                  borderWidth: item.blood_type === bloodTypeLookingFor ? 5 : 0,
                  borderColor: 'red',
                  borderRadius: 5,
                  width: 250,
                  height: 170,
                  alignSelf: 'center',
                  backgroundColor: 'white',
                  padding: 10,
                }}>
                <Text
                  style={{
                    color: 'red',
                    fontSize: 16,
                    fontWeight: 'bold',
                    marginBottom: 5,
                  }}>
                  Isim: {item.name}
                </Text>
                <Text style={{ color: 'red', fontSize: 14, marginBottom: 5 }}>
                E-posta: {item.email}
                </Text>
                <Text style={{ color: 'red', fontSize: 14, marginBottom: 5 }}>
                Telefon: {item.phone}
                </Text>
                <Text style={{ color: 'red', fontSize: 14, marginBottom: 5 }}>
                Il: {item.province}
                </Text>
                <Text style={{ color: 'red', fontSize: 14 }}>
                Kan Grubu: {item.blood_type}
                </Text>
                <Text style={{ color: 'red', fontSize: 14 }}>
                Kayıt Tarihi
: {item.registrationTime}
                </Text>
              </View>
            );
          }
        }}
      />
    </View>
  );
};

export default UserList;
