import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { RepositoryItemProps } from '../types';
import theme from '../theme';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        padding: 10,
        gap: 20,
        width: '100%',
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
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    subSubInfo: {
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
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
});


const RepositoryItem: React.FC<RepositoryItemProps> = ({
                                                           title,
                                                           description,
                                                           language,
                                                           forksCount,
                                                           stargazersCount,
                                                           ratingAverage,
                                                           reviewCount,
                                                           ownerAvatarUrl,
                                                       }) => {
    return (
        <View style={styles.container}>
            <View style={styles.subcontainer}>
                <Image source={{ uri: ownerAvatarUrl }} style={styles.avatar} />
                <View style={styles.info}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.description}>{description}</Text>
                    <Text style={styles.language}>{language}</Text>
                </View>
            </View>
            <View style={styles.subInfo}>
                <View style={styles.subSubInfo}>
                    <Text style={styles.title}>{forksCount}</Text>
                    <Text style={styles.subtitle}>Forks</Text>
                </View>
                <View style={styles.subSubInfo}>
                    <Text style={styles.title}>{stargazersCount}</Text>
                    <Text style={styles.subtitle}>Stars</Text>
                </View>
                <View style={styles.subSubInfo}>
                    <Text style={styles.title}>{ratingAverage}</Text>
                    <Text style={styles.subtitle}>Rating</Text>
                </View>
                <View style={styles.subSubInfo}>
                    <Text style={styles.title}>{reviewCount}</Text>
                    <Text style={styles.subtitle}>Reviews</Text>
                </View>
            </View>
        </View>
    );
};

export default RepositoryItem;
