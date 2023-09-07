import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';

const MoviesPage = () => {
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const query = searchParams.get('query') ?? '';

  // const updateQueryString = event => {
  //   if (event.target.value === '') {
  //     return setSearchParams({});
  //   }
  //   setSearchParams({ query: event.target.value });
  // };

  const searchMovies = event => {
    event.preventDefault();
    
    if (event.target.elements.searchMovie.value === '') {
      return setSearchParams({});
    } else {
    
    setSearchParams({ query: event.target.elements.searchMovie.value})
    }
  };

  useEffect(() => {
    function fetchMovies() {
      const key = 'a8702b4fc1615ccb68ca9d5f4ec2dee9';

      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${key}`
        )
        .then(response => {
          setSearchedMovies(response.data.results);
        })
        .catch(error => {
          console.error(error);
        });
    }
    fetchMovies()
  }, [query]);

  return (
    <div>
      <form onSubmit={searchMovies}>
        <input type="text" name='searchMovie'/>
        <button type="submit">Search</button>
      </form>
      <ul>
        {searchedMovies.map(movie => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`} state={{ from: location }}>
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default MoviesPage;
