import React from 'react';
import axios from 'axios';
import { Alert } from 'reactstrap';

import { Container, Row, Col, Button, Form, FormGroup, Input, FormFeedback } from 'reactstrap';

const initialFormState = {
  title: '',
  director: '',
  metascore: '',
  stars: [''],
};

class MovieForm extends React.Component {
  state = {
    form: { ...initialFormState },
    Movie: false,
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    if (id) {
      const movieToEdit = JSON.parse(localStorage.getItem('movies'))
                                .find(movie => `${movie.id}` === `${id}`);
      this.setState({ editMode: true, form: movieToEdit });
    }
  }

  addNewMovie = form => {
    axios
      .post('http://localhost:5000/api/movies', form)
      .then(res => {
        console.log('initialFormState = ', initialFormState);
        this.setState({ form: { ...initialFormState, stars: [''] } })
        this.props.history.push('/');
      })
      .catch(err => console.log(err));
  };


  updateMovie = form => {
    axios
      .put(`http://localhost:5000/api/movies/${form.id}`, form)
      .then(res => {
        console.log('initialFormState = ', initialFormState);
        this.setState({ form: { ...initialFormState, stars: [''] } })
        this.props.history.push('/');
      })
      .catch(err => console.log(err));
  };

  handleSubmit = e => {
    e.preventDefault();
    // console.log(this.state);
    const { form } = this.state;
    form.stars = form.stars.filter(name => name !== '');
    console.log(form);
    if (this.state.editMode) {
      this.updateMovie(form);
    } else {
      this.addNewMovie(form)
    }



  };

  addStar = e => {
    e.preventDefault();

    this.setState(prevState =>({
        form: {
          ...prevState.form,
          stars: [...prevState.form.stars, '']
        }
    }));
  }

  changeHandler = e => {
    e.persist();

    const fieldName = e.target.name;
    let fieldValue = e.target.value;
    const { attributes: { index } } = e.target;
    const fieldIndex = index && index.value;

    this.setState(prevState => {
      const { form } = prevState;
      if (fieldName === 'metascore') {
        fieldValue = parseInt(fieldValue, 10);
      }

      if (fieldName === 'stars') {
        form.stars[fieldIndex] = fieldValue;
      } else {
        form[fieldName] = fieldValue;
      }

      return ({ form });
    });
  };

  render() {

    if(this.state.editMode && !this.state.form) {
      return (
        <Container>
          <Row>
            <Col>
              <Alert color="danger">Movie not found</Alert>
            </Col>
          </Row>
        </Container>
      );
    }
    return (
      // <Container>
        // <Row className="form-container-row">
          // <Col className="form-container">
            <Form className="movie-form" onSubmit={this.handleSubmit}>
              <FormGroup row>
                <Col sm={7}>
                  <Input
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Movie title"
                    value={this.state.form.title}
                    onChange={this.changeHandler}
                    valid={this.state.form.title.length > 1}
                    invalid={this.state.form.title !== '' && this.state.form.title.length <= 1}
                  />
                </Col>
                <Col sm={3}>
                  <Input
                    type="number"
                    name="metascore"
                    id="metascore"
                    placeholder="metascore"
                    value={this.state.form.metascore}
                    onChange={this.changeHandler}
                    valid={this.state.form.metascore > 0}
                    invalid={this.state.form.metascore < 0}
                  />
                  <FormFeedback>Invalid metascore</FormFeedback>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm={10}>
                  <Input
                    type="text"
                    name="director"
                    id="director"
                    placeholder="Movie director"
                    value={this.state.form.director}
                    onChange={this.changeHandler}
                  />
                </Col>
              </FormGroup>
              {this.state.form.stars.map((star, index) => (
                <FormGroup key={index} row>
                  <Col sm={10}>
                    <Input
                      type="text"
                      name="stars"
                      index={index}
                      className="stars"
                      id={`star-${index}`}
                      placeholder="Star name"
                      value={star}
                      onChange={this.changeHandler}
                    />
                  </Col>
                </FormGroup>
              ))}
              <FormGroup row>
                <Col>
                   <Button color="warning" onClick={this.addStar} >Add Star</Button><br />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col>
                  <Button color="info" className="btn-add-friend">
                    {this.state.isEditing ? 'Update Movie' : 'Submit'}
                  </Button>
                </Col>
              </FormGroup>
            </Form>
          // </Col>
        // </Row>
      // </Container>
    );
  }
}

export default MovieForm;
