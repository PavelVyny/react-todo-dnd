import { Provider } from 'react-redux';
import { store } from './store';

function App() {
  return (
    <Provider store={store}>
      <div>nice</div>
    </Provider>
  );
}

export default App;
