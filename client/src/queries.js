import gql from "graphql-tag";

export const GET_MOVIES = gql`
  query GetMovies($limit: Int, $rating: Float) {
    movies(limit: $limit, rating: $rating) {
      id
      title
      rating
      language
      summary
      medium_cover_image
    }
  }
`;

export const GET_MOVIE_BY_ID = gql`
  query GetMovieById($id: ID!) {
    movie(id: $id) {
      id
      title
      rating
      language
      summary
      medium_cover_image
    }
  }
`;
