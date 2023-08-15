import React, { useEffect, useState } from 'react';
import { getMoviesByQuery } from 'api/api';

const Movies = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchMovie, setSearchMovie] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      if (searchQuery !== '') {
        const { results } = await getMoviesByQuery(searchQuery);
        setSearchMovie(results);
      }
    };

    fetchMovies();
  }, [searchQuery]);

  const handleInput = value => {
    setSearchQuery(value);
  };

  const submitQuery = async e => {
    e.preventDefault();
    // Fetching movies inside the useEffect now, no need to fetch them here.
  };

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
