import React from "react";
import axios from "axios";

import { BrowserRouter as Router, Route } from "react-router-dom";

import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view//movie-view";
import { DirectorView } from "../director-view/./director-view";
import { GenreView } from "../genre-view/genre-view";
import MyNavbar from "../navbar/navbar";

export class MainView extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      user: null,
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user"),
      });
      this.getMovies(accessToken);
    }
  }

  // onMovieClick(movie) {
  //   this.setState({
  //     selectedMovie: movie,
  //   });
  // }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    this.setState({
      user: null,
    });

    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  getMovies(token) {
    axios
      .get("https://my-flix-app-4455.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          movies: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { movies, user } = this.state;

    // before movies have loaded
    if (!movies) return <div className="main-view" />;

    return (
      <Router>
        <MyNavbar />
        <div className="main-view">
          <Route
            exact
            path="/"
            render={() => {
              if (!user)
                return (
                  <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                );
              return movies.map((m) => <MovieCard key={m._id} movie={m} />);
            }}
          />
          <Route path="/register" render={() => <RegistrationView />} />
          {/* you keep the rest routes here */}
          <Route
            exact
            path="/movies/:movieId"
            render={({ match }) => (
              <MovieView
                movie={movies.find((m) => m._id === match.params.movieId)}
              />
            )}
          />
          <Route
            exact
            path="/movies/director/:name"
            render={({ match }) => {
              if (!movies) return <div className="main-view" />;
              return (
                <DirectorView
                  director={
                    movies.find((m) => m.Director.Name === match.params.name)
                      .Director
                  }
                />
              );
            }}
          />
          <Route
            path="/movies/genres/:name"
            render={({ match }) => {
              if (!movies) return <div className="main-view" />;
              return (
                <GenreView
                  genre={
                    movies.find((m) => m.Genre.Name === match.params.name).Genre
                  }
                />
              );
            }}
          />

          <Route
            exact
            path="/user"
            render={() => <ProfileView movies={movies} />}
          />
        </div>
      </Router>
    );
  }
}
