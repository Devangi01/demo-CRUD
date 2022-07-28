import { BrowserRouter, Routes, Route } from "react-router-dom";
import rocketImg from './assets/rocket.png';
import "./App.css";
import FormikContainer from "./components/FormikContainer"; 
import ViewData from "./components/ViewData";
import DataProvider from "./context/index";

const publicRoute = [
  { path: "/", component: <FormikContainer/> },
  { path: "/add-user", component: <FormikContainer/> },
  { path: "/edit-user/:id", component: <FormikContainer isEdit /> },
  { path: "/data", component: <ViewData /> },
];


function App() {
  return (
    <DataProvider>
    <BrowserRouter>
    <div className="container mt-6">
      <div className="row">
        <div className="col-md-30">
          <Routes>
          {publicRoute.map(({path, component}, idx) => (
            <Route key={idx} {...{path, element: component}} />
          ))}
          </Routes>
        </div>        
      </div>
    </div>
    </BrowserRouter>
    </DataProvider>
   
  );
}
export default App;
