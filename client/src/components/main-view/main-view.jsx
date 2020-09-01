import React from "react";
import axios from "axios";

import { LoginView } from "./login-view/";
import { MovieCard } from "./movie-card";
import { MovieView } from "./movie-view";
import MyNavbar from "./navbar/navbar";

export class MainView extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: null,
      selectedMovie: null,
      user: null,
    };
  }

  componentDidMount() {
    axios
      .get("https://my-flix-app-4455.herokuapp.com/movies")
      .then((response) => {
        //assign result to the state
        this.setState({
          movies: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie,
    });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);

  }

  getMovies(token) {
    axios.get("https://my-flix-app-4455.herokuapp.com/movies", {
      headers: {Authorization: 'Bear ${token}`}
    })
    .then(response => {
      this.setState({
        movies: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }



  render() {
    const { movies, selectedMovie, user } = this.state;

   


    if (!user)
      return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;

    // before movies have loaded
    if (!movies) return <div className="main-view" />;

    return (
      <MyNavbar/>
      <div className="main-view">
        {selectedMovie ? (
          <MovieView movie={selectedMovie} />
        ) : (
          movies.map((movie) => (
            <MovieCard
              key={movie._id}
              movie={movie}
              onClick={(movie) => this.onMovieClick(movie)}
            />
          ))
        )}
      </div>
    );
  }
}
