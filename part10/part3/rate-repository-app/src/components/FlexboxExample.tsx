import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    flexContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 50,
    },
    flexItemA: {
        flexGrow: 1,
        backgroundColor: 'green',
        alignItems: 'center',
    },
    flexItemB: {
        flexGrow: 1,
        backgroundColor: 'blue',
        alignItems: 'center',
    },
});

const FlexboxExample = () => {
    return (
        <View style={styles.flexContainer}>
            <View style={styles.flexItemA}>
                <Text>Flex item A</Text>
            </View>
            <View style={styles.flexItemB}>
                <Text>Flex item B</Text>
            </View>
        </View>
    );
};

export default FlexboxExample;