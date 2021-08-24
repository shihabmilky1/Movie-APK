import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import Card from './Card'

const List = ({ title, content, navigation }) => {
    return (
        <View style={styles.list}>
            <View>
                <Text style={styles.title}>{title}</Text>
            </View>
            <FlatList
                data={content}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => <Card item={item} navigation={navigation} />}
            />
        </View>
    )
}

export default List

const styles = StyleSheet.create({
    list: {
        marginTop: 25
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        paddingBottom: 20
    },
})
