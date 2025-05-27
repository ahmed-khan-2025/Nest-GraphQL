// src/movies/movies.resolver.ts
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { CreateMovieInput } from './dto/create-movie.input';
import { UpdateMovieInput } from './dto/update-movie.input';

@Resolver(() => Movie)
export class MoviesResolver {
  constructor(private readonly moviesService: MoviesService) {}

  @Query(() => [Movie], { name: 'movies' })
  findAll() {
    return this.moviesService.findAll();
  }

  @Query(() => Movie, { name: 'movie' })
  findOne(@Args('id') id: string) {
    return this.moviesService.findOne(id);
  }

  @Mutation(() => Movie)
  createMovie(@Args('input') input: CreateMovieInput) {
    return this.moviesService.create(input);
  }

  @Mutation(() => Movie)
  updateMovie(@Args('input') input: UpdateMovieInput) {
    return this.moviesService.update(input);
  }

  @Mutation(() => Movie)
  removeMovie(@Args('id') id: string) {
    return this.moviesService.remove(id);
  }
}
