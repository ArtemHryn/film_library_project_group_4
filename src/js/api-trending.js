import { API_KEY } from "./API_KEY"
import axios from 'axios';

export const BASE_URL = 'https://api.themoviedb.org/3/';

export class MoviesTrendAPIService {
    constructor() {
        this.page = 1;
    }
    
     async fetchMovies() {
         try {
      const response = await axios.get(`${BASE_URL}trending/movie/week?api_key=${API_KEY}&page=${this.page}`);
                this.incrementPage();
      return response.data.results;
    } catch (error) {
      throw new Error(`Oops, something went wrong`)
    }
    }
    
    resetPage() {
    this.page = 1;
  }

  incrementPage() {
    this.page += 1;
  }
}



// const test = new MoviesTrendAPIService();   -----> для тестування
// test.fetchMovies()



