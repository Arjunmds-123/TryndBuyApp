import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import * as Progress from 'react-native-progress';

export default function UploadSuccess() {
    const navigation = useNavigation();
    const [progress, setProgress] = useState(0);

    const handleClose = () => {
        navigation.goBack(); // Or navigation.navigate('Home')
    };

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
                navigation.navigate('Product Landing');
            }, 300); // Optional delay for smoother UX
            return () => clearTimeout(timeout);
        }
    }, [done]);

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
                <Ionicons name="close" size={28} color="#000" />
            </TouchableOpacity>
            <View>
                {/* <MaterialIcons name="check" size={60} color="#0E7737" /> */}
                <Image
                    source={require('../../assets/success.png')}
                    resizeMode="contain"
                    style={styles.successIcon}
                />
            </View>
            <Text style={styles.title}>Selfie captured perfectly!</Text>
            <Text style={styles.subtitle}>Let’s build your own fashion avatar.</Text>
            <Progress.Bar
                progress={progress}
                width={280}
                height={8}
                borderRadius={50}
                color="#000"
                unfilledColor="#ddd"
                borderWidth={0}
                animated
                style={{ marginTop: 40 }}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
    },
    closeButton: {
        position: 'absolute',
        top: 50,
        right: 24,
    },
    checkCircle: {
        borderWidth: 3,
        borderColor: '#0E7737',
        borderRadius: 100,
        width: 150,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 32,
    },
    title: {
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'center',
        marginBottom: 6,
    },
    subtitle: {
        fontSize: 16,
        color: '#444',
        textAlign: 'center',
    },
    successIcon: {
        width: 150,
        height: 150,
        marginBottom: 32,
    },
});
