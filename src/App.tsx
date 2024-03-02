import Form from './Form';
import { GlobalStorage } from './GlobalContext';

function App() {
  return (
    <>
      <GlobalStorage>
        <Form />
      </GlobalStorage>
    </>
  );
}

export default App;
