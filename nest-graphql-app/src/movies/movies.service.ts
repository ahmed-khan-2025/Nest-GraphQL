// src/movies/movies.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { CreateMovieInput } from './dto/create-movie.input';
import { UpdateMovieInput } from './dto/update-movie.input';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  findAll(): Movie[] {
    return this.movies;
  }

  findOne(id: string): Movie {
    const movie = this.movies.find(m => m.id === id);
    if (!movie) {
      throw new NotFoundException(`Movie with id ${id} not found`);
    }
    return movie;
  }

  create(createMovieInput: CreateMovieInput): Movie {
    const newMovie: Movie = {
      id: uuidv4(),
      ...createMovieInput,
    };
    this.movies.push(newMovie);
    return newMovie;
  }

  update(updateMovieInput: UpdateMovieInput): Movie {
    const movieIndex = this.movies.findIndex(m => m.id === updateMovieInput.id);
    if (movieIndex === -1) {
      throw new NotFoundException(`Movie with id ${updateMovieInput.id} not found`);
    }
    const updatedMovie = {
      ...this.movies[movieIndex],
      ...updateMovieInput,
    };
    this.movies[movieIndex] = updatedMovie;
    return updatedMovie;
  }

  remove(id: string): Movie {
    const movieIndex = this.movies.findIndex(m => m.id === id);
    if (movieIndex === -1) {
      throw new NotFoundException(`Movie with id ${id} not found`);
    }
    const removedMovie = this.movies.splice(movieIndex, 1)[0];
    return removedMovie;
  }
}
