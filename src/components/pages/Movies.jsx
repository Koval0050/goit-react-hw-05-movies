import { useState } from 'react';
import { getMoviesByQuery } from 'api/api';
const Movies = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchMovie, setSearchMovie] = useState([]);
  const handleInput = value => {
    setSearchQuery(value);
  };
  const submitQuery = async e => {
    e.preventDefault();
    const { results } = await getMoviesByQuery(searchQuery);
    setSearchMovie(results);
    console.log(searchMovie);
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
        />
        <button className="search-btn" type="submit">
          Search
        </button>
      </form>
      <ul className="movie-list">
        {searchMovie.map(movie => {
          return (
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
          );
        })}
      </ul>
    </div>
  );
};

export default Movies;
