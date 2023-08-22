import { Provider } from 'react-redux';
import { store } from '@/store';
import TodoList from '../TodoList';
import styles from './App.module.scss';

function App() {
  return (
    <Provider store={store}>
      <div className={styles.appContainer}>
        <TodoList />
      </div>
    </Provider>
  );
}

export default App;
