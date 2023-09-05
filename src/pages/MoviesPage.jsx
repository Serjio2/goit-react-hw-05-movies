import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';

const MoviesPage = () => {
  const [query, setQuery] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams('');
  const location = useLocation();
  const searchValue = searchParams.get('query') ?? '';

  const updateQueryString = event => {
    if (event.target.value === '') {
      return setSearchParams({});
    }
    setSearchParams({ query: event.target.value });
  };

  useEffect(() => {
    const key = 'a8702b4fc1615ccb68ca9d5f4ec2dee9';

    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?query=${searchValue}&api_key=${key}`
      )
      .then(response => {
        setQuery(response.data.results);
      })
      .catch(error => {
        console.error(error);
      });
  }, [searchValue]);

  return (
    <div>
      <input type="text" value={searchValue} onChange={updateQueryString} />
      <button>Search</button>
      <ul>
        {query.map(item => (
          <li key={item.id}>
            <Link to={`/movies/${item.id}`} state={{ from: location }}>
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default MoviesPage;
