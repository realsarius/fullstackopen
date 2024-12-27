import { View, StyleSheet, Text, Pressable } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#24292e',
    },
    text: {
        color: theme.colors.textPrimary,
    },
});

const AppBar = () => {
    const showSomething = () => {
        console.log('I pressed the button');
    };

    return (
        <View style={styles.container}>
            <Pressable onPress={showSomething}>
                <Text style={styles.text}>I'm pressable!</Text>
            </Pressable>
        </View>
    );
};

export default AppBar;