import { Layout } from 'components/Layout.styled';
import { fetchFindMovies } from 'components/api';
import { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';

const MoviesPage = () => {
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const query = searchParams.get('query') ?? '';

  const searchMovies = event => {
    event.preventDefault();

    if (event.target.elements.searchMovie.value === '') {
      return setSearchParams({});
    } else {
      setSearchParams({ query: event.target.elements.searchMovie.value });
    }
  };

  useEffect(() => {
    try {
      fetchFindMovies(query).then(response => {
        setSearchedMovies(response.data.results);
      });
    } catch (error) {
      console.error(error);
    }
  }, [query]);

  return (
    <Layout>
      <form onSubmit={searchMovies}>
        <input type="text" name="searchMovie" placeholder="input movie" />
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
    </Layout>
  );
};
export default MoviesPage;
