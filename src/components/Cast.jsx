import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCast } from './api';

const Cast = () => {
  const [actors, setActors] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    try {
      fetchCast(movieId).then(response => {
        setActors(response.data.cast);
      });
    } catch (error) {
      console.error(error);
    }
  }, [movieId]);

  return (
    <>
      {actors && (
        <ul>
          {actors.map(actor => (
            <div key={actor.id}>
              <img
                src={'https://image.tmdb.org/t/p/w92' + actor.profile_path}
                alt={actor.name}
              />
              <li>{actor.name}</li>
              <p>{actor.character}</p>
            </div>
          ))}
        </ul>
      )}
    </>
  );
};

export default Cast;
