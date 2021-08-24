import React from 'react'
import { Pressable, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
const PlayButton = ({ videoShow }) => {
    return (
        <Pressable onPress={() => videoShow()} style={styles.playButton}>
            <Icon name={'caret-forward-outline'} size={30} color={'#fff'} />
        </Pressable>
    )
}

export default PlayButton

const styles = StyleSheet.create({
    playButton: {
        alignContent: 'center',
        borderRadius: 50,
        width: 50,
        padding: 10,
        backgroundColor: '#4481FC'
    }
})
