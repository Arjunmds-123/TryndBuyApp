import { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ToastAndroid,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import NavItem from '../components/NavItemComponent';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Foundation from '@expo/vector-icons/Foundation';
import { useNavigation } from '@react-navigation/native';

const PRODUCT_API = 'https://t03.tryndbuy.com/api/GetMappedSKUDetails';
const AUTH_ID = '3c643a25e11144ad';


export default function ProductScreen() {
  const navigation = useNavigation();
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(PRODUCT_API, {
      headers: {
        authID: AUTH_ID,
      },
    })
      .then(res => res.json())
      .then(data => {
        // Assuming data.MappedSKUList is the array
        setItems(data.MappedSKUList || []);
      })
      .catch(err => {
        console.error('API fetch error:', err);
      });
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => ToastAndroid.show(`SKUID: ${String(item.SKUID)}`, ToastAndroid.SHORT)}
    >
      <Image
        source={'https://demo03.tryndbuy.com/images/Th' + String(item.SKUID) + '.jpg'}
        style={styles.itemImage}
        resizeMode="contain"
      />
      <Text style={styles.itemLabel}>{item.Cat}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name="chevron-left" size={16} color="grey" />
        </TouchableOpacity>
        <View style={styles.topBarContent}>
          <View style={styles.dataContent}>
            <Foundation name="dollar-bill" size={16} color="black" />
            <Text style={styles.topBarText}>5,000</Text>
          </View>
          <View style={styles.dataContent}>
            <FontAwesome6 name="ticket-simple" size={12} color="black" />
            <Text style={styles.topBarText}>225/100</Text>
          </View>
          <View style={styles.dataContent}>
            <Ionicons name="diamond" size={12} color="black" />
            <Text style={styles.topBarText}>1,200</Text>
          </View>
        </View>
        <View style={styles.topBarIcons}>
          <TouchableOpacity onPress={() => ToastAndroid.show('Cart', ToastAndroid.SHORT)}>
            <FontAwesome name="shopping-bag" size={16} color="#a14050" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => ToastAndroid.show('Help', ToastAndroid.SHORT)}>
            <FontAwesome name="question-circle" size={16} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        <ImageBackground source={require('../../assets/bg-image.png')} resizeMode='cover' style={styles.leftPane}>
          {/* Model Image */}
          <Image
            source={require('../../assets/Model1.png')}
            style={styles.modelImage}
            resizeMode="cover"
          />
        </ImageBackground>

        <ScrollView style={styles.rightPane}>
            <Text style={styles.typesTitle}>Types</Text>
            <View style={{ marginBottom: 20 }}>
              <FlatList
              data={items}
              keyExtractor={item => item.SKUID.toString()}
              numColumns={2}
              renderItem={renderItem}
              scrollEnabled={false} // Disable nested scroll, scroll controlled by parent ScrollView
              contentContainerStyle={{ marginTop: 8 }}
              />
            </View>
        </ScrollView>
      </View>

      {/* Bottom Nav */}
      <View style={styles.bottomNav}>
        <NavItem icon={require('../../assets/hanger.png')} label="Wardrobe" />
        <NavItem icon={require('../../assets/user.png')} label="User" />
        <NavItem icon={require('../../assets/user-friendly.png')} label="Friends" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    marginTop: 20,
    backgroundColor: '#ddd',
    alignItems: 'center',
  },
  topBarContent: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 6,
    borderRadius: 18,
  },
  dataContent: {
    gap: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  topBarText: {
    fontSize: 12,
    fontWeight: '600',
  },
  topBarIcons: {
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
  },
  cartIcon: {
    backgroundColor: '#a14050',
    padding: 6,
    borderRadius: 20,
  },
  helpIcon: {
    padding: 6,
  },
  content: {
    flexDirection: 'row',
    flex: 1,
  },
  leftPane: {
    flex: 1,
    backgroundColor: '#f3f3f3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modelImage: {
    width: '90%',
    height: '90%',
    borderRadius: 10,
  },
  rightPane: {
    flex: 0.5,
    paddingHorizontal: 12,
    width: '50%',
    paddingHorizontal: 10,
    paddingVertical: 10

  },
  typesTitle: {
    fontWeight: '700',
    fontSize: 18,
    marginBottom: 12,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  itemContainer: {
    flex: 1,
    margin: 5,
    alignItems: 'center',
  },
  itemImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  itemLabel: {
    marginTop: 6,
    fontSize: 12,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 14,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  navText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
