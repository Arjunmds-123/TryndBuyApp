import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { height, width } = Dimensions.get('window');

export default function IntroductionScreen() { 
    const navigation = useNavigation();

    const handleContinue = () => {
        navigation.navigate('Face Upload'); // Update this to your next screen
    };

    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/advisor.png')} // Replace with your image path
                style={styles.image}
                resizeMode="contain"
            />
            {/* Text box with button */}
            <View style={styles.textBox}>
                <View style={styles.textContent}>
                <Text style={styles.message}>
                    Hi, I am your fashion advisor. Let’s get you started with creating
                    your mix & match fashion avatar.
                </Text>
                </View>

                <TouchableOpacity onPress={handleContinue}>
                    <Image
                        source={require('../../assets/Arrow right-circle.png')}
                        resizeMode="contain"
                        style={styles.arrowButtonImage}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    image: {
        position: 'absolute',
        top: 0,
        width: width,
        height: height * 0.75,
    },
    textBox: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#999',
        borderRadius: 6,
        marginBottom: 40,
        marginHorizontal: 20,
        padding: 16,
        backgroundColor: '#fff',
    },
    textContent: {
        flex: 1,
    },
    message: {
        fontSize: 16,
        color: '#111',
        lineHeight: 22,
    },
    arrowButtonImage: {
        width: 42,
        height: 42,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
