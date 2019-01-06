import React from "react";
// import { Query } from "react-apollo";
// import { Link } from "react-router-dom";
import { GET_MOVIES } from "../queries";
// import gql from "graphql-tag";
import HomeContainer from "../containers/HomeContainer";
import client from "../apollo";

let movies = [];

const Home = () => {
  return (
    <HomeContainer prefetchedMovies={movies} />
    // <Query query={GET_MOVIES} variables={{ limit: 10 }}>
    //   {({ data, loading, error }) => {
    //     if (loading) return <h1>Loading</h1>;
    //     if (error) return <h1>Error</h1>;
    //     const { movies } = data;
    //     // console.log(movies);
    //     const movieList = movies.map(movie => {
    //       return (
    //         <Link to={`/movie/${movie.id}`} key={movie.id}>
    //           <h1>{movie.title}</h1>
    //         </Link>
    //       );
    //     });
    //     return <>{movieList}</>;
    //   }}
    // </Query>
  );
};

Home.prefetch = () => {
  client
    .query({
      query: GET_MOVIES,
      variables: { limit: 10 }
    })
    .then(result => {
      const { movies: fetchedMovies } = result.data;
      movies = fetchedMovies;
    });
};

export default Home;
