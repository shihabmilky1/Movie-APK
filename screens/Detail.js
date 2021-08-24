import React, { useEffect, useState } from 'react'
import { ActivityIndicator, ScrollView, StyleSheet, Text, View, Image, Dimensions, Modal } from 'react-native';
import StarRating from 'react-native-star-rating';
import { getMoviesDetail } from '../Services/Services'
import dateFormat from 'dateformat'
import PlayButton from '../components/PlayButton';

const placeholderImage = require('../assets/image/placeholder.png')
const dimensions = Dimensions.get('screen')

const Detail = ({ route }) => {

    const [movieDetail, setMovieDetail] = useState({})
    const movieID = route.params.movieID;
    const [loaded, setLoaded] = useState(false)
    const [modal, setModal] = useState(false)
    useEffect(() => {
        getMoviesDetail(movieID)
            .then((movie) => {
                setMovieDetail(movie)
                setLoaded(true)
            })
    }, [movieID])


    const videoShow = () => {
        setModal(!modal)
    }

    return (
        <>
            {loaded && (
                <View>
                    <ScrollView>
                        <Image
                            style={styles.image}
                            resizeMode="cover"
                            source={
                                movieDetail.poster_path
                                    ? { uri: `https://image.tmdb.org/t/p/w500${movieDetail.poster_path}` }
                                    : placeholderImage
                            }

                        />
                        <View style={styles.container}>
                            <View style={styles.PlayButtonPosition}>
                                <PlayButton videoShow={videoShow} />
                            </View>
                            <Text style={styles.movieTitle}>{movieDetail.title}</Text>
                            {movieDetail.genres &&
                                (<View style={styles.genreContainer}>
                                    {movieDetail.genres.map(genre => {
                                        return (
                                            <Text style={styles.genre} key={genre.id}>{genre.name}</Text>
                                        )
                                    })}
                                </View>
                                )}

                            <StarRating
                                maxStars={5}
                                rating={movieDetail.vote_average / 2}
                                disabled={true}
                                fullStarColor={'gold'}
                                starSize={30}
                            />
                            <Text style={styles.releaseDate}>{movieDetail.vote_average}</Text>
                            <Text style={styles.overview}>{movieDetail.overview}</Text>
                            <Text style={styles.releaseDate} >{'Release date ' + dateFormat(movieDetail.release_date, 'mmmm dS,yyyy ')}</Text>
                        </View>
                    </ScrollView>
                    <Modal
                        animationType="slide"
                        visible={modal}
                    >
                        <View>
                            <Text onPress={() => videoShow()}>Hode</Text>
                        </View>
                    </Modal>
                </View>
            )}
            {!loaded && <ActivityIndicator style={styles.loaded} color="red" />}
        </>
    )
}

export default Detail;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        height: dimensions.height / 2,
    },
    loaded: {
        height: '100%'
    },
    movieTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
    },
    genreContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20
    },
    genre: {
        marginRight: 10,
        fontWeight: 'bold'
    },
    overview: {
        //      marginBottom: 15,
        //        marginTop: 15,
        padding: 15
    },
    releaseDate: {
        fontWeight: 'bold'
    },
    PlayButtonPosition: {
        position: 'absolute',
        top: -25,
        right: 20
    }
})
