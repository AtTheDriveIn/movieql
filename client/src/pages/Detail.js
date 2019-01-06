import React from "react";
import { Query } from "react-apollo";
import { GET_MOVIE_BY_ID } from "../queries";

const Detail = ({ match }) => {
  const { params } = match;
  const { movieId } = params;
  console.log(movieId);
  return (
    <Query query={GET_MOVIE_BY_ID} variables={{ id: parseInt(movieId, 10) }}>
      {({ loading, error, data }) => {
        if (loading) return <h1>Loading...</h1>;
        if (error) return <h1>error</h1>;
        if (data) console.log(data);
        const { movie } = data;
        return <h1>{movie.title}</h1>;
      }}
    </Query>
  );
};

export default Detail;
