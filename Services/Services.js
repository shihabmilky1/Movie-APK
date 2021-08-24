import axios from 'axios';


const api_key = '449ffc2a9f1ac33540beeb8d285079a7'
const url = 'https://api.themoviedb.org/3'
//get popular movies
export const getPopularMovies = async () => {
    const resp = await axios.get(
        `${url}/movie/popular?api_key=${api_key}`
    )
    return resp.data.results;
}

//get upcoming movies
export const getUpcomingMovies = async () => {
    const resp = await axios.get(
        `${url}/movie/upcoming?api_key=${api_key}`
    )
    return resp.data.results;
}
//get popular tv
export const getPopularTV = async () => {
    const resp = await axios.get(
        `${url}/tv/popular?api_key=${api_key}`
    )
    return resp.data.results;
}

//get family movies
export const getFamilyMovies = async () => {
    const resp = await axios.get(
        `${url}/discover/movie?api_key=${api_key}&with_genres=10751`
    )
    return resp.data.results;
}
//get movies detail
export const getMoviesDetail = async (id) => {
    const resp = await axios.get(
        `${url}/movie/${id}?api_key=${api_key}`
    )
    return resp.data;
}