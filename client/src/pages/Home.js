import React from "react";
import { GET_MOVIES } from "../graphql/queries";
import { Query } from "react-apollo";

const Home = () => {
  return (
    <Query query={GET_MOVIES} variables={{ limit: 10, rating: 4 }}>
      {({ loading, error, data }) => {
        if (loading) return <h1>Loading...</h1>;
        if (error) return <h1>Error Occured</h1>;
        const { movies } = data;
        const movieList = movies.map(movie => {
          return <h1 key={movie.id}>{movie.title}</h1>;
        });
        return movieList;
      }}
    </Query>
  );
};

export default Home;
