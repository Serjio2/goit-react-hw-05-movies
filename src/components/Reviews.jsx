import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchReviews } from './api';

export const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    try {
      fetchReviews(movieId).then(response => {
        setReviews(response.data.results);
      });
    } catch (error) {
      console.error(error);
    }
  }, [movieId]);

  return (
    <>
      {reviews.length > 0 ? (
        <ul>
          {reviews.map(review => (
            <div key={review.id}>
              <li>{review.author}</li>
              <p>{review.content}</p>
            </div>
          ))}
        </ul>
      ) : (
        <p>We don`t have any reviews for this movie.</p>
      )}
    </>
  );
};
