import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { RepositoryItemProps } from '../types';
import theme from '../theme';

const formatDate = (date: string): string => {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    return new Date(date).toLocaleDateString('en-US', options);
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        padding: 10,
        gap: 20,
        width: '100%',
        borderBottomWidth: 1,
    },
    subcontainer: {
        flexDirection: 'row',
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 5,
    },
    info: {
        marginLeft: 10,
        justifyContent: 'center',
        gap: 5,
        flex: 1,
    },
    subInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    subSubInfo: {
        flexDirection: 'column',
        alignItems: 'center',
        gap: 5,
    },
    subtitle: {
        color: theme.colors.textSecondary,
    },
    title: {
        fontWeight: 'bold',
        color: theme.colors.textPrimary,
    },
    description: {
        color: theme.colors.textSecondary,
        width: '100%',
        flexWrap: 'wrap',
    },
    language: {
        backgroundColor: theme.colors.primary,
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
    },
    createdAt: {
        color: theme.colors.textSecondary,
        fontSize: 12,
        fontStyle: 'italic',
    },
});

const formatNumber = (num: number): string => {
    return num.toLocaleString(); // Format numbers with commas
};

const RepositoryItem: React.FC<RepositoryItemProps> = ({
                                                           title,
                                                           description,
                                                           language,
                                                           forksCount,
                                                           stargazersCount,
                                                           ratingAverage,
                                                           reviewCount,
                                                           ownerAvatarUrl,
                                                           createdAt, // Add createdAt here
                                                       }) => {
    return (
        <View style={styles.container}>
            <View style={styles.subcontainer}>
                <Image source={{ uri: ownerAvatarUrl }} style={styles.avatar} />
                <View style={styles.info}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.description}>{description}</Text>
                    <Text style={styles.language}>{language}</Text>
                    <Text style={styles.createdAt}>{`Created on: ${formatDate(createdAt)}`}</Text>
                </View>
            </View>
            <View style={styles.subInfo}>
                <View style={styles.subSubInfo}>
                    <Text style={styles.title}>{formatNumber(forksCount)}</Text>
                    <Text style={styles.subtitle}>Forks</Text>
                </View>
                <View style={styles.subSubInfo}>
                    <Text style={styles.title}>{formatNumber(stargazersCount)}</Text>
                    <Text style={styles.subtitle}>Stars</Text>
                </View>
                <View style={styles.subSubInfo}>
                    <Text style={styles.title}>{ratingAverage}</Text>
                    <Text style={styles.subtitle}>Rating</Text>
                </View>
                <View style={styles.subSubInfo}>
                    <Text style={styles.title}>{formatNumber(reviewCount)}</Text>
                    <Text style={styles.subtitle}>Reviews</Text>
                </View>
            </View>
        </View>
    );
};

export default RepositoryItem;
