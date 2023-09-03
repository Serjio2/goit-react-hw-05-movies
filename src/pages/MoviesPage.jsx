import { useSearchParams } from 'react-router-dom';

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams('');
  const searchValue = searchParams.get('query') ?? '';

  const updateQueryString = event => {
    if (event.target.value === '') {
      return setSearchParams({});
    }
    setSearchParams({ query: event.target.value });
  };

  return (
    <div>
      <input type="text" value={searchValue} onChange={updateQueryString} />
      <button>Search</button>
    </div>
  );
};
export default MoviesPage;
