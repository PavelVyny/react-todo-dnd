import PropTypes from 'prop-types';
import styles from './TodoItem.module.scss';

function TodoItem({ todo, onDelete }) {
  return (
    <div className={styles.todoItem}>
      {todo.title}
      {onDelete && (
        <button
          className={styles.deleteButton}
          onClick={() => onDelete(todo.id)}
        >
          X
        </button>
      )}
    </div>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func,
};

export default TodoItem;
