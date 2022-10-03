import { API_KEY } from './API_KEY';
import axios from 'axios';
import { BASE_URL } from './baseUrl';

export class MoviesSearchAPIService {
  constructor() {
    this.searchQuery = ''; 
    this.page = 1;
    this.listOfFilms = {};
  }

  async fetchMovies() {
    try {
      const options = { params: { api_key: API_KEY, query: this.searchQuery, page: this.page } };
      const url = `${BASE_URL}/search/movie?`;
      const response = await axios.get(url, options);
      return response.data;
    } catch (error) {
      throw new Error(`Oops, something went wrong`);
    }
  }

  resetPage() {
    this.page = 1;
  }

  set Page(newPage) {
    this.page = newPage;
  }

  incrementPage() {
    this.page += 1;
  }

  decrement() {
    this.page -= 1;
  }

  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
  get films() {
    return this.listOfFilms;
  }

  set films(newFilm) {
    this.listOfFilms = newFilm;
  }
}

