import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import ModalDelete from './ModalDelete';


class MovieCard extends React.Component {

  state = {
    deleteModalOpen: false,
  };

  toggleDeleteModal = () => {
    this.setState(prevState => ({ deleteModalOpen: !prevState.deleteModalOpen }))
  };

  // handleDelete = () => {
  //   this.props.deleteMovie(this.props.movie.id);
  // };


  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.props.movie);
  };

  render() {
    const { title, director, metascore, stars, id } = this.props.movie;
    return (
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
          <ModalDelete
            movie={this.props.movie}
            deleteModalOpen={this.state.deleteModalOpen}
            toggleDeleteModal={this.toggleDeleteModal}
            deleteMovie={this.props.deleteMovie}
          />
        </div>
        <div className="movie-card--controls">
          <Button color="info" onClick={this.saveMovie} >
            <i className="fa fa-save"></i>{' '}
            Save
          </Button>{' '}
          <Link className="btn btn-secondary" to={`/update-movie/${id}`}>
            <i className="fa fa-edit"></i>{' '}
            Edit
          </Link>{' '}
          <Button color="danger" onClick={this.toggleDeleteModal}>
            <i className="fa fa-trash"></i>{' '}
            Delete
          </Button>
        </div>
      </div>
    );
  }

}

export default MovieCard;
