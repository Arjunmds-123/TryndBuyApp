import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import screens
import SplashScreen from './src/screens/SplashScreen';
import FaceUploadScreen from './src/screens/FaceUploadScreen';
import ImageCapturedScreen from './src/screens/ImageCapturedScreen';
import UploadSuccess from './src/screens/UploadSuccess';
import ProductLandingScreen from './src/screens/ProductLandingScreen';
import IntroductionScreen from './src/screens/IntroScreen';
// import ProductLandingScreen from './src/screens/_ProductLandingScreen';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Intro" component={IntroductionScreen} />
        <Stack.Screen name="Face Upload" component={FaceUploadScreen} />
        <Stack.Screen name="Image Captured" component={ImageCapturedScreen} />
        <Stack.Screen name="Upload Success" component={UploadSuccess} />
        <Stack.Screen name="Product Landing" component={ProductLandingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
