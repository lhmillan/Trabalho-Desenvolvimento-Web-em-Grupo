import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { GiUfo } from "react-icons/gi";


function Navbar() {
  const navigate = useNavigate();
  const { estaAutenticado, logout } = useAuth();

  async function sair() {
    await logout();
    navigate("/login");
  }


  return (

    <nav className="navbar">
      <h2><GiUfo />Diário ET</h2>
    
      <ul>
        <li><Link to="/home">Home</Link></li>
        {estaAutenticado && (
          <>
            <Link to="/aliens">Aliens</Link>
            <Link to="/planetas">Planetas</Link>
            <Link to="/avistamentos">Avistamentos</Link>
          </>
        )}
        {estaAutenticado ? (
          <button className="menu-button" type="button" onClick={sair}>
            Sair
          </button>
        ) : (
          <>
            <Link to="/logins">Login</Link>
            <Link to="/cadastros">Cadastro</Link>
          </>
        )}



      </ul>
    </nav>
  );
}

export default Navbar;