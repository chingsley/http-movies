import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";


export default class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => {
        localStorage.setItem('movies', JSON.stringify(res.data));
        console.log(res.data)
        this.setState({ movies: res.data });
      })
      .catch(err => console.log(err.response));
  }

  deleteMovie = movieID => {
    axios
      .delete(`http://localhost:5000/api/movies/${movieID}`)
      .then(res => {
        console.log(res);
        this.setState(prevState => ({ movies: prevState.movies.filter(movie => `${movie.id}` != `${res.data}`) }));
      })
      .catch(err => console.log(err));
  };

  render() {
    
    return (
      <div className="movie-list">
        {this.state.movies.map(movie => (
          <MovieCard
            key={movie.id}
            movie={movie}
            deleteMovie={this.deleteMovie}
            addToSavedList={this.props.addToSavedList}
          />
        ))}
      </div>
    );
  }
}

// function MovieDetails({ movie, deleteMovie }) {
  // return (
    // <Link to={`/movies/${movie.id}`}>
      // <MovieCard movie={movie} deleteMovie={deleteMovie} />
    // </Link>
  // );
// }
