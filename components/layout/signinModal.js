import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import Signin from '../signin';

export default function SigninModal(props) {
  const { modal, providers, session, toggleModal } = props;

  if (providers === null) {
    return null;
  }
  return (
    <Modal isOpen={modal} toggle={toggleModal} style={{ maxWidth: 700 }}>
      <ModalHeader>Sign up / Sign in</ModalHeader>
      <ModalBody style={{ padding: '1em 2em' }}>
        <Signin session={session} providers={providers} />
      </ModalBody>
    </Modal>
  );
}
