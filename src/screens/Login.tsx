import {
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';

//navigation
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackItemList} from '../routes/AuthStack';

//dependencies
import Snackbar from 'react-native-snackbar';
import {AppWriteContext} from '../app_write/AppWriteContext';
import {executeNativeBackPress} from 'react-native-screens';

type LoginScreenProps = NativeStackScreenProps<AuthStackItemList, 'Login'>;

const Login = ({navigation}: LoginScreenProps) => {
  const {appWrite, setIsLoggedIn} = useContext(AppWriteContext);
  //states
  const [error, setError] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = () => {
    if (email.length < 1 || password.length < 1) {
      setError('All fields are required');
    } else {
      const user = {
        email,
        password,
      };
      appWrite
        .loginUserAccount(user)
        .then((response: any) => {
          if (response) {
            setIsLoggedIn(true);
            Snackbar.show({
              text: 'Login success.',
              duration: Snackbar.LENGTH_SHORT,
            });
          }
        })
        .catch(e => {
          console.log('Error occured :: handleLogin:: ' + e);
          setError('Incorrect email or password.');
        });
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.appName}>App Write Auth</Text>
        {/* email  */}
        <TextInput
          value={email}
          style={styles.input}
          placeholder="Enter email"
          placeholderTextColor="#AEAEAE"
          keyboardType="email-address"
          cursorColor="#000000"
          onChangeText={text => setEmail(text)}
        />

        {/* password */}
        <TextInput
          value={password}
          style={styles.input}
          placeholder="Enter password"
          placeholderTextColor="#AEAEAE"
          secureTextEntry
          cursorColor="#000000"
          onChangeText={text => setPassword(text)}
        />

        {/* login btn */}
        <Pressable style={styles.btn} onPress={handleLogin}>
          <Text style={styles.btnText}>Login</Text>
        </Pressable>

        {/* validation  */}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {/* sign up navigation  */}
        <Pressable
          onPress={() => {
            navigation.navigate('SignUp');
          }}
          style={styles.signUpContainer}>
          <Text style={styles.noAccountLabel}>
            Don't have an account? {'  '}
            <Text style={styles.signUpLabel}>Create an account</Text>
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  formContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    height: '100%',
  },
  appName: {
    color: '#f02e65',
    fontSize: 40,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fef8fa',
    padding: 10,
    height: 40,
    alignSelf: 'center',
    borderRadius: 5,
    borderWidth: .8, 
    borderColor: '#000000',
    width: '80%',
    color: '#000000',

    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 1,
  },
  errorText: {
    color: 'red',
    alignSelf: 'center',
    marginTop: 10,
  },
  btn: {
    backgroundColor: '#ffffff',
    padding: 10,
    height: 45,

    alignSelf: 'center',
    borderRadius: 5,
    width: '80%',
    marginTop: 20,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 3,
  },
  btnText: {
    color: '#484848',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  signUpContainer: {
    marginTop: 80,
  },
  noAccountLabel: {
    color: '#484848',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 15,
  },
  signUpLabel: {
    color: '#1d9bf0',
  },
});
