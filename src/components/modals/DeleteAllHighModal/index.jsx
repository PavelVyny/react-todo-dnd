import PropTypes from 'prop-types';
import Modal from '@/components/generic/Modal';
import styles from './DeleteAllHighModal.module.scss';

function DeleteAllHighModal({ isOpen, onClose, onDelete }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.deleteModalContent}>
        <p>
          You are going to delete all{' '}
          <strong className={styles.deleteModalMarked}>high urgency</strong>{' '}
          items. Are you sure?
        </p>
        <div className={styles.actions}>
          <button onClick={onClose} className={styles.closeButton}>
            not really
          </button>
          <button onClick={onDelete} className={styles.deleteButton}>
            Delete all
          </button>
        </div>
      </div>
    </Modal>
  );
}

DeleteAllHighModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DeleteAllHighModal;
