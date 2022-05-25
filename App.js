import {StyleSheet, Text, View, TextInput} from 'react-native';
import React, {useState} from 'react';
import {db, app, authentication} from './firebase';
import {addDoc,collection} from 'firebase/firestore'
import {Textarea} from './src/components/Textarea';
import {Button} from './src/components/Button';


const App = () => {
  // states
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [address, setaddress] = useState('');
  const [age, setage] = useState();
  //Refs
  const docRef1 = collection(db,"users")
  //Functions
  const onPressHandler=async()=>{
    await addDoc(docRef1,{name,email,address,age})
  }
  return (
    <View style={styles.container}>
      {/* Form */}
      <Textarea
        color={'white'}
        placeholder={'Enter Name'}
        placeholderColor={'white'}
        value={name}
        onChangeText={(e)=>{setname(e)}}
      />
      <Textarea
        color={'white'}
        placeholder={'Enter Email'}
        placeholderColor={'white'}
        value={email}
        onChangeText={(e)=>{setemail(e)}}
      />
      <Textarea
        color={'white'}
        placeholder={'Enter Address'}
        placeholderColor={'white'}
        value={address}
        onChangeText={(e)=>{setaddress(e)}}
      />
      <Textarea
        color={'white'}
        placeholder={'Enter Age'}
        placeholderColor={'white'}
        value={age}
        onChangeText={(e)=>{setage(e)}}
      />
      <Button
        color={'pink'}
        style={{marginTop: 15, width: 100, height: 50}}
        text={'Submit'}
        textColor={'black'}
        onPress={onPressHandler}
      />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent:'center',
    alignItems: 'center',
    backgroundColor:"grey"
  },
});
