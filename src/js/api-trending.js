import { API_KEY } from './API_KEY';
import axios from 'axios';

export const BASE_URL = 'https://api.themoviedb.org/3/';

export class MoviesTrendAPIService {
  constructor() {
    this.page = 1;
    this.genres = this.fetchGenres();
    this.addFilm = {}
  }

  async fetchMovies() {
    try {
      const response = await axios.get(
        `${BASE_URL}trending/movie/week?api_key=${API_KEY}&page=${this.page}`
      );
      return response.data;
    } catch (error) {
      throw new Error(`Oops, something went wrong`);
    }
  }
  async fetchGenres() {
    try {
      const listofGenres = await axios.get(
        `
https://api.themoviedb.org/3/genre/movie/list?api_key=29563162ad0b73335f880d56505c78bf&language=en-US`
      );
      return listofGenres.data.genres
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
  get film() {
    return this.addFilm
  }
  set film(newFilm) {
    this.addFilm = newFilm
  }
}

// const test = new MoviesTrendAPIService();   -----> для тестування
// test.fetchMovies()
