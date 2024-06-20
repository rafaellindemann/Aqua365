import { Link } from "react-router-dom"
import styles from './Navbar.module.css'

function Navbar() {
  return (
    <nav className={styles.navbar}>
        <Link to="/"><p className={styles.p}>Dashboard</p></Link>
        <Link to="/cadastro"><p className={styles.p}>Cadastrar Relatório</p></Link>
        <Link to="/lista"><p className={styles.p}>Lista de Relatórios</p></Link>
        <Link to="/login"><p className={styles.p}>Login</p></Link>
    </nav>
  )
}

export default Navbar