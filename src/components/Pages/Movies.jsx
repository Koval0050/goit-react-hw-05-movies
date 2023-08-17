import { useEffect, useState } from 'react';
import { getMoviesByQuery } from 'api/api';
import { useSearchParams } from 'react-router-dom';

const Movies = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchMovie, setSearchMovie] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const fetchMovies = async () => {
      if (searchQuery.trim() !== '') {
        const { results } = await getMoviesByQuery(searchQuery);
        setSearchMovie(results);
      }
    };

    fetchMovies();
  }, [searchQuery]);

  const handleInput = value => {
    setSearchQuery(value);
    setSearchParams({ query: value }); // Оновити параметр запиту у URL
  };

  const submitQuery = e => {
    e.preventDefault();
  };

  const queryParams = new URLSearchParams(searchParams);
  const queryFromURL = queryParams.get('query') || '';

  useEffect(() => {
    setSearchQuery(queryFromURL);
  }, [queryFromURL]);

  return (
    <div>
      <form onSubmit={submitQuery} style={{ marginBottom: '30px' }}>
        <input
          type="text"
          className="input-search"
          placeholder="Search by name"
          onChange={e => {
            handleInput(e.target.value);
          }}
          value={searchQuery}
          required
        />
      </form>
      <ul className="movie-list">
        {searchMovie.map(movie => (
          <li key={movie.id} className="movie-card">
            <img
              className="movie-img"
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/original/${movie.poster_path}`
                  : 'NoPoster'
              }
              alt=""
            />
            <p className="movie-title">{movie.original_title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Movies;
