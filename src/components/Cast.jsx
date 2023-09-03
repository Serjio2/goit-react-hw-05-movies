import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const Cast = () => {
  const [actors, setActors] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    const key = 'a8702b4fc1615ccb68ca9d5f4ec2dee9';

    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${key}`
      )
      .then(response => {
        setActors(response.data.cast);
      })
      .catch(error => {
        console.error(error);
      });
  }, [movieId]);

  return (
    <>
      {actors && (
        <ul>
          {actors.map(actor => (
            <div key={actor.id}>
              <img src={actor.profile_path} alt={actor.name}/>
              <li >{actor.name}</li>
              <p>{actor.character}</p>
            </div>
          ))}
        </ul>
      )}
    </>
  );
};
