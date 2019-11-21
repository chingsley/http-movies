import React, { useState } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import MovieForm from './Movies/MovieForm';
import { Container, Row, Col } from 'reactstrap';

const App = () => {
  const [savedList, setSavedList] = useState([]);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  return (
    <>
      <Container>
        <Row>
          <Col>
            <SavedList list={savedList} />
            <Route exact path="/" render={props => (
              <MovieList {...props} addToSavedList={addToSavedList} />
            )} />
            <Route
              path="/movies/:id"
              render={props => {
                return <Movie {...props} addToSavedList={addToSavedList} />;
              }}
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
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default App;
