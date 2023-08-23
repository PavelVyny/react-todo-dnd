import PropTypes from 'prop-types';
import Modal from '@/components/generic/Modal';
import styles from './DeleteItemModal.module.scss';

function DeleteItemModal({ isOpen, onClose, onDelete, itemTitle = '' }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.deleteModalContent}>
        <p>
          You are going to delete item{' '}
          <strong className={styles.deleteModalMarked}>{itemTitle}</strong>. Are
          you sure?
        </p>
        <div className={styles.actions}>
          <button onClick={onClose} className={styles.closeButton}>
            not really
          </button>
          <button onClick={onDelete} className={styles.deleteButton}>
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
}

DeleteItemModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  itemTitle: PropTypes.string,
};

export default DeleteItemModal;
