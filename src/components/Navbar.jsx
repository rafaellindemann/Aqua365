import { Link } from "react-router-dom"
import './Navbar.css';
function Navbar() {
  return (
    <nav className="navbar">
        <Link to="/">Dashboard</Link>
        <Link to="/cadastro">Cadastrar Relatório</Link>
        <Link to="/lista">Lista de Relatórios</Link>
        <Link to="/login">Login</Link>
    </nav>
  )
}

export default Navbar