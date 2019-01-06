import React from "react";
import { GET_MOVIES } from "../graphql/queries";
import { Query } from "react-apollo";

const App = () => {
  return (
    <Query query={GET_MOVIES} variables={{ limit: 10, rating: 5 }}>
      {({ loading, error, data }) => {
        if (loading) return <h1>Loading</h1>;
        if (error) return <h1>error</h1>;
        return <h1>success</h1>;
      }}
    </Query>
  );
};

export default App;
