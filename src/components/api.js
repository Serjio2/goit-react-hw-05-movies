import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
const key = 'a8702b4fc1615ccb68ca9d5f4ec2dee9';

export const fetchHomePage = async () =>
  await axios.get(`trending/movie/day?api_key=${key}`);

export const fetchMovieId = async movieId =>
  await axios.get(`movie/${movieId}?api_key=${key}`);

export const fetchFindMovies = async query =>
  await axios.get(`search/movie?query=${query}&api_key=${key}`);

export const fetchCast = async movieId =>
  await axios.get(`movie/${movieId}/credits?api_key=${key}`);

export const fetchReviews = async movieId =>
  await axios.get(`movie/${movieId}/reviews?api_key=${key}`);
