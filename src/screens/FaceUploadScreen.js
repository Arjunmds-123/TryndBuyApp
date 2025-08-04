import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function FaceUploadScreen() {
  const navigation = useNavigation();
  const [imageUri, setImageUri] = useState(null);

  const handleImagePick = async (fromCamera = false) => {
    const permission = fromCamera
      ? await ImagePicker.requestCameraPermissionsAsync()
      : await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert('Permission required', 'Please allow access to proceed.');
      return;
    }

    const result = await (fromCamera
      ? ImagePicker.launchCameraAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images })
      : ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images }));

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      const uri = result.assets[0].uri;
      navigation.navigate('Image Captured', { imageUri: uri });
    }
  };

  return (
    <>
      {/* Top Section */}
      <View style={styles.topSection}>
        <Text style={styles.label}>FACIAL ATTRIBUTES</Text>
        <Text style={styles.title}>Let’s add a Photo</Text>
      </View>
      <View style={styles.container}>
        {/* Image Upload */}
        <Pressable style={styles.uploadContainer} onPress={() => handleImagePick(false)}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.image} />
          ) : (
            <>
              <View style={styles.plusCircle}>
                <Entypo name="plus" size={24} color="#fff" />
              </View>
              <Text style={styles.placeholder}>Add an image</Text>
            </>
          )}
        </Pressable>

        {/* Bottom Buttons */}
        <View style={styles.buttonRow}>
          <Pressable style={styles.iconButton} onPress={() => handleImagePick(false)}>
            <Image
              source={require('../../assets/Camera.png')}
              resizeMode="contain"
              style={styles.icons}
            />
            <Text style={styles.buttonText}>From Gallery</Text>
          </Pressable>

          <Pressable style={styles.iconButton} onPress={() => handleImagePick(true)}>
            <Image
              source={require('../../assets/photo.png')}
              resizeMode="contain"
              style={styles.icons}
            />
            <Text style={styles.buttonText}>Take a selfie</Text>
          </Pressable>
        </View>
      </View>
    </>
    
  );
}

const styles = StyleSheet.create({
  topSection: {
    paddingTop: 60,
    paddingLeft: 20,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 20,
  },
  label: {
    fontSize: 12,
    color: '#ccc',
    marginBottom: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#888',
    marginBottom: 10,
  },
  uploadContainer: {
    width: 180,
    height: 240,
    borderWidth: 2,
    borderColor: '#ddd',
    borderStyle: 'dashed',
    borderRadius: 90,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafafa',
  },
  plusCircle: {
    width: 40,
    height: 40,
    backgroundColor: '#ccc',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  placeholder: {
    fontSize: 14,
    color: '#aaa',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 90,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 60,
    width: '80%',
    justifyContent: 'space-around',
  },
  iconButton: {
    alignItems: 'center',
  },
  buttonText: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '500',
  },
  icons: {
    width: 40,
    height: 40,
  },
});

