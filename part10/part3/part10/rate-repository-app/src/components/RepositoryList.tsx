import React, { useEffect } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import { Text } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import { RepositoryListResponse } from '../types';
import useRepositories from '../hooks/useRepositories'; // Import the type for the full response

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        gap: 10,
    },
    separator: {
        height: 10,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        paddingTop: Constants.statusBarHeight,
        paddingLeft: 24,
        color: theme.colors.textPrimary,
    },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList: React.FC = () => {
    const { repositories, loading, error } = useRepositories();

    if (loading) {
        return <Text>Loading...</Text>;  // Handle loading state
    }

    if (error) {
        console.error(error);
        return <Text>Error: {error.message}</Text>;  // Show any GraphQL errors
    }

    const repositoryNodes = repositories ? repositories.edges.map(edge => edge.node) : [];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Repositories</Text>
            <FlatList
                data={repositoryNodes}
                keyExtractor={(item) => item.id}
                ItemSeparatorComponent={ItemSeparator}
                renderItem={({ item }) => (
                    <RepositoryItem
                        title={item.fullName}
                        description={item.description}
                        language={item.language}
                        forksCount={item.forksCount}
                        stargazersCount={item.stargazersCount}
                        ratingAverage={item.ratingAverage}
                        reviewCount={item.reviewCount}
                        ownerAvatarUrl={item.ownerAvatarUrl}
                        createdAt={item.createdAt}
                    />
                )}
            />
        </View>
    );
};


export default RepositoryList;
