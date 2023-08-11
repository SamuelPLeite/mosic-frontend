import React from 'react';
import { Link } from 'react-router-dom';

import Modal from './Modal';
import Button from '../Form/Button';

const ErrorModal = props => {
  const footer = props.isLogin ?
    <>
      <Link to="/login">
        <Button onClick={props.onClear}>
          Log In
        </Button>
      </Link>
      <Button inverse onClick={props.onClear}>Dismiss</Button>
    </> :
    <Button onClick={props.onClear}>Dismiss</Button>

  return (
    <Modal
      onCancel={props.onClear}
      header="An Error Occurred!"
      show={!!props.error}
      footer={footer}
    >
      <p>{props.error}</p>
    </Modal>
  );
};

export default ErrorModal;