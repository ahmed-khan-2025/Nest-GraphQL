// src/movies/dto/create-movie.input.ts
import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateMovieInput {
  @Field()
  title: string;

  @Field()
  director: string;

  @Field(() => Int)
  year: number;
}
