import React, { useEffect, useState } from 'react';
import { getMoviesReviews } from '../../api/api'; // Correct the import path
import { useParams } from 'react-router-dom';

const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function fetchMovieReviews() {
      try {
        const result = await getMoviesReviews(movieId); // Assuming getMoviesReviews is a valid function
        setReviews(result);
      } catch (error) {
        console.error('Error fetching movie reviews:', error);
      }
    }

    fetchMovieReviews();
  }, [movieId]); // Include movieId in the dependency array

  return (
    <div>
      <h2>Reviews</h2>
      {reviews.length > 0 ? (
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>{review.content}</li>
          ))}
        </ul>
      ) : (
        <p>There are currently no reviews</p>
      )}
    </div>
  );
};

export default Reviews;
