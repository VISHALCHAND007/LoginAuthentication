import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';

//theme
import {FAB, Image} from '@rneui/base';
import Snackbar from 'react-native-snackbar';

//appwrite
import {AppWriteContext} from '../app_write/AppWriteContext';
import {SafeAreaView} from 'react-native-safe-area-context';

type UserObj = {
  name: string;
  email: string;
};

const Home = () => {
  const [userData, setUserData] = useState<UserObj>();
  const {appWrite, setIsLoggedIn} = useContext(AppWriteContext);

  useEffect(() => {
    appWrite.getUserDetails().then(respose => {
      if (respose) {
        setIsLoggedIn(true);
        const user: UserObj = {
          name: respose.name,
          email: respose.email,
        };
        setUserData(user);
      }
    });
  }, [appWrite]);

  const handleLogout = () => {
    appWrite.logout().then(() => {
      setIsLoggedIn(false);
      Snackbar.show({
        text: 'Logout successful.',
        duration: Snackbar.LENGTH_SHORT,
      });
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.welcomeContainer}>
        <Image
          source={{
            uri: 'https://t4.ftcdn.net/jpg/03/08/69/75/360_F_308697506_9dsBYHXm9FwuW0qcEqimAEXUvzTwfzwe.jpg',
            cache: 'default',
          }}
          style={{width: 400, height: 300}}
          resizeMode="contain"
        />
        <Text style={styles.message}>
          Build Fast. Scale Big. All in One Place.
        </Text>
        {userData && (
          <View style={styles.userContainer}>
            <Text style={styles.userDetails}>Name: {userData.name}</Text>
            <Text style={styles.userDetails}>Email: {userData.email}</Text>
          </View>
        )}
      </View>
      <FAB
        size="large"
        placement="right"
        color="#f02e65"
        title="Logout"
        icon={{name: 'logout', color: '#FFFFFF'}}
        onPress={handleLogout}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0D32',
  },
  welcomeContainer: {
    padding: 12,
    flex: 1,
    alignItems: 'center',
  },
  message: {
    fontSize: 22,
    fontWeight: 500,
    color: '#ffffff',
  },
  userContainer: {
    marginTop: 24,
  },
  userDetails: {
    fontSize: 20,
    color: '#ffffff',
  },
});
