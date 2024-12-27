import React, { useState, useEffect } from 'react';
import { GestureResponderEvent, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useFormik } from 'formik';
import theme from '../theme';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import AuthStorage from '../utils/authStorage';
import { useNavigate } from 'react-router-native';

const authStorage = new AuthStorage();

const initialValues = {
    username: '',
    password: '',
};

const validationSchema = yup.object().shape({
    username: yup
        .string()
        .min(3, 'Username must be at least 3 characters long')
        .required('Username is required'),
    password: yup
        .string()
        .min(6, 'Password must be at least 6 characters long')
        .required('Password is required'),
});

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        padding: 20,
        gap: 15,
        backgroundColor: 'white',
        height: '100%',
        justifyContent: 'center',
    },
    textInput: {
        height: 50,
        borderWidth: 1,
        borderColor: '#d3d3d3',
        borderRadius: 5,
        paddingHorizontal: 10,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
        fontFamily: theme.fonts.main,
    },
    button: {
        height: 50,
        backgroundColor: theme.colors.primary || '#007BFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: theme.fonts.main,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        fontFamily: theme.fonts.main,
    },
    tokenText: {
        marginTop: 20,
        fontSize: 16,
        textAlign: 'center',
        color: 'green',
    },
});

const SignIn = () => {
    const navigate = useNavigate();
    const { signIn, loading, error, data } = useSignIn();
    const [accessToken, setAccessToken] = useState<string | null>(null);

    // Check if the user is already logged in and navigate them to the home page if they are
    useEffect(() => {
        const checkIfLoggedIn = async () => {
            const token = await authStorage.getAccessToken();
            if (token) {
                // If the user is logged in, redirect to the home page
                navigate('/');
            }
        };
        checkIfLoggedIn();
    }, [navigate]);

    const onSubmit = async () => {
        try {
            const token = await signIn({
                username: formik.values.username,
                password: formik.values.password,
            });

            console.log('Logged in successfully, token:', token);
            await authStorage.setAccessToken(token);
            setAccessToken(token);
        } catch (err) {
            console.error('Sign-in failed:', err);
        }
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    });

    const handlePress = (e: GestureResponderEvent) => {
        formik.handleSubmit();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Sign In</Text>
            <TextInput
                style={[
                    styles.textInput,
                    formik.touched.username && formik.errors.username && { borderColor: '#d73a4a' },
                ]}
                placeholder="Username"
                value={formik.values.username}
                onChangeText={formik.handleChange('username')}
                placeholderTextColor="#c4c4c4"
            />
            {formik.touched.username && formik.errors.username && (
                <Text style={{ color: '#d73a4a' }}>{formik.errors.username}</Text>
            )}
            <TextInput
                style={[
                    styles.textInput,
                    formik.touched.password && formik.errors.password && { borderColor: '#d73a4a' },
                ]}
                placeholder="Password"
                value={formik.values.password}
                onChangeText={formik.handleChange('password')}
                secureTextEntry
                placeholderTextColor="#c4c4c4"
            />
            {formik.touched.password && formik.errors.password && (
                <Text style={{ color: '#d73a4a' }}>{formik.errors.password}</Text>
            )}
            <Pressable onPress={handlePress} style={styles.button}>
                <Text style={styles.buttonText}>{loading ? 'Signing In...' : 'Sign in'}</Text>
            </Pressable>
            {error && <Text style={{ color: '#d73a4a' }}>{error.message}</Text>}

            {/*{accessToken && (*/}
            {/*    <Text style={styles.tokenText}>*/}
            {/*        Access Token: {accessToken}*/}
            {/*    </Text>*/}
            {/*)}*/}
        </View>
    );
};

export default SignIn;
