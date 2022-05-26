import React from 'react'
import { Text,View ,StyleSheet,TouchableOpacity} from 'react-native'
// import { MaterialIcons } from '@expo/vector-icons';

const TodoItem = ({text,desc,onPress,textDes}) => {
  return (
      
        <View style={styles.container}>
        <View style={styles.todoItem}>
        <Text style={styles.textStyle}>
            {text}
        </Text>
        <TouchableOpacity onPress={onPress}>
            {/* <MaterialIcons name="delete" size={25} color="red" /> */}
        </TouchableOpacity>
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