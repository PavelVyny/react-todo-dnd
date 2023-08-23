import PropTypes from 'prop-types';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import TodoItem from '@/components/TodoItem';
import styles from './TodoColumn.module.scss';

function TodoColumn({
  title,
  items,
  droppableId,
  isDropDisabled,
  onDelete,
  onClearAll,
}) {
  return (
    <div className={styles.column}>
      <h2 className={styles.columnHeader}>{title}</h2>
      <Droppable droppableId={droppableId} isDropDisabled={isDropDisabled}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={styles.columnContent}
          >
            <div className={styles.todoListItemsContainer}>
              {items.map((item, index) => (
                <Draggable
                  key={item.id}
                  draggableId={String(item.id)}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <TodoItem
                        todo={item}
                        onDelete={
                          droppableId === 'medium'
                            ? () => onDelete(item)
                            : undefined
                        }
                      />
                    </div>
                  )}
                </Draggable>
              ))}
            </div>
            {droppableId === 'high' && (
              <button
                className={styles.clearAllButton}
                onClick={onClearAll}
                disabled={items.length === 0}
              >
                Clear all
              </button>
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

TodoColumn.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    }),
  ).isRequired,
  droppableId: PropTypes.string.isRequired,
  isDropDisabled: PropTypes.bool,
  onDelete: PropTypes.func,
  onClearAll: PropTypes.func,
};

TodoColumn.defaultProps = {
  isDropDisabled: false,
  onDelete: () => {},
  onClearAll: () => {},
};

export default TodoColumn;
