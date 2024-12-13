import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login.jsx';
import Home from './components/Home/Home.jsx';
import DetalleEvento from "./components/Eventos/DetalleEvento.jsx";
import Formulario from './components/Formulario/Formulario.jsx';


function App() {

  return (
    <Router>
      <Routes>

        <Route path="/" exact element={<Home/>} />
        <Route path="/evento/:eventId" exact element={<DetalleEvento/>} />
          <Route path="/login" exact element={<Login/>} />
          <Route path="/formulario" element={<Formulario/>} />
          <Route path="/formulario/:eventId" element={<Formulario/>} />

      </Routes>
    </Router>
  );
}

export default App;

