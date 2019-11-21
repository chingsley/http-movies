import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'reactstrap';

const MovieCard = props => {
  const { title, director, metascore, stars, id } = props.movie;

  const handleDelete = () => {
    props.deleteMovie(id);
  };


  const saveMovie = () => {
    const addToSavedList = props.addToSavedList;
    addToSavedList(props.movie);
  };

  return (
    // <Container>
      // <Row>
        // <Col>
          <div className="movie-card">
            <div className="movie-card--details">
              <h5><Link to={`/movies/${id}`}>{title}</Link></h5>
              <div className="movie-director">
                Director: <em>{director}</em>
              </div>
              <div className="movie-metascore">
                Metascore: <strong>{metascore}</strong>
              </div>
              <div>
                Actors: <em>{stars.join(', ')}</em>
                {/* {stars.map((star, index) => (
            <em key={index} className="movie-star">
              {`${star}, `}
            </em>
          ))} */}
              </div>
            </div>
            <div className="movie-card--controls">
              <Button color="info" onClick={saveMovie} >
                <i className="fa fa-save"></i>{' '}
                Save
              </Button>{' '}
              <Link className="btn btn-secondary" to={`/update-movie/${id}`}>
                <i className="fa fa-edit"></i>{' '}
                Edit
              </Link>{' '}
              <Button color="danger" onClick={handleDelete}>
                <i className="fa fa-trash"></i>{' '}
                Delete
              </Button>
            </div>
          </div>
        // </Col>
      // </Row>
    // </Container>
  );
};

export default MovieCard;
