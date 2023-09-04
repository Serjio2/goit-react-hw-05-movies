import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';

const MovieDetailsPage = () => {
  const [singleMovie, setSingleMovie] = useState(null);
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkHref = location.state?.from ?? '/';

  useEffect(() => {
    const key = 'a8702b4fc1615ccb68ca9d5f4ec2dee9';

    axios
      .get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${key}`)
      .then(response => {
        setSingleMovie(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [movieId]);

  return (
    <>
      {singleMovie && (
        <div>
          <div>
          <Link to={backLinkHref}>Go back</Link>
          </div>
          <img
            src={'https://image.tmdb.org/t/p/w300' + singleMovie.poster_path}
            alt={singleMovie.original_title}
          ></img>
          <h2>
            {singleMovie.original_title}({singleMovie.release_date})
          </h2>
          <p>User Score:{singleMovie.vote_average}%</p>
          <h3>Overview</h3>
          <p>{singleMovie.overview}</p>
          <h3>Genres</h3>
          <ul>
            {singleMovie.genres.map(genre => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
        </div>
      )}
      <p>Additional Information</p>
      <ul>
        <li>
          <Link to="cast">Cast</Link>
        </li>
        <li>
          <Link to="reviews">Reviews</Link>
        </li>
      </ul>
      <Outlet />
    </>
  );
};
export default MovieDetailsPage;
