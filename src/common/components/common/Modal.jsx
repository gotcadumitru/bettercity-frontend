import React, { useRef } from 'react';
import useClickOutside from '../../hooks/useClickOutside';

const Modal = ({ isOpen, handleModalStatus, containerClassName = '', ...props }) => {
  const modalRef = useRef(null);

  const closeModal = () => {
    handleModalStatus(false);
  };

  useClickOutside(modalRef, () => closeModal());

  return (
    <div className={`c-modal ${isOpen ? 'c-modal--open' : ''}`}>
      <div ref={modalRef} className={`c-modal__container ${containerClassName}`}>
        {props.children}
      </div>
    </div>
  );
};
export default Modal;
