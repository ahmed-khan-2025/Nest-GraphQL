// src/movies/entities/movie.entity.ts
import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType()
export class Movie {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  director: string;

  @Field(() => Int)
  year: number;
}
