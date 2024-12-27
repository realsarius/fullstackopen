import { GestureResponderEvent, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useFormik } from 'formik';
import theme from '../theme';
import * as yup from 'yup';

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
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
});

const SignIn = () => {
    const onSubmit = () => {
        console.log(`username: ${formik.values.username}`);
        console.log(`password: ${formik.values.password}`);
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
                <Text style={styles.buttonText}>Sign in</Text>
            </Pressable>
        </View>
    );
};

export default SignIn;
