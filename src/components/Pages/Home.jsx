import { styled } from 'styled-components';
import { getPopularMovies } from '../../api/api';
import { useEffect, useState } from 'react'; // Import useState
import { Link } from 'react-router-dom';

const MovieLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const Home = () => {
  const [movieList, setMovieList] = useState([]); // Use state to store the movie list

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await getPopularMovies();
        setMovieList(result.results); // Update the movie list using setMovieList
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
    getData();
  }, [movieList]);

  return (
    <>
      <h1 className="trending">Trending today</h1>
      <ul className="movie-list">
        {movieList.map(movie => (
          <li key={movie.id} className="movie-card">
            <MovieLink to={`movies/${movie.id}`}>
              <img
                className="movie-img"
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/original/${movie.poster_path}`
                    : 'NoPoster'
                }
                alt=""
              />
              <p className="movie-title">{movie.title}</p>
            </MovieLink>
            <p>Rating: {Math.ceil(movie.vote_average)}</p>
            <p>Relese date: {movie.release_date}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Home;
