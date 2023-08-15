import { useEffect, useState } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import { getMoviesDetailsById } from '../../api/api';
import { styled } from 'styled-components';

const ButtonBack = styled(Link)`
  display: block;
  width: 100px;
  background-color: #baf0e2;
  border-radius: 5px;
  padding: 5px;
  text-align: center;
  text-decoration: none;
  margin-bottom: 15px;
`;

const MovieDetail = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        const details = await getMoviesDetailsById(movieId);
        setMovieDetails(details);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    }

    fetchMovieDetails();
  }, [movieId]);

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ButtonBack to={'/'}>Return back</ButtonBack>
      <div className="movie-detail">
        <img
          width={'250px'}
          src={
            movieDetails.poster_path
              ? `https://image.tmdb.org/t/p/original/${movieDetails.poster_path}`
              : 'NoPoster'
          }
          alt=""
        />
        <div>
          <h2 className="movie-detail-title">{movieDetails.title}</h2>
          <p className="text">
            <span className="movie-detail-text">Release Date: </span>
            {movieDetails.release_date}
          </p>
          <p className="Description-text">
            <span className="movie-detail-text">Description: </span>
            {movieDetails.overview}
          </p>
        </div>
      </div>
      <ul
        style={{
          display: 'flex',
          listStyle: 'none',
          columnGap: '15px',
          marginTop: '30px',
          marginBottom: '30px',
        }}
      >
        <li>
          <Link to={'cast'}>Cast</Link>
        </li>
        <li>
          <Link to={'reviews'}>Reviews</Link>
        </li>
      </ul>
      <Outlet />
    </>
  );
};

export default MovieDetail;
