import { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
import styles from './Navbar.module.css';

function Navbar() {
  const { isLoggedIn, loggedUser, setIsLoggedIn, setLoggedUser } = useContext(GlobalContext);

  function test(){
    console.log(isLoggedIn);
    console.log(loggedUser);
  }

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoggedUser(null);
  };

  return (
    <nav className={styles.navbar}>
      <Link to="/"><p className={styles.p}>Dashboard</p></Link>
      <Link to="/cadastro"><p className={styles.p}>Cadastrar Relatório</p></Link>
      <Link to="/lista"><p className={styles.p}>Lista de Relatórios</p></Link>
      {isLoggedIn ? (
        <p className={styles.p} onClick={handleLogout}>Logout</p>
      ) : (
        <Link to="/login"><p className={styles.p}>Login</p></Link>
      )}
      <button onClick={test}>Test</button>
    </nav>
  );
}

export default Navbar;
