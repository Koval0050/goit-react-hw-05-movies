import React, { useEffect, useState } from 'react';
import { getMoviesCast } from '../../api/api'; // Correct the import path
import { useParams } from 'react-router-dom';

const Cast = () => {
  const [cast, setCast] = useState([]);

  const { movieId } = useParams();

  useEffect(() => {
    async function fetchMovieCast() {
      try {
        const castResult = await getMoviesCast(movieId);
        setCast(castResult);
      } catch (error) {
        console.error('Error fetching movie cast:', error);
      }
    }

    fetchMovieCast();
  }, [movieId]); 

  return (
    <div>
      <h2>Cast</h2>
      <ul>
        {cast.map(actor => (
          <li key={actor.id}>{actor.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Cast;
