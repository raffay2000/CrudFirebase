import {StyleSheet, Text, View, TextInput} from 'react-native';
import React, {useState,useEffect} from 'react';
// import {db, app, authentication} from './src/components/firebase';
import {addDoc,collection,doc,setDoc} from '@firebase/firestore'
import {Textarea} from './src/components/Textarea';
import {Button} from './src/components/Button';
import firestore from '@react-native-firebase/firestore';
import { async } from '@firebase/util';
import TodoItem from './src/components/TodoItem';


const App = () => {
  // states
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [databaseData,setDatabaseData] = useState([])
  //Refs
  //Functions
  const onPressHandler = async() =>{
if (name == "" || email == "") {
  return alert("name or email in empty")
}else{
  // Adding Data with random id
   firestore()
  .collection('Users')
  .add({
    name,
    email
  })
  .then(() => {
    console.log('User added!');
  }).catch((err)=>{
    console.log(err)
  })
  setname('')
  setemail('')
}
  // Adding data with unique id
  // firestore()
  // .collection('Users')
  // .doc('ABC')
  // .set({
  //   name,
  //   email
  // })
  // .then(() => {
  //   console.log('User added!');
  // });
  }
  const getData = async()=>{
    const users = await firestore().collection('Users').get().then((querySnapshot)=>{console.log('users: ',querySnapshot.size)
    setDatabaseData([...databaseData,querySnapshot])
    querySnapshot.forEach(documentSnapshot=>{
      console.log(
        documentSnapshot.id,"data : ",
        documentSnapshot.data()
      )
      console.log(documentSnapshot.data())
    })
  });
    console.log(users)

     // get Data with unique id
  // const userDocument = await firestore().collection('Users').doc("ABC").get();
  // console.log(userDocument._data.age)
 // setDatabaseData(userDocument)

  // get data on change 
  // firestore()
  // .collection('Users')
  // .get()
  // .then(querySnapshot => {
  //   console.log('Total users: ', querySnapshot.size);
  //   // setDatabaseData(querySnapshot)
  //   querySnapshot.forEach(documentSnapshot => {
  //     console.log('User ID: ',documentSnapshot.id, documentSnapshot.data());
  //     // setDatabaseData(documentSnapshot.data)
  //   });
  // });

  // get data on change with id
  // firestore()
  // .collection('Users')
  // .doc('ABC')
  // .get()
  // .then(documentSnapshot => {
  //   console.log('User exists: ', documentSnapshot.exists);
  //   if (documentSnapshot.exists) {
  //     console.log('User data: ', documentSnapshot.data());
  //   }
  // });

  }
  const update = ()=>{
    firestore()
  .collection('Users')
  .doc('ABC')
  .update({
    age: 3188,
  })
  .then(() => {
    console.log('User updated!');
  });
  }
  const delData = ()=>{
    firestore()
  .collection('Users')
  .doc('ABC')
  .delete()
  .then(() => {
    console.log('User deleted!');
  });
  }
  useEffect(() => {
    getData()
  }, [databaseData])
  
  return (
    <View style={styles.container}>
      {/* Form */}
      <Textarea
        color={'white'}
        placeholder={'Enter Name'}
        placeholderColor={'black'}
        value={name}
        borderRadius={12}
        onChangeText={(e)=>{setname(e)}}
      />
      <Textarea
        color={'white'}
        placeholder={'Enter Email'}
        placeholderColor={'black'}
        value={email}
        borderRadius={12}
        onChangeText={(e)=>{setemail(e)}}
      />
      <Button
        color={'pink'}
        style={{marginTop: 15, width: 100, height: 50}}
        text={'Submit'}
        textColor={'black'}
        onPress={()=>{onPressHandler()}}
      />
       <Button
        color={'pink'}
        style={{marginTop: 15, width: 100, height: 50}}
        text={'Get data'}
        textColor={'black'}
        onPress={()=>{getData()}}
      />
       <Button
        color={'pink'}
        style={{marginTop: 15, width: 100, height: 50}}
        text={'Get update'}
        textColor={'black'}
        onPress={()=>{update()}}
      />
       <Button
        color={'pink'}
        style={{marginTop: 15, width: 100, height: 50}}
        text={'Delete'}
        textColor={'black'}
        onPress={()=>{delData()}}
      />
      {
        databaseData.map((item,index)=>{
        return (<TodoItem desc={item.name} text={item.email} key={index}/>)
            // return <TouchableOpacity key={index}  onPress={() => onDelete()}>
            //         <TodoItem text={item} /> 
            //       </TouchableOpacity>
        })
      }
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
