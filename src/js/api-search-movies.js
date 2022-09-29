import { API_KEY } from './API_KEY';
import axios from 'axios';
import { BASE_URL } from './api-trending';

export class MoviesSearchAPIService {
  constructor() {
    this.searchQuery = ''; //'Titanic' ------> для тестування(string)
    this.page = 1;
    this.listOfFilms = {};
  }

  async fetchMovies() {
    try {
      const response = await axios.get(
        `${BASE_URL}search/movie?api_key=${API_KEY}&query=${this.searchQuery}&page=${this.page}`
      );

      return response.data;
    } catch (error) {
      throw new Error(`Oops, something went wrong`);
    }
  }

  resetPage() {
    this.page = 1;
  }

  incrementPage() {
    this.page += 1;
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

// const test = new MoviesSearchAPIService();  ----->  // для тестування
// test.fetchMovies()
