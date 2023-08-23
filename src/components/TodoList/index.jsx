import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos } from '@/features/todos/todoActions';
import { DragDropContext } from 'react-beautiful-dnd';
import DeleteItemModal from '@/components/modals/DeleteItemModal';
import DeleteAllHighModal from '@/components/modals/DeleteAllHighModal';
import ErrorComponent from '@/components/generic/ErrorComponent';
import LoaderComponent from '@/components/generic/LoaderComponent';
import TodoColumn from '@/components/generic/TodoColumn';
import styles from './TodoList.module.scss';
import {
  moveTodo,
  removeTodo,
  removeAllHighUrgency,
} from '@/features/todos/todoSlice';
import {
  getLowUrgencyTodos,
  getMediumUrgencyTodos,
  getHighUrgencyTodos,
  getTodosStatus,
  getTodosError,
} from '@/features/todos/todoSelectors';

function TodoList() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [isDeleteAllHighModalOpen, setIsDeleteAllHighModalOpen] =
    useState(false);

  const dispatch = useDispatch();

  const handleDeleteItemClick = (todo) => {
    setSelectedTodo(todo);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmItemDelete = () => {
    dispatch(
      removeTodo({
        urgency: 'medium',
        taskId: selectedTodo.id,
      }),
    );
    setIsDeleteModalOpen(false);
    setSelectedTodo(null);
  };

  const handleOpenDeleteAllHighModal = () => {
    setIsDeleteAllHighModalOpen(true);
  };

  const handleDeleteAllHighUrgency = () => {
    dispatch(removeAllHighUrgency());
    setIsDeleteAllHighModalOpen(false);
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (
      !destination ||
      (source.droppableId === destination.droppableId &&
        source.index === destination.index)
    ) {
      return;
    }

    if (source.droppableId !== 'low' && destination.droppableId === 'low') {
      return;
    }

    dispatch(
      moveTodo({
        source: { droppableId: source.droppableId, index: source.index },
        destination: {
          droppableId: destination.droppableId,
          index: destination.index,
        },
      }),
    );
  };

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const lowUrgencyTodos = useSelector(getLowUrgencyTodos);
  const mediumUrgencyTodos = useSelector(getMediumUrgencyTodos);
  const highUrgencyTodos = useSelector(getHighUrgencyTodos);

  const todosStatus = useSelector(getTodosStatus);
  const error = useSelector(getTodosError);

  if (todosStatus === 'loading') {
    return (
      <div className={styles.centeredContainer}>
        <LoaderComponent />
      </div>
    );
  } else if (todosStatus === 'failed') {
    return (
      <div className={styles.centeredContainer}>
        <ErrorComponent errorMessage={error} />
      </div>
    );
  }

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className={styles.todoListContainer}>
          <TodoColumn
            title="Low Urgency"
            items={lowUrgencyTodos}
            droppableId="low"
            isDropDisabled={true}
          />
          <TodoColumn
            title="Medium Urgency"
            items={mediumUrgencyTodos}
            droppableId="medium"
            onDelete={handleDeleteItemClick}
          />
          <TodoColumn
            title="High Urgency"
            items={highUrgencyTodos}
            droppableId="high"
            onClearAll={handleOpenDeleteAllHighModal}
          />
        </div>
      </DragDropContext>

      <DeleteItemModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={handleConfirmItemDelete}
        itemTitle={selectedTodo ? selectedTodo.title : ''}
      />
      <DeleteAllHighModal
        isOpen={isDeleteAllHighModalOpen}
        onClose={() => setIsDeleteAllHighModalOpen(false)}
        onDelete={handleDeleteAllHighUrgency}
      />
    </>
  );
}

export default TodoList;
