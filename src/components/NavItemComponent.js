import { TouchableOpacity, ToastAndroid, Text, StyleSheet, Image } from 'react-native';

const NavItem = ({ label, icon }) => {
    return (
        <TouchableOpacity style={styles.navItem} onPress={() => ToastAndroid.show(label + ' clicked', ToastAndroid.SHORT)}>
            <Image
                source={icon}
                resizeMode='contain'
                style={{ width: 30, height: 30 }} // Adjust size as needed
            />
            <Text style={styles.navText}>{label}</Text>
        </TouchableOpacity>
    );
}

export default NavItem;

const styles = StyleSheet.create({
    navItem: {
        alignItems: 'center',
    },
    navText: {
        fontSize: 14,
        marginTop: 4,
        color: '#000',
        fontWeight: '600',
    },
});