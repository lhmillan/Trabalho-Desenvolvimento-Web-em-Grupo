import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Avistamentos from '../pages/Avistamentos';
import Aliens from '../pages/Aliens';
import Planetas from '../pages/Planetas';
import Cadastro from '../pages/Cadastro';
import Navbar from '../components/NavBar';
import PrivateRoute from './PrivateRoute';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/logins" element={<Login />} />
        <Route path="/cadastros" element={<Cadastro />} />

        <Route path="/avistamentos" element={
          <PrivateRoute>
            <Avistamentos />
          </PrivateRoute>} />

        <Route
          path="/aliens" element={
            <PrivateRoute>
              <Aliens />
            </PrivateRoute>
          }
        />

        <Route path="/planetas" element={
          <PrivateRoute>
            <Planetas />
          </PrivateRoute>
        } />

        <Route path="*" element={<h1>404 - Página Não Encontrada</h1>} />
      </Routes>

    </BrowserRouter>
  );
}

export default AppRoutes;