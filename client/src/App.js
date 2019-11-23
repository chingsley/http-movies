import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import MovieForm from './Movies/MovieForm';
import NavBar from './Movies/NavBar';
import { Container, Row, Col } from 'reactstrap';

const App = () => {
  const [savedList, setSavedList] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/movies')
      .then(res => {
        const savedMovies = res.data.filter(movie => movie.saved);
        setSavedList(savedMovies);
      })
      .catch(err => console.log(err));
  });

  const addToSavedList = movie => {
    console.log('savedList = ', savedList);
    const movieInList = !!savedList.find(savedMovie => savedMovie.id === movie.id);
    if(movieInList) {
      return;
    } else {
      movie.saved = true;
      axios
        .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
        .then(res => {
          const savedMovies = res.data.filter(movie => movie.saved);
          setSavedList(savedMovies);
        })
        .catch(err => console.log(err));
      // setSavedList([...savedList, movie]);
    }
  };

  const removeFromSavedList = movie => {
    // const newList = savedList.filter(savedMovie => savedMovie.id !== movie.id);
    // setSavedList(newList);
    movie.saved = false;
    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then(res => {
        const savedMovies = res.data.filter(movie => movie.saved);
        setSavedList(savedMovies);
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      <NavBar />
      <Container>
        <Row>
          <Col>
            <div className="flex">
              <div className="flex-left">
                <Route exact path="/" render={props => (
                  <MovieList
                    {...props}
                    addToSavedList={addToSavedList}
                    removeFromSavedList={removeFromSavedList}
                    savedList={savedList}
                  />
                )} />
                <Route
                  path="/movies/:id"
                  render={props => (
                    <Movie
                      {...props}
                      addToSavedList={addToSavedList}
                      removeFromSavedList={removeFromSavedList}
                      savedList={savedList}
                    />
                  )}
                />
                <Route
                  path="/add-movie"
                  render={props => (
                    <MovieForm {...props} />
                  )}
                />
                <Route
                  path="/update-movie/:id"
                  render={props => (
                    <MovieForm {...props} />
                  )}
                />
              </div>
              <div className="flex-right">
                <SavedList list={savedList} />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default App;
