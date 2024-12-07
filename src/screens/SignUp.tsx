import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';

//theme
import {FAB} from '@rneui/base';

//navigation
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackItemList} from '../routes/AuthStack';

//app write context
import {AppWriteContext} from '../app_write/AppWriteContext';
import Snackbar from 'react-native-snackbar';

type SignUpProps = NativeStackScreenProps<AuthStackItemList, 'SignUp'>;

const SignUp = ({navigation}: SignUpProps) => {
  //states
  const {appWrite, setIsLoggedIn} = useContext(AppWriteContext);

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSignUp = () => {
    if (
      name.length < 1 ||
      email.length < 1 ||
      password.length < 1 ||
      repeatPassword.length < 1
    ) {
      setError('All fields are required.');
    } else if (password != repeatPassword) {
      setError("Passwords doesn't match");
    } else {
      const user = {
        name,
        email,
        password,
      };
      //creating account
      appWrite
        .createAccount(user)
        .then((response: any) => {
          if (response) {
            setIsLoggedIn(true);
            Snackbar.show({
              text: 'SignUp success.',
              duration: Snackbar.LENGTH_SHORT,
            });
          }
        })
        .catch(e => {
          console.log('Error:: SignUp ::handleSignUphandleSignUp' + e);
          setError(e.message);
        });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.appName}>AppWrite Auth</Text>

        {/* Name */}
        <TextInput
          value={name}
          placeholder="Enter name"
          placeholderTextColor="#AEAEAE"
          style={styles.input}
          cursorColor="grey"
          onChangeText={text => {
            setError('');
            setName(text);
          }}
        />

        {/* Email */}
        <TextInput
          value={email}
          placeholder="Enter email"
          placeholderTextColor="#AEAEAE"
          style={styles.input}
          keyboardType="email-address"
          onChangeText={text => {
            setError('');
            setEmail(text);
          }}
        />

        {/* Password */}
        <TextInput
          value={password}
          placeholder="Enter password"
          placeholderTextColor="#AEAEAE"
          style={styles.input}
          secureTextEntry
          onChangeText={text => {
            setError('');
            setPassword(text);
          }}
        />

        {/* Repead Password */}
        <TextInput
          value={repeatPassword}
          placeholder="Enter password again"
          placeholderTextColor="#AEAEAE"
          style={styles.input}
          secureTextEntry
          onChangeText={text => {
            setError('');
            setRepeatPassword(text);
          }}
        />

        {/* Validation error */}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <Pressable
          onPress={handleSignUp}
          style={[styles.btn, {marginTop: error ? 20 : 40}]}>
          <Text style={styles.btnText}>Sign Up</Text>
        </Pressable>

        {/* Login Navigation */}
        <Pressable onPress={() => navigation.navigate('Login')}>
          <Text style={styles.haveAccountLabel}>
            Already have an account? {'  '}
            <Text style={styles.loginLabel}>Login</Text>
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignUp;

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
    borderWidth: 0.8,
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
    marginTop: 10,

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
  loginContainer: {
    marginTop: 60,
  },
  haveAccountLabel: {
    color: '#484848',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 30
  },
  loginLabel: {
    color: '#1d9bf0',
  },
});
