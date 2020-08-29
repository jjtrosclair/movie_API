import React from "react";
import axios from "axios";

import { LoginView } from "./login-view/login-view.jsx";
import { MovieCard } from "./movie-card/movie-card.jsx";
import { MovieView } from "./movie-view/movie-view.jsx";
import { RegistrationView } from "./registration-view/registration-view.jsx";
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

  onLoggedIn(user) {
    this.setState({
      user,
    });
  }

  render() {
    const { movies, selectedMovie, user } = this.state;

    if (!user)
      return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;

    // before movies have loaded
    if (!movies) return <div className="main-view" />;

    return (
      <div>
        <MyNavbar />

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
      </div>
    );
  }
}
