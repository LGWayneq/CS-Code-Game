import GameScreen from './screens/GameScreen';
import { store } from './utils/redux/store'
import { Provider } from 'react-redux'

function App() {
  return (
    <Provider store={store}>
      <GameScreen />
    </Provider>
  );
}

export default App;
