import axios from 'axios';

axios.defaults.baseURL = `https://api.themoviedb.org/3`;
axios.defaults.params = {
  api_key: `80849c20aa63241eb028c4e7b7d0f3a8`,
  include_adult: false,
};

export const getPopularMovies = async (page = 1) => {
  try {
    const { data } = await axios.get('/trending/movie/day', {
      params: {
        page,
      },
    });
    return data;
  } catch (error) {
    throw new Error('Oops, there is no movies');
  }
};

export const getMoviesByQuery = async query => {
  try {
    const urlParam = `/search/movie?query=${query}&`;
    const { data } = await axios.get(urlParam);
    return data;
  } catch (error) {
    throw new Error('Oops, there is no movie');
  }
};

export const getMoviesDetailsById = async movieId => {
  try {
    const { data } = await axios.get(`movie/${movieId}`);
    return data;
  } catch (error) {
    throw new Error('Oops, there is no movie with that name');
  }
};

export const getMoviesCast = async movieId => {
  try {
    const { data } = await axios.get(`movie/${movieId}/credits`);
    return data.cast;
  } catch (error) {
    throw new Error('Oops, there is no cast movie');
  }
};

export const getMoviesReviews = async movieId => {
  try {
    const { data } = await axios.get(`movie/${movieId}/reviews`);
    return data.results;
  } catch (error) {
    throw new Error('Oops, we don`t have any reviews');
  }
};
