import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, Modal, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MetarialIcon } from '../icon/Material';

const ImageDisplayModal = ({ visible, onClose, imageArray,index }) => {
  const [selectedImage, setSelectedImage] = useState(imageArray[0]);
  useEffect(() => {
    setSelectedImage(imageArray[index])
    
  }, [index])
  

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <StatusBar hidden={true}/>
      <SafeAreaView style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
           <MetarialIcon
            size={30}
            color={'white'}
            name={"cancel"}
            
           />
          </TouchableOpacity>
          <Image source={{ uri: selectedImage.url }} style={styles.mainImage} />
          {
            imageArray.length >1 &&
            <FlatList
            data={imageArray}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => setSelectedImage(item)}>
                <Image
                  source={{ uri: item.url }}
                  style={[
                    styles.thumbnail,
                    { borderColor: item === selectedImage ? 'blue' : 'gray' },
                  ]}
                />
              </TouchableOpacity>
            )}
          />
          }
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '100%',
    backgroundColor: 'black',
    height:'100%',
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  textStyle: {
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
  },
  mainImage: {
    width: 400,
    height: 600,
    alignSelf:'center',
    resizeMode: 'contain',
    marginBottom: 15,
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderWidth: 2,
    marginHorizontal: 5,
  },
});

export default ImageDisplayModal;
