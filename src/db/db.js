import axios from "axios";
const API_URL = "https://yts.am/api/v2/list_movies.json?";

export const getMovies = async (limit, rating) => {
  let URL = API_URL;
  if (limit > 0) {
    URL += `&limit=${limit}`;
  }

  if (rating > 0) {
    URL += `&minimum_rating=${rating}`;
  }

  try {
    const res = await axios.get(URL);
    const { data } = res.data;
    const { movies } = data;
    return movies;
  } catch (e) {
    console.log(e);
  }
};
