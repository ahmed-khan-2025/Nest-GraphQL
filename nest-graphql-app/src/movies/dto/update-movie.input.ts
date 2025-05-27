// src/movies/dto/update-movie.input.ts
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateMovieInput } from './create-movie.input';

@InputType()
export class UpdateMovieInput extends PartialType(CreateMovieInput) {
  @Field()
  id: string;
}
