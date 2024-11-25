import React from 'react';
import ReactModal from 'react-modal';
import styles from './ImageModal.module.css';

const ImageModal = ({ image, onClose }) => {
  return (
    <ReactModal
      isOpen={true}
      onRequestClose={onClose}
      className={styles.modal}
      overlayClassName={styles.overlay}
      ariaHideApp={false}
    >
      <img src={image.urls.regular} alt={image.alt_description} />
      <p>{image.description || 'Açıklama yok.'}</p>
      <button onClick={onClose} className={styles.closeButton}>
        Kapat
      </button>
    </ReactModal>
  );
};

export default ImageModal;
