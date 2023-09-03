import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const HomePage = () => {
  const [movies, setMovie] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const options = {
      method: 'GET',
      url: 'https://api.themoviedb.org/3/trending/movie/day',
      params: { language: 'en-US' },
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhODcwMmI0ZmMxNjE1Y2NiNjhjYTlkNWY0ZWMyZGVlOSIsInN1YiI6IjY0ZWZiZTA1NzJjMTNlMDBlMjVlZThkYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sueef9w5XdOsncP99x3XdpB1Ooh5Z3dWKaUESItEaG0',
      },
    };

    axios
      .request(options)
      .then(response => {
        // console.log(response.data.results);
        setMovie(response.data.results);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h2>Trending today</h2>
      <ul>
        {movies.map(({ id, title }) => (
          <li key={id}>
            <Link to={`/movies/${id}`} state={{from: location}}>{title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default HomePage;
