import { Layout } from 'components/Layout.styled';
import { Loader } from 'components/Loader';
import { fetchHomePage } from 'components/api';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    try {
      fetchHomePage()
      .then(response => {
        setMovies(response.data.results);
        setLoading(false);
      });
    } catch (error) {
      console.error(error);
    } 
  }, []);

  return (
    <Layout>
      <h2>Trending today</h2>
      {loading && <Loader/>}
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
