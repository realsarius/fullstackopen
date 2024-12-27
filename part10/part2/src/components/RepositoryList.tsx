import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import repositories from '../../data/repositories';
import { Text } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';

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
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Repositories</Text>
            <FlatList
                data={repositories}
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
                    />
                )}
            />
        </View>

    );
};

export default RepositoryList;
