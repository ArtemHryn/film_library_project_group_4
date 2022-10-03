import { API_KEY } from './API_KEY';
import axios from 'axios';
import { BASE_URL } from './baseUrl';

// export const BASE_URL = 'https://api.themoviedb.org/3';

export class MoviesTrendAPIService {
  constructor() {
    this.page = 1;
    this.genres = this.fetchGenres();
    this.addFilm = {};
  }

  async fetchMovies() {
    try {
      const options = { params: { api_key: API_KEY, page: this.page } };
      const url = `${BASE_URL}/trending/movie/week?`;
      const response = await axios.get(url, options);
      return response.data;
    } catch (error) {
      throw new Error(`Oops, something went wrong`);
    }
  }
  async fetchGenres() {
    try {
      const url = `${BASE_URL}/genre/movie/list?`;
      const options = { params: { api_key: API_KEY, language: 'en-US' } };
      const listofGenres = await axios.get(url, options);
      return listofGenres.data.genres;
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
  get film() {
    return this.addFilm;
  }
  set film(newFilm) {
    this.addFilm = newFilm;
  }
}

// const test = new MoviesTrendAPIService();   -----> для тестування
// test.fetchMovies()
