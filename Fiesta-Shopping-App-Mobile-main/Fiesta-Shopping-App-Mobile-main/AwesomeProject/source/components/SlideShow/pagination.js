import React, { useEffect } from 'react';
import {View, TouchableOpacity, Text} from 'react-native';

const Pagination = (props) => {
  const {data, indexP, setNewIndex,enablePagination}= props;
  const onHandlePress = index => {
    setNewIndex(index); // Gọi hàm callback để truyền dữ liệu lên cha
  };

  
  return (
    <View style={styles.container}>
      {data.map((_, index) => {
        return (
          <View
          key={index}
          style={[
            enablePagination == true  ? {} : { display: 'none' },
            // { opacity: index === indexP ? 1 : 0.5 },

          ]}
          >
            <TouchableOpacity

              key={index.toString()}
              style={[
                 index === indexP ? styles.dot : {  },
                { opacity: index === indexP ? 1 : 0.5 },

              ]}
              
              onPress={() => onHandlePress(index)} // Gọi hàm khi TouchableOpacity được nhấn (Truyền vị trí dots)
            >
              <View 
              style={[
                enablePagination == true ? styles.miniDots : { display: 'none' },
                { opacity: index === indexP ? 1 : 0.7 },
              ]}            
              >

              </View>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

export default Pagination;

const styles = {
  miniDots:{
    backgroundColor: '#afafaf',
    width: 8,
    height: 8,
    borderRadius: 6,
    marginHorizontal: 5,
  },
  dot: {
    justifyContent:'center',
    width: 16,
    height: 16,
    borderRadius: 16,
    marginHorizontal: 5,
    borderColor:'white',
    alignItems:'center',
    borderWidth:1,
  },
  container: {
    // Looix 
    marginTop:-110,
    marginBottom:50,
    // 
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
};
