import { Layout } from 'components/Layout.styled';
import { fetchHomePage } from 'components/api';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const location = useLocation();

  useEffect(() => {
    try {
      fetchHomePage().then(response => {
        setMovies(response.data.results);
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <Layout>
      <h2>Trending today</h2>
      <ul>
        {movies.map(({ id, title }) => (
          <li key={id}>
            <Link to={`/movies/${id}`} state={{ from: location }}>
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
};
export default HomePage;
