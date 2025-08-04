// screens/CapturedImageScreen.tsx
import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';

export default function ImageCapturedScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { imageUri } = route.params;

  const handleUpload = () => {
    navigation.navigate('Upload Success');
  };

  return (
    <>
      <View style={styles.topSection}>
        <Text style={styles.label}>FACIAL ATTRIBUTES</Text>
        <Text style={styles.title}>Let’s add a Photo</Text>
      </View>
      <View style={styles.container}>
        {/* Captured Image */}
        <View style={styles.imageWrapper}>
          <Image source={{ uri: imageUri ? imageUri : "" }} style={styles.image} />
        </View>

        {/* Upload Button */}
        <Pressable style={styles.button} onPress={handleUpload}>
          <Text style={styles.buttonText}>UPLOAD</Text>
        </Pressable>
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
    borderBottomColor: '#888',
  },
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 12,
    color: '#ccc',
    marginBottom: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 10,
    color: "#000",
  },
  imageWrapper: {
    borderWidth: 2,
    borderColor: 'green',
    borderRadius: 150,
    width: 220,
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginTop: 30,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  button: {
    width: '100%',
    backgroundColor: '#111',
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    letterSpacing: 1,
  },
});
