
import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  Platform,
  StatusBar,
  ImageBackground,
  Linking,
  KeyboardAvoidingView
} from 'react-native';
import Constants from 'expo-constants';
// You can import from local files
import firebase from 'firebase';
import DropDownPicker from 'react-native-dropdown-picker';
import {SelectList} from 'react-native-dropdown-select-list';
import { CheckBox } from 'react-native-elements'


export default class RegisterScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      blood_Type: '',
      email: '',
      province: '',
      phone: '',
      password: '',
      confirmPassword: '',
      agreedToTerms: false,
      isSelected: false,
      checked: false,
    };
  }
  componentDidMount() {
    
  }

  registerUser = async (
    name,
    blood_type,
    email,
    phone,
    password,
    confirmPassword,
    province
  ) => {
    if (password === confirmPassword && this.state.checked) {
      const registrationTime = new Date().toISOString().split('T')[0]; // Get current date

      await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          alert('Kullanıcı kayıt edildi!!');
          console.log(userCredential.user.uid);
          this.props.navigation.navigate('Dashboard');
          firebase
            .database()
            .ref('/users/' + userCredential.user.uid)
            .set({
              name: name,
              blood_type: blood_type,
              phone: phone,
              email: userCredential.user.email,
              province: province,
              registrationTime: registrationTime,
            });
        })
        .catch((error) => {
          alert(error.message);
        });
    } else {
      alert('Şifreler uyuşmuyor veya Hizmet Şartlarını kabul etmediniz!');
    }
  };
  toggleCheckBox = () => {
    this.setState({checked:!this.state.checked})
    console.log(!this.state.checked)
  };
  render() {
    const { name, blood_Type, email, password, confirmPassword } = this.state;
    return (
      <View style={styles.container}>
        <SafeAreaView
          style={{
            marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
          }}
        />
        <ImageBackground
          resizeMode={'cover'}
          source={require('../background2.png')}
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
            <Text style={{ fontSize: 25, alignSelf: 'center' }}>Kayıt Ol</Text>
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
            placeholder="Ilk Adınız"
            onChangeText={(text) => {
              this.setState({ name: text });
            }}
          ></TextInput>
          <View
            style={{
              width: 70,
              alignSelf: 'center',
              backgroundColor: '#FB4570',
              height: 20,
              justifyContent: 'center',
              borderRadius: 10,
            }}
          >
            <Text style={{ fontSize: 10, alignSelf: 'center' }}>
              Kan Grubu
            </Text>
          </View>
          <SelectList
            dropdownTextStyles={{
              color: 'white',
            }}
            boxStyles={{
              backgroundColor: '#f74f74',
              borderColor: 'white',
              marginTop: 5,
              width: 300,
              alignSelf: 'center',
            }}
            dropdownStyles={{
              backgroundColor: '#f74f74',
              top: 0,
              width: '100%',
            }}
            setSelected={(val) => {
              this.setState({ blood_Type: val });
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
            placeholder="Telefon (ülke kodu ile)"
            onChangeText={(text) => {
              this.setState({ phone: text });
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
         <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
      >
        <View style={{ flex: 1, justifyContent: 'center' }}>
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
            placeholder="Şifreyi Onayla"
            onChangeText={(text) => {
              this.setState({ confirmPassword: text });
            }}
            secureTextEntry
          />
        </View>
      </KeyboardAvoidingView>
          <View
            style={{
              width: 70,
              alignSelf: 'center',
              backgroundColor: '#FB4570',
              height: 20,
              justifyContent: 'center',
              borderRadius: 10,
            }}
          >
            <Text style={{ fontSize: 10, alignSelf: 'center' }}>Il
</Text>
          </View>

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
              marginTop: 5,
              width: 300,
              alignSelf: 'center',
            }}
            setSelected={(val) => {
              this.setState({ province: val });
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
        <View style={styles.checkboxContainer}>
  <CheckBox
           checked={this.state.checked}
           onPress={this.toggleCheckBox}
           iconType="material-community"
           checkedIcon="checkbox-outline"
           uncheckedIcon={'checkbox-blank-outline'}
         />
  <Text style={styles.checkboxText}>
    {' '}
    Hizmet şartlarını ve gizlilik politikasını okudum
{' '}
    <TouchableOpacity
      onPress={() =>
        Linking.openURL(
          'https://docs.google.com/document/d/1HpdDFk0sIfZpL6FvQpRYIk4hLVXo4vWR_28aXxfyBvw/edit?usp=sharing'
        )
      }>
      <Text style={styles.link}>Hizmet Şartları</Text>
    </TouchableOpacity>{' '}
    ve{' '}
    <TouchableOpacity
      onPress={() =>
        Linking.openURL(
          'https://docs.google.com/document/d/1gnyFqVbXAEgPz18Y33Q5Iso-bwGCeKWq9s6mcclZ4po/edit?usp=sharing'
        )
      }>
      <Text style={styles.link}>Gizlilik Politikası</Text>
    </TouchableOpacity>
  </Text>
</View>
<View
  style={{
    backgroundColor: '#FB6B90',
    height: 30,
    borderRadius: 10,
    width: 170,
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 20,
  }}>
  <TouchableOpacity
    onPress={() => {
      this.registerUser(
        this.state.name,
        this.state.blood_Type,
        this.state.email,
        this.state.phone,
        this.state.password,
        this.state.confirmPassword,
        this.state.province
      );
    }}>
    <Text style={styles.button}>Kayıt Ol</Text>
  </TouchableOpacity>
</View>
<View
  style={{
    backgroundColor: '#FB6B90',
    height: 30,
    borderRadius: 10,
    marginTop: 40,
    width: 170,
    alignSelf: 'center',
    justifyContent: 'center',
    marginBottom:20
  }}>
  <TouchableOpacity
    style={{}}
    onPress={() => {
      this.props.navigation.replace('Login');
    }}>
    <Text
      style={{
        color: 'white',
        fontWeight: 'bold',
        fontSize: 17,
        textDecorationLine: 'underline',
        alignSelf: 'center',
      }}>
      Hesabınız var mı?
    </Text>
  </TouchableOpacity>
</View>

</ImageBackground>
</View>
);
}
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FB8DA0' },
  text: { alignSelf: 'center', fontSize: 25, marginTop: 0 },
  button: {
    alignSelf: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 17,
  },
  textInput: {
    height: 40,
    margin: 12,
    borderWidth: 5,
    padding: 10,
    backgroundColor: 'white',
    borderColor: '#FB6B90',
    borderRadius: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    backgroundColor: 'white',
    marginTop: 20,
  },
  checkboxText: {
    fontSize: 16,
    marginLeft:-20
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});