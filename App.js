import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Modal,
} from 'react-native';
import React, {useState, useEffect} from 'react';
// import {db, app, authentication} from './src/components/firebase';
import {addDoc, collection, doc, setDoc} from '@firebase/firestore';
import {Textarea} from './src/components/Textarea';
import {Button} from './src/components/Button';
import firestore from '@react-native-firebase/firestore';
import TodoItem from './src/components/TodoItem';
import DialogInput from 'react-native-dialog-input';

const App = () => {
  // states
  const [databaseData, setDatabaseData] = useState([]);
  const [user, setuser] = useState({name: '', email: '', id: ''});

  //Refs
  //Functions
  const onPressHandler = () => {
    console.log(user.name,user.email)
    if (user.name == '' || user.email == '') {
      return alert('name or email in empty');
    } else {
      // Adding Data with random id
      firestore()
        .collection('Users')
        .add({
          name: user.name,
          email: user.email,
        })
        .then(() => {
          console.log('User added!');
          setuser({name:'',email:''})
          getData()
        })
        .catch(err => {
          console.log(err);
        });
      
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
  };
  const getData = async () => {
    const users = await firestore().collection('Users').get();
    setDatabaseData(users.docs);

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
  };
  const [newInputName, setnewInputName] = useState('');
  const [newInputEmail, setnewInputEmail] = useState('')
  const [modal, setmodal] = useState(false);
  const showModal = (item, index) => {
    setmodal(true);
    setuser({name: item.data().name, email: item.data().email, id: item.id});
  };
  const updateData = () => {
    // console.log(item.data().name)
    // let name1 = item.data().name
    firestore()
      .collection('Users')
      .doc(user.id)
      .update({
        name: newInputName,
        email:newInputEmail
      })
      .then(() => {
        console.log('User updated!');
        getData();
        setmodal(false);
        setuser({name:"",email:""})
      });
  };
  const delData = (item, index) => {
    console.log(index);
    console.log(typeof item.id);
    // let itemCopy = [...databaseData];
    // itemCopy.splice(index, 1);
    // setDatabaseData(itemCopy);
    firestore()
      .collection('Users')
      .doc(item.id)
      .delete()
      .then(() => {
        console.log('User deleted');
        getData();
      });
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      {/* <DialogInput isDialogVisible={modal}
            title={"Update Name"}
            hintInput ={"change Name"}
            submitInput={ (e) => {setnewInputName(e)}}
            closeDialog={ () => {updateData()}}

            >

</DialogInput> */}
      <Modal visible={modal} >
        <View
          style={{
            position:'absolute',
            top:"30%",
            width: '100%',
            height: '40%',
            backgroundColor: 'grey',
            // justifyContent: 'center',
            alignItems: 'center',
            paddingTop:25
          }}>
          <TextInput
          placeholder='Change Name'
            value={newInputName}
            onChangeText={e => {
              setnewInputName(e);
            }}
            style={{backgroundColor:"white",width:"85%",borderRadius:12,marginBottom:10}}
          />
          <TextInput
          placeholder='Change Email'
            value={newInputEmail}
            onChangeText={e => {
              setnewInputEmail(e);
            }}
            style={{backgroundColor:"white",width:"85%",borderRadius:12,marginBottom:10}}
          />
          <Button
            color={'pink'}
            text={'change data'}
            onPress={() => {
              updateData();
            }}
            style={{height: '20%',marginBottom:10}}
          />
          <Button
            color={'red'}
            text={'Close'}
            onPress={() => {
              setmodal(false)
              setnewInputEmail(''),
              setnewInputName('')
            }}
            style={{height: '15%'}}
          />
        </View>
      </Modal>
      {/* Form */}
      <Textarea
        color={'white'}
        placeholder={'Enter Name'}
        placeholderColor={'black'}
        value={user.name}
        borderRadius={12}
        onChangeText={e => {
          setuser({...user, name:e});
        }}
      />
      <Textarea
        color={'white'}
        placeholder={'Enter Email'}
        placeholderColor={'black'}
        value={user.email}
        borderRadius={12}
        onChangeText={e => {
          setuser({...user, email:e});
        }}
      />
      <Button
        color={'pink'}
        style={{marginTop: 15, width: 100, height: 50}}
        text={'Submit'}
        textColor={'black'}
        onPress={() => {
          onPressHandler();
        }}
      />
      <ScrollView style={{width: '99%'}} showsVerticalScrollIndicator={false}>
        {databaseData.map((item, index) => {
          return (
            <TodoItem
              text={item._data.name}
              desc={item._data.email}
              key={index}
              onPress={() => delData(item, index)}
              onPressEdit={() => {
                showModal(item, index);
              }}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent:'center',
    alignItems: 'center',
    backgroundColor: 'grey',
  },
});
