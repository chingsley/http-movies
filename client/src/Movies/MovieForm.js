import React from 'react';

import { Container, Row, Col, Button, Form, FormGroup, Input, FormFeedback } from 'reactstrap';

const initialFormState = {
  title: '',
  director: '',
  metascore: '',
  stars: [],
};

class MovieForm extends React.Component {
  state = {
    form: initialFormState,
    inputStars: {
      '0': '',
    }
  };

  handleSubmit = e => {
    e.preventDefault();

    console.log(this.state);
  };

  addStar = e => {
    e.preventDefault();
    console.log(this.state);

    this.setState(prevState => {
      const lastInputKey = Object.keys(prevState.inputStars).pop();
      const newInputKey = `${Number(lastInputKey) +  1}`;

      return {
        inputStars: {
          ...prevState.inputStars,
          [newInputKey]: '',
        }
      }
    });
  }

  changeHandler = e => {
    const fieldName = e.target.name;
    let fieldValue = e.target.value;
    console.log(fieldName, fieldValue);

    this.setState(prevState => {
      const {form, inputStars } = prevState;
      if (fieldName === 'metascore') {
        fieldValue = parseInt(fieldValue, 10);
      }

      if (!Number.isNaN(Number(fieldName))) {
        inputStars[fieldName] = fieldValue;
      } else {
        form[fieldName] = fieldValue;
      }

      return ({
        form: form,
        inputStars: inputStars
      });
    });
  };

  render() {
    return (
      <Container>
        <Row className="form-container-row">
          <Col className="form-container">
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
              {Object.keys(this.state.inputStars).map(key => (
                <FormGroup key={key} row>
                  <Col sm={10}>
                    <Input
                      type="text"
                      name={key}
                      id="stars"
                      placeholder="Star name"
                      value={this.state.inputStars[key]}
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
          </Col>
        </Row>
      </Container>
    );
  }
}

export default MovieForm;
