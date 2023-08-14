import axios from 'axios';

const api_key = '4af8673034454ac9d963cf50bf2a6f7c';

export const getMovieDetail = async movie_id => {
  try {
    const result = await axios.get(
      `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${api_key}`
    );
    return result.data;
  } catch (error) {
    throw error;
  }
};
