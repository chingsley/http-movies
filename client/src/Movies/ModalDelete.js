import React from 'react';
import styled, { css } from 'styled-components';
import { Button } from 'reactstrap';


const ModalBG = styled.div`
  // color: white;
  // z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  visibility: hidden;
  opacity: 0;
  transform: rotateY(-90deg);
  transition: all 0.35s ease-out;

  ${props => {
    return(
      props.deleteModalOpen &&
      css`
        visibility: visible;
        opacity: 1;
        transform: rotateY(0deg);
      `
    );
  }}

  .modal-content {
    width: 40%;
    text-align: center;
    transform: rotateX(-90deg);
    // transform-origin: top;
    transition: transform 0.35s ease-out;
    transition-delay: 0.35s;

    ${props => {
      return (
        props.deleteModalOpen &&
        css`
          transform: rotateX(0deg);
        `
      );
    }}

    .header {
      color: #dc3545;
      font-size: 15px;
      font-weight: bold;
      text-align: left;
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
      padding-left: 0.5rem;
      border-bottom: 1px solid silver;
    }

    .p-question {
      margin-top: 1rem;
      
      .question-mark {
        font-weight: bold;
      }
    }

    .controls {
      padding: 1rem;
      width: 50%;
      margin: 0 auto;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }

  }

  .close-modal {
    color: white;
    position: absolute;
    top: 1rem;
    right: 1rem;
    border: 1px solid #dc3545;
    border-radius: 50%;
    display: block;
    width: 30px;
    height: 30px;
    text-align: center;
    // transform: rotate(0deg);
    transition: all 0.5s;

    :active {
      transform: rotate(720deg);
    }

    .fa-times {
      font-size: 24px;
    }
  }
`;

const ModalDelete = props => {
  const handleDelete = () => {
    props.deleteMovie(props.movie.id);
  };
  return (
    <ModalBG deleteModalOpen={props.deleteModalOpen}>
      <span className="close-modal" onClick={props.toggleDeleteModal}>
        <i className="fa fa-times"></i>
      </span>
      <div className="modal-content">
        <h6 className="header">Confirm Delete !</h6>
        <p className="p-question">Are you sure you want to delete this movie <span className="question-mark">?</span></p>
        <div className="controls">
          <Button className="del-modal-btns" color="info" onClick={props.toggleDeleteModal}>Cancel</Button>
          <Button className="del-modal-btns" color="danger" onClick={handleDelete}>Proceed</Button>
        </div>
      </div>
    </ModalBG>
  );
};

export default ModalDelete;
