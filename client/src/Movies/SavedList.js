import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';


export default class SavedList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="saved-list">
        <h3>Saved Movies:</h3>
        <ul>
          {this.props.list.map(movie => {
            return (

                <li
                  className="saved-movie"
                  key={movie.id}
                >
                  <NavLink
                    to={`/movies/${movie.id}`}
                    activeClassName="saved-active"
                  >
                    {movie.title}
                  </NavLink>
                </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
