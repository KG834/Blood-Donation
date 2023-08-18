import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Button,
  FlatList,
  Image,
  ImageBackground,
} from 'react-native';
import firebase from 'firebase';
import UserList from '../components/userList.js';
import  {SelectList} from 'react-native-dropdown-select-list';
export default class SearchScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      BloodTypeLookingFor: '',
      Blood_Type: '',
      Name: '',
      Email: '',
      Phone: '',
      Province: '',
      ProvinceLookingFor: '',
      Users: [],
      selected: '',
      setSelcted: '',
    };
  }

  componentDidMount() {
 
  }

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
            width: "100%",
            height: "100%",
            alignSelf:'center'
          }}>
          <StatusBar hidden={true} />
         
          <View>
            <Image
              style={{
                height: 140,
                width: 400,
                alignSelf: 'center',
                marginTop: -45,
              }}
              source={require('../header.png')}
            />
          </View>
          
          <View style={{ alignItems: 'center' }}>
            <Text style={{ marginTop: 10, }}>Kan Grubu</Text>
            <SelectList
              dropdownTextStyles={{
                color: 'white',
              }}
              boxStyles={{
                backgroundColor: '#f74f74',
                borderColor: 'white',
                marginTop: 5,
              }}
              dropdownStyles={{
                backgroundColor: '#f74f74',
                top: 0,
                width: '100%',
              }}
              setSelected={(val) => {
                this.setState({ BloodTypeLookingFor: val });
              }}
              data={[
                { key: '1', value: 'A+' },
                { key: '2', value: 'A-' },
                { key: '3', value: 'B+' },
                { key: '4', value: 'B-' },
                { key: '5', value: 'AB+' },
                { key: '6', value: 'AB-' },
                { key: '7', value: 'O+' },
                { key: '8', value: 'O-' },
              ]}
              save="value"
            />
            <View style={{ height: 5 }}></View>
            <Text style={{ marginTop: 10 }}>Il</Text>

            <SelectList
              dropdownTextStyles={{
                color: 'white',
              }}
              dropdownStyles={{
                backgroundColor: '#f74f74',
                top: 0,
                width: '100%',
              }}
              boxStyles={{
                backgroundColor: '#f74f74',
                borderColor: 'white',
              }}
              setSelected={(val) => {
                this.setState({ ProvinceLookingFor: val });
              }}
              data={[
                { key: '1', value: 'Adana' },
                { key: '2', value: 'Adiyaman' },
                { key: '3', value: 'Afyonkarahisar' },
                { key: '4', value: 'Ağri' },
                { key: '5', value: 'Aksaray' },
                { key: '6', value: 'Amasya' },
                { key: '7', value: 'Ankara' },
                { key: '8', value: 'Antalya' },
                { key: '9', value: 'Ardahan' },
                { key: '10', value: 'Artvin' },
                { key: '11', value: 'Aydin' },
                { key: '12', value: 'Balikesir' },
                { key: '13', value: 'Bartin' },
                { key: '14', value: 'Batman' },
                { key: '15', value: 'Bayburt' },
                { key: '16', value: 'Bilecik' },
                { key: '17', value: 'Bingöl' },
                { key: '18', value: 'Bitlis' },
                { key: '19', value: 'Bolu' },
                { key: '20', value: 'Burdur' },
                { key: '21', value: 'Bursa' },
                { key: '22', value: 'Çanakkale' },
                { key: '23', value: 'Çankiri' },
                { key: '24', value: 'Çorum' },
                { key: '25', value: 'Denizli' },
                { key: '26', value: 'Diyarbakir' },
                { key: '27', value: 'Düzce' },
                { key: '28', value: 'Edirne' },
                { key: '29', value: 'Elaziğ' },
                { key: '30', value: 'Erzincan' },
                { key: '31', value: 'Erzurum' },
                { key: '32', value: 'Eskişehir' },
                { key: '33', value: 'Gaziantep' },
                { key: '34', value: 'Giresun' },
                { key: '35', value: 'Gümüşhane' },
                { key: '36', value: 'Hakkari' },
                { key: '37', value: 'Hatay' },
                { key: '38', value: 'Iğdir' },
                { key: '39', value: 'Isparta' },
                { key: '40', value: 'İstanbul' },
                { key: '41', value: 'İzmir' },
                { key: '42', value: 'Kahramanmaraş' },
                { key: '43', value: 'Karabük' },
                { key: '44', value: 'Karaman' },
                { key: '45', value: 'Kars' },
                { key: '46', value: 'Kastamonu' },
                { key: '47', value: 'Kayseri' },
                { key: '48', value: 'Kirikkale' },
                { key: '49', value: 'Kirklareli' },
                { key: '50', value: 'Kirşehir' },
                { key: '51', value: 'Kilis' },
                { key: '52', value: 'Kocaeli' },
                { key: '53', value: 'Konya' },
                { key: '54', value: 'Kütahya' },
                { key: '55', value: 'Malatya' },
                { key: '56', value: 'Manisa' },
                { key: '57', value: 'Mardin' },
                { key: '58', value: 'Mersin' },
                { key: '59', value: 'Muğla' },
                { key: '60', value: 'Muş' },
                { key: '61', value: 'Nevşehir' },
                { key: '62', value: 'Niğde' },
                { key: '63', value: 'Ordu' },
                { key: '64', value: 'Osmaniye' },
                { key: '65', value: 'Rize' },
                { key: '66', value: 'Sakarya' },
                { key: '67', value: 'Samsun' },
                { key: '68', value: 'Siirt' },
                { key: '69', value: 'Sinop' },
                { key: '70', value: 'Sivas' },
                { key: '71', value: 'Şanliurfa' },
                { key: '72', value: 'Şirnak' },
                { key: '73', value: 'Tekirdağ' },
                { key: '74', value: 'Tokat' },
                { key: '75', value: 'Trabzon' },
                { key: '76', value: 'Tunceli' },
                { key: '77', value: 'Uşak' },
                { key: '78', value: 'Van' },
                { key: '79', value: 'Yalova' },
                { key: '80', value: 'Yozgat' },
                { key: '81', value: 'Zonguldak' },
              ]}
              save="value"
            />
          </View>

          <UserList
            bloodTypeLookingFor={this.state.BloodTypeLookingFor}
            provinceLookingFor={this.state.ProvinceLookingFor}
          />
          <Text></Text>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffbfd1' },
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
  searchContainer: {
    alignSelf: 'center',
    height: 50,
    width: 70,
    backgroundColor: 'red',
    alignItems: 'center',
    marginTop: 15,
    borderRadius: 5,
  },
});
