import { Link } from 'react-router-dom';
//import './Navbar.css'; // Tem q criar o arquivo desse css

function Navbar() {
  return (
    <nav className="navbar">
      <h2>Diário ET</h2>
      <ul>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/avistamentos">Avistamentos</Link></li>
        <li><Link to="/aliens">Aliens</Link></li>
        <li><Link to="/planetas">Planetas</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;