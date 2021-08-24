import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, InputAccessoryView, Image } from 'react-native'

const placeholderImage = require('../assets/image/placeholder.png')

const Card = ({ item, navigation }) => {
    return (
        <TouchableOpacity onPress={() => navigation.navigate('Details', { movieID: item.id })} style={styles.container}>
            <Image
                style={styles.image}
                resizeMode="cover"
                source={
                    item.poster_path
                        ? { uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }
                        : placeholderImage
                }

            />
            {!item.poster_path && <Text style={styles.movieName}> {item.title}</Text>}
        </TouchableOpacity >
    )
}

export default Card

const styles = StyleSheet.create({
    container: {
        padding: 5,
        position: 'relative',
        alignItems: "center",
        height: 200
    },
    image: {
        width: 120,
        height: 200,
        borderRadius: 20,

    },
    movieName: {
        position: 'absolute',
        width: 120,
        textAlign: 'center',
        top: 20,
        paddingHorizontal: 2,
    }
})
