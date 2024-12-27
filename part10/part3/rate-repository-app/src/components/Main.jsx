import React from 'react';
import Constants from 'expo-constants';
import { StyleSheet, View, Button } from 'react-native';
import Text from './Text';
import RepositoryList from './RepositoryList';
import theme from '../theme';
import { Navigate, Route, Routes } from 'react-router-native';
import AppBar from './AppBar';
import SignIn from './SignIn';
import { useNavigate } from 'react-router-native';
import NavBar from './NavBar';

const styles = StyleSheet.create({
    container: {
        // marginTop: Constants.statusBarHeight,
        flexGrow: 1,
        flexShrink: 1,
        backgroundColor: theme.colors.backgroundColor,
        width: '100%',
    },
});

const Main = () => {
    const navigate = useNavigate();

    const goToSignIn = () => {
        navigate('/signin');
    };

    return (
        <View style={styles.container}>
            {/*<AppBar />*/}
            <Routes>
                <Route path="/" element={<RepositoryList />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <NavBar />
        </View>
    );
};

export default Main;
