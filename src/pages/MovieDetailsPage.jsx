import {
  AdditionalInfo,
  ContainerMovie,
  DescriptionMovie,
  GoBackBtn,
  LayoutMovieDatalisPage,
} from 'components/LayoutMovieDetailsPage.styled';
import { fetchMovieId } from 'components/api';
import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { Loader } from 'components/Loader';


const MovieDetailsPage = () => {
  const date = new Date();
  const [singleMovie, setSingleMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const { movieId } = useParams();
  const location = useLocation();

  const backLinkHref = location.state?.from ?? '/';

  useEffect(() => {
    setLoading(true)
    try {
      fetchMovieId(movieId).then(response => {
        setSingleMovie(response.data);
        setLoading(false)
      });
    } catch (error) {
      console.error(error);
    }
  }, [movieId]);

  return (
    <LayoutMovieDatalisPage>
      {loading && <Loader/>}
      {singleMovie && (
        <>
          <GoBackBtn>
            <Link to={backLinkHref}><AiOutlineArrowLeft/>Go back</Link>
          </GoBackBtn>
          <ContainerMovie>
            <img
              src={'https://image.tmdb.org/t/p/w300' + singleMovie.poster_path}
              alt={singleMovie.original_title}
            ></img>
            <DescriptionMovie>
              <h2>
                {singleMovie.original_title} (
                {date.getFullYear(singleMovie.release_date)})
              </h2>
              <p>User Score: {Math.round(singleMovie.vote_average * 10)}%</p>
              <h3>Overview</h3>
              <p>{singleMovie.overview}</p>
              <h3>Genres</h3>
              <ul>
                {singleMovie.genres.map(genre => (
                  <li key={genre.id}>{genre.name}</li>
                ))}
              </ul>
            </DescriptionMovie>
          </ContainerMovie>
        </>
      )}
      <AdditionalInfo>
      <p>Additional Information</p>
      <ul>
        <li>
          <Link to="cast" state={location.state}>
            Cast
          </Link>
        </li>
        <li>
          <Link to="reviews" state={location.state}>
            Reviews
          </Link>
        </li>
      </ul>
      <hr/>
      <Outlet />
      </AdditionalInfo>
    </LayoutMovieDatalisPage>
  );
};
export default MovieDetailsPage;
