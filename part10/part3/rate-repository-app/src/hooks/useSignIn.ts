import { useMutation } from '@apollo/client';
import { SIGN_IN } from '../graphql/queries';
import { SignInMutationResponse } from '../types';
import useAuthStorage from './useAuthStorage';

const useSignIn = () => {
    const authStorage = useAuthStorage();

    const [mutate, { loading, error, data }] = useMutation<SignInMutationResponse>(SIGN_IN);

    const signIn = async ({ username, password }: { username: string; password: string }) => {
        try {
            const response = await mutate({
                variables: {
                    credentials: { username, password },
                },
            });

            const accessToken = response.data?.authenticate?.accessToken;

            if (accessToken) {
                await authStorage.setAccessToken(accessToken);
            }

            return accessToken;
        } catch (err) {
            console.error('Sign-in failed:', err);
            throw err;
        }
    };

    return { signIn, loading, error, data };
};

export default useSignIn;
