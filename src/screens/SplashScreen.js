import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';

export default function SplashScreen() {
  const navigation = useNavigation();
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 0.02;
        if (next >= 1) {
          clearInterval(interval);
          setDone(true); // Flag triggers navigation
        }
        return next;
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);
    
    // Navigate after progress completes
  useEffect(() => {
    if (done) {
      const timeout = setTimeout(() => {
        navigation.navigate('Intro');
      }, 300); // Optional delay for smoother UX
      return () => clearTimeout(timeout);
    }
  }, [done]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/splash.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.text}>Loading brands...</Text>
      <Progress.Bar
        progress={progress}
        width={250}
        height={10}
        color="#000"
        unfilledColor="#ddd"
        borderWidth={0}
        borderRadius={5}
        style={styles.progress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  image: { width: '80%', height: 300 },
  text: { fontSize: 18, fontWeight: 'bold', marginTop: 30 },
  progress: { marginTop: 20 },
});
