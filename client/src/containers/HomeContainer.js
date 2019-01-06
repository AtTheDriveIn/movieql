import React, { Component } from "react";
import client from "../apollo";
import { GET_MOVIES } from "../queries";

class HomeContainer extends Component {
  state = {
    loading: true,
    movies: []
  };
  getMovies = () => {
    client
      .query({
        query: GET_MOVIES,
        variables: { limit: 10 }
      })
      .then(result => {
        const { movies } = result.data;
        this.setState({
          movies,
          loading: false
        });
      });
  };

  componentDidMount() {
    this.getMovies();
  }

  render() {
    const { loading, movies } = this.state;
    const { prefetchedMovies } = this.props;
    if (loading) return <h3>Loading Now...</h3>;
    if (prefetchedMovies.length > 0) {
      return <div>prefetched! {prefetchedMovies.length}</div>;
    }
    return <div>{movies.length}</div>;
  }
}

export default HomeContainer;
