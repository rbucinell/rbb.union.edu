import { useState } from 'react';
import './css/style.css';
import './css/rbb.css';
import './css/bootstrap.override.css';
import Page from './components/Page';

function App() {
  const course = false;
  const [count, setCount] = useState(0)

  return (
    <Page menu="Main" name="Home" contentURL='/content/index.html'/>
  )
}

export default App
