import './Modal.scss';

import React, { ReactNode } from 'react';

import { Close } from './Icons';

type ModalProps = {
  children: ReactNode
  onClose: () => void
}

function Modal({ children, onClose }: ModalProps) {
  const handleClose = () => {
    onClose();
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-close" onClick={onClose}>
          <Close />
        </div>
        {children}
      </div>
    </div>
  )
}

export default Modal;

