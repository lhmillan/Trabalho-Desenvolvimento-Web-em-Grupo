import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Avistamentos from '../pages/Avistamentos';
import Aliens from '../pages/Aliens';
import Planetas from '../pages/Planetas';
import Navbar from '../components/Navbar';
import PrivateRoute from './PrivateRoute';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
             <Home />
             </PrivateRoute>
            }
          />
          
        <Route path="/avistamentos" element={<Avistamentos />} />
        <Route path="/aliens" element={<Aliens />} />
        <Route path="/planetas" element={<Planetas />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;