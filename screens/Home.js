import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Dimensions, ScrollView, ActivityIndicator } from 'react-native'
import { getFamilyMovies, getPopularMovies, getPopularTV, getUpcomingMovies } from '../Services/Services'
import { SliderBox } from "react-native-image-slider-box";
import List from '../components/List';

const dimensions = Dimensions.get('screen')


const Home = ({ navigation }) => {
    const [moviesImages, setMoviesImages] = useState([])
    const [popularMovies, setPopularMovies] = useState(null)
    const [popularTV, setPopularTV] = useState(null)
    const [familyMovies, setFamilyMovies] = useState(null)

    const [error, setError] = useState(false)
    const [loaded, setLoaded] = useState(false)

    const getData = () => {
        return Promise.all([
            getUpcomingMovies(),
            getPopularMovies(),
            getPopularTV(),
            getFamilyMovies()
        ])
    }

    useEffect(() => {

        getData().then(([UpcomingMoviesData, popularMoviesData, popularTVData, familyMoviesData]) => {
            let moviesImagesArray = []
            UpcomingMoviesData.forEach((movie) => {
                moviesImagesArray.push('https://image.tmdb.org/t/p/w500' + movie.poster_path)
            })

            setMoviesImages(moviesImagesArray);
            setPopularMovies(popularMoviesData)
            setPopularTV(popularTVData)
            setFamilyMovies(familyMoviesData)

        }).catch(err => {
            setError(err);
        }).finally(() => {
            setLoaded(true);
        })
    }, [])
    return (
        <>
            {loaded && !error && (
                <ScrollView>
                    {moviesImages &&
                        (<View style={styles.sliderContainer}>

                            <SliderBox
                                images={moviesImages}
                                sliderBoxHeight={dimensions.height / 1.5}
                                dotStyle={styles.sliderStyle}
                                autoplay={true}
                                circleLoop={true}
                            />
                        </View>
                        )}
                    {popularMovies && (
                        <View style={styles.carousel}>
                            <List title='Popular Movies' content={popularMovies} navigation={navigation} />
                        </View>
                    )}

                    {popularTV && (
                        <View style={styles.carousel}>
                            <List title='Popular TV Show' content={popularTV} navigation={navigation} />
                        </View>
                    )}
                    {familyMovies && (
                        <View style={styles.carousel}>
                            <List title='Family Movies' content={familyMovies} navigation={navigation} />
                        </View>
                    )}
                </ScrollView>
            )}
            {!loaded && <ActivityIndicator color="red" style={{ height: '100%' }} />}
            {error && <Text>Opps! Something went wrong!</Text>}
        </>
    )
}

export default Home

const styles = StyleSheet.create({
    sliderContainer: {
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    carousel: {
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    sliderStyle: {
        height: 0,
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'

    }
})
