import { getMovies, getMovieById } from "../db/db";

const resolvers = {
  Query: {
    movies: (_, { limit, rating }) => getMovies(limit, rating),
    movie: (_, { id }) => getMovieById(id)
  }
  // Mutation: {
  //   addMovie: (_, { name, genre, score }) => addMovie({ name, genre, score }),
  //   deleteMovie: (_, { id }) => deleteMovie(id)
  // }
};

export default resolvers;
