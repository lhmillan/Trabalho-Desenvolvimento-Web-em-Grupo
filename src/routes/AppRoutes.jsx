import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Avistamentos from '../pages/Avistamentos';
import Aliens from '../pages/Aliens';
import Planetas from '../pages/Planetas';
import Cadastro from '../pages/Cadastro';
import Navbar from '../components/NavBar';
import { useAuth } from '../context/AuthContext';

function RotaPrivada({ children }) {

  const { carregandoToken, estaAutenticado } = useAuth();

  if (carregandoToken) {
    return <p>Carregando...</p>;
  }

  if (!estaAutenticado) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function AppRoutes() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/logins" element={<Login />} />
        <Route path="/cadastros" element={<Cadastro />} />

        <Route path="/avistamentos" element={
          <RotaPrivada>
            <Avistamentos />
          </RotaPrivada>} />

        <Route
          path="/aliens" element={
            <RotaPrivada>
              <Aliens />
            </RotaPrivada>
          }
        />

        <Route path="/planetas" element={
          <RotaPrivada>
            <Planetas />
          </RotaPrivada>
        } />

        <Route path="*" element={
          <h1>404 - Página Não Encontrada!</h1>

        } />

      </Routes>

    </BrowserRouter>
  );
}

export default AppRoutes;