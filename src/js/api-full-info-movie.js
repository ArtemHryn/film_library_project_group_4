import { API_KEY } from "./API_KEY"
import axios from 'axios';
import { BASE_URL } from './api-trending'

export class MoviesFullInfoAPIService {
    constructor() {
        this.movieId = 718930; // -----> для тестування 945657  718930  616037(number)
    }
    
     async fetchMovies() {
         try {
      const response = await axios.get(`${BASE_URL}movie/${this.movieId}?api_key=${API_KEY}`);
      return response.data;
    } catch (error) {
      throw new Error(`Oops, something went wrong`)
    }
    }

     async fetchTreiler() {
         try {
       const response = await axios.get(`${BASE_URL}movie/${this.movieId}/videos?api_key=${API_KEY}&language=en-US`);
             const treilersArr = response.data.results;
      return treilersArr;
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


const test = new MoviesFullInfoAPIService();   // ----> для тестування
test.fetchTreiler()