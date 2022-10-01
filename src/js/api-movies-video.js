import { API_KEY } from './API_KEY';
import axios from 'axios';
import { BASE_URL } from './api-trending';

export class MoviesVideoAPIService {
    constructor() {
        this.movieId = null; // -----> для тестування 945657  718930  616037 (number)
    }
    
     async fetchMovies() {
         try {
             const response = await axios.get(`${BASE_URL}movie/${this.movieId}/videos?api_key=${API_KEY}&language=en-US`);
             const treilersArr = response.data.results;
            //  checkTreilersArr(treilersArr)   ------> виклик функції на перевірку офф трейлера
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

// const test = new MoviesVideoAPIService();   // ----> для тестування
// test.fetchMovies()



function checkTreilersArr(treilersArr) {
    for (const treiler of treilersArr) {
        if (treiler.name === 'Official Trailer') {
            return treiler;
        }
        else if (treiler.name === 'Official Teaser') {
            return treiler;
      }
    }
}