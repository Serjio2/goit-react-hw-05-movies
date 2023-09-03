import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    const key = 'a8702b4fc1615ccb68ca9d5f4ec2dee9';

    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${key}`
      )
      .then(response => {
        setReviews(response.data.results);
      })
      .catch(error => {
        console.error(error);
      });
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
