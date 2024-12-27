import { Text, Pressable, View, StyleSheet, Animated } from 'react-native';
import theme from '../theme';
import { Link, useNavigate } from 'react-router-native';
import ScrollView = Animated.ScrollView;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        width: '100%',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderTopColor: theme.colors.primary,
        borderTopWidth: 3,
        backgroundColor: 'white',
    },
    scrollView: {
        width: '100%',
    },
    button: {
        padding: 10,
    },
    text: {
        color: theme.colors.textPrimary,
        fontSize: 18,
    },
    fixedNavBar: {
        position: 'absolute',
        width: '100%',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10,
    },
});

const NavBar = () => {
    const navigate = useNavigate();

    return (
        <ScrollView horizontal style={[styles.scrollView, styles.fixedNavBar]}>
            <View style={styles.container}>
                <Link style={styles.button} to={'/'}>
                    <Text style={styles.text}>Home</Text>
                </Link>
                <Link style={styles.button} to={'/signin'}>
                    <Text style={styles.text}>Sign in</Text>
                </Link>
            </View>
        </ScrollView>
    );
};

export default NavBar;
