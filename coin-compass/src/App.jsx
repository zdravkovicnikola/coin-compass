import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

//libraries
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// Layouts
import Main, { mainLoader } from "./layouts/Main";

// Actions
import { logoutAction } from "./actions/logout";

// Routes
import Dashboard, { dashboardLoader } from "./pages/Dashboard";
import Error from "./pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />, //Ovde se definiše React element koji će se renderovati kada korisnik poseti odgovarajuću rutu
    loader: mainLoader, //Ovo je opcioni parametar koji se koristi za dinamičko učitavanje komponenti. Ako se koristi, ova funkcija će se pozvati
                        // prilikom učitavanja komponente, što može biti korisno za asinhrono učitavanje komponenti.
    errorElement: <Error />,
    children: [
      {
        index: true, // podrazumevana ruta kada se otvori mejn
        element: <Dashboard />,
        loader: dashboardLoader,
        errorElement: <Error />
      },
      {
        path: "logout",
        action: logoutAction
      }
    ]
  },
]);

function App() {
  return <div className="App">
    <RouterProvider router={router} />
    <ToastContainer />
  </div>;
}

export default App;
