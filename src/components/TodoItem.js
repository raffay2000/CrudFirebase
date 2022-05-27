import React from 'react'
import { Text,View ,StyleSheet,TouchableOpacity} from 'react-native'
// import { MaterialIcons } from '@expo/vector-icons';
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons"
import Feather from "react-native-vector-icons/Feather"


const TodoItem = ({text,desc,onPress,textDes,onPressEdit}) => {
  return (
      
        <View style={styles.container}>
        <View style={styles.todoItem}>
        <Text style={styles.textStyle}>
            {text}
        </Text>
        <View>
        <TouchableOpacity onPress={onPress}>
            <MaterialIcons name="delete" size={25} color="red" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressEdit} >
            <Feather name="edit" size={25} color="blue" />
        </TouchableOpacity>
        </View>
        </View>
        <View style={styles.descStyle}>
        <Text>
        {desc}
        </Text>
        </View>
    </View>  
  )
}
const styles= StyleSheet.create({
    container:{
        width:'94%',
        backgroundColor:'#999',
        borderRadius:12,
        marginHorizontal:12,
        marginVertical:6,
        paddingHorizontal:12,
        paddingVertical:12
        
    },
    todoItem:{

        flexDirection:'row',
        width:'100%',
        justifyContent:'space-between',
        alignItems:'center',
    },
    textStyle:{
        color:'#fff',
        fontSize:18
    },
    descStyle:{

        width:'100%',
        backgroundColor:'#999',
        borderRadius:12,
        color:'grey',
        padding:3
    }
    
    
})

export default TodoItem