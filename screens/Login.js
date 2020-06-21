import {
    View,
    AsyncStorage
  } from 'react-native';
  import React,{Component} from 'react';
  import { Button, TextInput } from 'react-native-paper';
  import IIcon from 'react-native-vector-icons/FontAwesome';
  import LoginStore from '../src/store/LoginStore';
  import IlacStore from '../src/store/IlacStore';
  import axios from 'axios';
//import { Icon } from 'react-native-paper/lib/typescript/src/components/Avatar/Avatar';
import { observer } from 'mobx-react';
import { runInAction } from 'mobx';
import Toast, {DURATION} from 'react-native-easy-toast';
import User from '../models/User';
import DoctorProfile from '../models/DoctorProfile';
import { CommonActions} from '@react-navigation/native'

@observer
export default class Login extends Component 
  {
    constructor(props) {
      super(props);
      this.state = {
        kullaniciAdi: '',
        sifre: '',
        loginLoading: false,
        kayitDisplay: 'none',
        loginDisplay: 'flex',
        errorPlaceholder: 'white',
        newUsername:'',
        newPassword:'',
        newMailAdress:'',
        newTelephoneNumber:'',
        newPersonalName:'',
        newPersonalSurname:'',
        newIdentity:'',
        newBirthDate:'',
        newPhoto:'',
        backgroundDisplay:355
      };
    }
    onPressGiris = ({navigation}) =>
    {
      //LoginStore.Login(this.state.kullaniciAdi,this.state.sifre , {navigation});
      //navigation.navigate("HomeScreen");
      this.Login();
    }
    Login =  () => 
    {
      let identity = this.state.kullaniciAdi;
      let pass = this.state.sifre;
      //console.log(`http://eksa.ml/api/Home/Login?identity=${identity}&pass=${pass}`);
      
      axios.get(`http://matmaca.com/api/Home/Login?identity=${identity}&pass=${pass}`)
      .then(response => response.data)
      .then(data => {
        console.log(data);
        if(data != null && data != "")
        {
          console.log("data => " + data)
           this._loadData(data);
           AsyncStorage.setItem('@isLoggin' , '1');
           AsyncStorage.setItem('@token' , data);

          runInAction(() => {LoginStore.login = true});
          IlacStore._fillIlac(identity);
          this.props.navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [
                { name: 'HomeScreen' },
              ],
            })
          );
          //this.props.navigation.navigate("HomeScreen");
        }else
        {
          this.refs.toast.show('Girilen bilgiler geçersiz..');
        }
      } ,err => {
        alert("Oops bir hata ile karşılaşıldı..." + err);
      })

    }
    _loadData = (data) =>  
    {
        //let token = await AsyncStorage.getItem('@token');
        axios.get(`http://matmaca.com/api/Home/getUser?token=${data}`)
        .then(res => res.data[0])
        .then( res => {
            if(res.id != 0)
            {
                let model = new User(res.id , res.isActivity , res.userBirthDate , res.userEmail , res.userIdentityNumber , res.userImageSource , res.userPersonalName , res.userPersonalSurname , res.userPhoneNumber , res.userRol );
                runInAction( () => { LoginStore.kisi = model; LoginStore.isim = model.getfullName(); LoginStore.rol = model.userRol == 2 ? 'Doktor':'Hasta'; });
                if(model.userRol == 2)
                {
                  this._loadDoctor(model.userIdentityNumber);
                }
            }
        },err=>{
            alert("Oops bir şeyler ters gitti..")
        })
    }
    _loadDoctor = (identity) =>
    {
      console.log("Load Doctor");
      axios.get(`http://matmaca.com/api/Home/getDoctorP?identity=${identity}`)
      .then(res => res.data[0])
      .then( res=>{
        //constructor( identityNumber ,name , surname , title , section , hospital , adresse , district , province)
        let model = new DoctorProfile(identity , res.name , res.surname , res.title , res.section , res.hospital , res.adresse , res.district , res.province);
        runInAction( () => {LoginStore.doctorProfile = model});
      },err=>{
        alert("Oops bir şeyler ters gitti..")
      })
    }
    setStorage = async (data) =>
    {
      await AsyncStorage.setItem('@isLoggin' , JSON.stringify('1'));
      await AsyncStorage.setItem('@token' , JSON.stringify(data));

      console.log("Login içerisinde");
      console.log(AsyncStorage.getItem('@token'));
      console.log(AsyncStorage.getItem('@isLoggin'));
    }

    validateEmail = () => {
    var re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d$&+,:;=?@#|'<>.^*()%!-]{8,}$/;
      if(!re.test(this.state.newPassword))
      {
          alert('En Az Bir Sayı,Karekter İçermeli Ve Uzunluğu En Az 8 Karakter Olmalıdır');
          this.setState({newPassword:''})
      }
  };
 

   signIn = () => 
   {
     this.setState({ loginLoading: true });
      axios.get(`http://matmaca.com/api/Home/addUser?userIdentityNumber=${this.state.newIdentity}&userPersonalName=${this.state.newPersonalName}&userPersonalSurname=${this.state.newPersonalSurname}&userPhoneNumber=${this.state.newTelephoneNumber}&userEmail=${this.state.newMailAdress}&userBirthDate=${this.state.newBirthDate}&userPassword=${this.state.newPassword}&userImageSource=${this.state.newPhoto}`)
      .then(res => res.data)
      .then(res => {
        if(res)
        {
          this.refs.toast.show('Kayıt Başarılı');
          this.setState({
            kullaniciAdi: '',
            sifre:'',
            newMailAdress:'',
            newPassword:'',
            newPersonalName:'',
            newPersonalSurname:'',
            newTelephoneNumber:'',
            newIdentity:'',
            newBirthDate:'',
            newPhoto:'',
            kayitDisplay:'none',
            loginDisplay:'flex',
            loginLoading:false,
            backgroundDisplay:355
          });
        }else
        {
          this.refs.toast.show('Kayıt Başarısız.Kimlik Numaranızı kontrol ediniz...');
        }

        
      }, err => {
        alert("Oops bir hata ile karşılaşıldı..." + err);
      })
   }
   fetchData4 = (text) => {
     this.setState({ loginLoading: true });
     if(this.state.newPersonalName != "" && this.state.newPersonalSurname != "")
     {
      fetch(
        'https://www.matmaca.com/api/Users/PostUser?userName=' +
          this.state.newUsername +
          '&userPassword=' +
          this.state.newPassword +
          '&userMailAdress=' +
          this.state.newMailAdress +
          '&userPhoneNumber=' +
          this.state.newTelephoneNumber +
           '&userMailAdress=' +
          this.state.newMailAdress +
           '&userPersonalName=' +
          this.state.newPersonalName +
           '&userPersonalSurname=' +
          this.state.newPersonalSurname +''
      )
        .then(response => response.json())
        .then(responseJson => {
          this.setState({
            kullaniciAdi: this.state.newUsername,
            sifre:this.state.newPassword,
            newMailAdress:'',
            newPassword:'',
            newPersonalName:'',
            newPersonalSurname:'',
            newTelephoneNumber:'',
            newUsername:'',
            kayitDisplay:'none',
            loginDisplay:'flex',
            loginLoading:false
          });
        this.props.navigation.navigate('Reservation', {
              username: this.state.kullaniciAdi,
              password: this.state.sifre
            });
            AsyncStorage.setItem('username',this.state.kullaniciAdi);
        })
        .catch(error => console.log(error));
      }
      else
      {
          alert('Alanlar Boş Geçilemez !');
          this.setState({ loginLoading: false });
      }
  }

    render() {
      let {navigation} = this.props;
      return (
        <View style={{ flex: 1, backgroundColor: 'transparent' }}>
          <View style={{ width: '100%', height: '100%', position: 'absolute' }}>
            <View
              style={{
                width: '100%',
                height: '100%',
                backgroundColor:'#266390',
              }}
              
            />
             <IIcon name="stethoscope" size = {this.state.backgroundDisplay} color="rgb(200,200,200)"
              style={{
                width: '90%',
                height: '50%',
                marginLeft:'18%',
                marginTop:'5%',
                position:'absolute',
              }}
              resizeMethod={'scale'}
              source={require('../assets/icons8-stethoscope-64.png')}
            />
          </View>
          <View
            style={{
              width: '100%',
              height: '60%',
              marginTop: '95%',
              display: this.state.loginDisplay,
            }}>
            <TextInput
              label="Kullanıcı Adı"
              mode="flat"
              style={{ backgroundColor: 'transparent' }}
              selectionColor="white"
              underlineColor={this.state.errorPlaceholder}
              value={this.state.kullaniciAdi}
              onChangeText={text =>
                this.setState({ kullaniciAdi: text, errorPlaceholder: 'white' })
              }
              theme={{
                colors: {
                  text: this.state.errorPlaceholder,
                  placeholder: 'white',
                  primary: 'white',
                },
              }}
            />
            <TextInput
              mode="flat"
              style={{
                backgroundColor: 'transparent',
                marginTop: 10,
                color: 'white',
              }}
              label="Şifre"
              value={this.state.sifre}
              onChangeText={text =>
                this.setState({ sifre: text, errorPlaceholder: 'white' })
              }
              selectionColor="white"
              underlineColor={this.state.errorPlaceholder}
              secureTextEntry={true}
              theme={{
                colors: {
                  text: this.state.errorPlaceholder,
                  placeholder: 'white',
                  primary: 'white',
                },
              }}
            />
            <Button
              icon="account-circle-outline"
              uppercase={false}
              mode="outlined"
              loading={this.state.loginLoading}
              onPress={() => { this.onPressGiris({navigation});}}
              color={'black'}
              style={{
                marginTop: 50,
                backgroundColor: 'white',
                marginLeft: '5%',
                width: '90%',
                color: 'black',
              }}>
              Giriş Yap
            </Button>
            <Button
              icon="lock"
              mode="outlined"
              uppercase={false}
              onPress={() =>
                this.setState({ kayitDisplay: 'flex', loginDisplay: 'none',backgroundDisplay:0 })
              }
              color={'black'}
              style={{
                marginTop: 10,
                backgroundColor: 'white',
                color: 'black',
                marginLeft: '5%',
                width: '90%',
              }}>
              Kayıt Ol
            </Button>
          </View>
          <View
            style={{
              width: '100%',
              height: '100%',
              marginBottom: '60%',
              marginTop: '3%',
              display: this.state.kayitDisplay,
              paddingLeft:20,
              paddingRight:20,
              opacity:10
            }}>
            <TextInput
              mode="flat"
               style={{ backgroundColor: 'transparent',borderRadius:15,marginTop:10,opacity:5 }}
              label="Adınız"
              value={this.state.newPersonalName}
              onChangeText={text => this.setState({ newPersonalName: text })}
              selectionColor="white"
              underlineColor="white"
              theme={{
                colors: { text: 'white', placeholder: 'white', primary: 'white' },
              }}
            />
             <TextInput
              mode="flat"
               style={{ backgroundColor: 'transparent',borderRadius:15,marginTop:10,opacity:5 }}
              label="Soyadınız"
              value={this.state.newPersonalSurname}
              onChangeText={text => this.setState({ newPersonalSurname: text })}
              selectionColor="white"
              underlineColor="white"
              theme={{
                colors: { text: 'white', placeholder: 'white', primary: 'white' },
              }}
            />
            
            <TextInput
              label="Kimlik Numaranız"
              mode="flat"
              style={{ backgroundColor: 'transparent',borderRadius:15,opacity:5,marginTop:10 }}
              selectionColor="white"
              underlineColor="white"
              value={this.state.newIdentity}
              onChangeText={text => this.setState({ newIdentity: text })}
              theme={{
                colors: { text: 'white', placeholder: 'white', primary: 'white' },
              }}
            />
               
            <TextInput
              label="E-Mail"
              mode="flat"
               style={{ backgroundColor: 'transparent',borderRadius:15,marginTop:10,opacity:5 }}
              selectionColor="white"
              underlineColor="white"
              value={this.state.newMailAdress}
              onChangeText={text => this.setState({ newMailAdress: text })}
              theme={{
                colors: { text: 'white', placeholder: 'white', primary: 'white' },
              }}
            />
            <TextInput
              mode="flat"
               style={{ backgroundColor: 'transparent',borderRadius:15,marginTop:10,opacity:5 }}
              label="Telefon Numarası"
              value={this.state.newTelephoneNumber}
              onChangeText={text => this.setState({ newTelephoneNumber: text })}
              selectionColor="white"
              underlineColor="white"
              theme={{
                colors: { text: 'white', placeholder: 'white', primary: 'white' },
              }}
            />
            <TextInput
              mode="flat"
               style={{ backgroundColor: 'transparent',borderRadius:15,marginTop:10,opacity:5 }}
              label="Doğum Tarihi"
              value={this.state.newBirthDate}
              onChangeText={text => this.setState({ newBirthDate: text })}
              selectionColor="white"
              underlineColor="white"
              theme={{
                colors: { text: 'white', placeholder: 'white', primary: 'white' },
              }}
            />
            <TextInput
              mode="flat"
               style={{ backgroundColor: 'transparent',borderRadius:15,marginTop:10,opacity:5 }}
              label="Fotoğraf"
              value={this.state.newPhoto}
              onChangeText={text => this.setState({ newPhoto: text })}
              selectionColor="white"
              underlineColor="white"
              theme={{
                colors: { text: 'white', placeholder: 'white', primary: 'white' },
              }}
            />
            <TextInput
              mode="flat"
               style={{ backgroundColor: 'transparent',borderRadius:15,marginTop:10,opacity:5 }}
              label="Şifre"
              secureTextEntry={true}
              value={this.state.newPassword}
              onChangeText={text => this.setState({ newPassword: text })}
              selectionColor="white"
              underlineColor="white"
              theme={{
                colors: { text: 'white', placeholder: 'white', primary: 'white' },
              }}
            />
            
              
            <Button
              icon="lock"
              loading={this.state.loginLoading}
              mode="outlined"
              onPress={() => {this.signIn()}}
              color={'black'}
              style={{
                marginTop: 50,
                backgroundColor: 'white',
                color: 'black',
                marginRight:'5%'
              }}>
              Kayıt Ol
            </Button>
             <Button
              color={'black'}
              icon="account-circle-outline"
              mode="outlined"
              onPress={() =>
                this.setState({ kayitDisplay: 'flex', loginDisplay: 'flex',loading:true,backgroundDisplay:355 })
              }
              style={{
                marginTop: 10,
                backgroundColor: 'white',
                color: 'black',
                marginRight:'5%'
              }}>
              Giriş Yap
            </Button>
            
          </View>
          <Toast ref="toast"/>
        </View>
      );
    }
  }
 
