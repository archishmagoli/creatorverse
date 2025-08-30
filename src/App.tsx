import { useRoutes } from 'react-router-dom'
import './App.css'
import { ShowCreators } from './pages/ShowCreators';

function App() {
  let element = useRoutes([
    {
      path: "/",
      element: <ShowCreators />,
    },
  ]);

  return element;
}

export default App
