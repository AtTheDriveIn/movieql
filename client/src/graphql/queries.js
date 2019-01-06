import gql from "graphql-tag";

export const GET_MOVIES = gql`
  query GetMovies($limit: Int, $rating: Float) {
    movies(limit: $limit, rating: $rating) {
      id
      title
    }
  }
`;
