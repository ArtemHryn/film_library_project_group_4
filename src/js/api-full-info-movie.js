import { API_KEY } from './API_KEY';
import axios from 'axios';
import { BASE_URL } from './api-trending';

export class MoviesFullInfoAPIService {
  constructor() {
    this.movieId = null; // -----> для тестування 945657  718930  616037(number)
  }

  async fetchMovies() {
    try {
      const response = await axios.get(
        `${BASE_URL}movie/${this.movieId}?api_key=${API_KEY}`
      );
      return response.data;
    } catch (error) {
      throw new Error(`Oops, something went wrong`);
    }
  }

  async fetchTreiler() {
    try {
      const response = await axios.get(
        `${BASE_URL}movie/${this.movieId}/videos?api_key=${API_KEY}&language=en-US`
      );
      return response.data.results;
    } catch (error) {
      throw new Error(`Oops, something went wrong`);
    }
  }

  get id() {
    return this.movieId;
  }

  set id(newId) {
    return (this.movieId = newId);
  }
}
