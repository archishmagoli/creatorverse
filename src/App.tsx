import { useRoutes } from 'react-router-dom'
import { ShowCreators } from './pages/ShowCreators';
import { AddCreator } from './pages/AddCreator';
import { ViewCreator } from './pages/ViewCreator';
import { EditCreator } from './pages/EditCreator';

function App() {
  let element = useRoutes([
    {
      path: "/",
      element: <ShowCreators />,
    },
    {
      path: "/add-creator",
      element: <AddCreator />,
    },
    {
      path: '/creator/:id',
      element: <ViewCreator />,
    },
    {
      path: '/creator/:id/edit',
      element: <EditCreator />
    }
  ]);

  return element;
}

export default App
