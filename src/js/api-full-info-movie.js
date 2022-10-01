import { API_KEY } from "./API_KEY"
import axios from 'axios';
import { BASE_URL } from './api-trending'

export class MoviesFullInfoAPIService {
    constructor() {
        this.movieId = null; // -----> для тестування 945657(number)
    }
    
     async fetchMovies() {
         try {
      const response = await axios.get(`${BASE_URL}movie/${this.movieId}?api_key=${API_KEY}`);
      const response2 = await axios.get(
        `https://api.themoviedb.org/3/movie/${this.movieId}/videos?api_key=29563162ad0b73335f880d56505c78bf&language=en-US`
      );
      console.log(response2);
      return response.data;
    } catch (error) {
      throw new Error(`Oops, something went wrong`)
    }
    }
    

    get id() {
        return this.movieId;
    }

    set id(newId) {
        return this.movieId = newId;
    }
}


// const test = new MoviesFullInfoAPIService();   // ----> для тестування
// test.fetchMovies()