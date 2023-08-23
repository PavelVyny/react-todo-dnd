import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './Modal.module.scss';

function Modal({ isOpen, children }) {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>{children}</div>
    </div>,
    document.body,
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.node,
};

export default Modal;
