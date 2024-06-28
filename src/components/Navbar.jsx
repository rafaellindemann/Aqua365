import { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
import styles from './Navbar.module.css';

function Navbar() {
  const { isLoggedIn, loggedUser, setIsLoggedIn, setLoggedUser } = useContext(GlobalContext);

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
      {console.log(isLoggedIn)}
      {console.log(loggedUser)}
    </nav>
  );
}

export default Navbar;



// import { useContext } from 'react';
// import { Link, useNavigate } from "react-router-dom";
// import { GlobalContext } from "../context/GlobalContext";
// import styles from './Navbar.module.css';

// function Navbar() {
//   // const { isLoggedIn, setIsLoggedIn, setLoggedUser } = useContext(GlobalContext);
//   const { isLoggedIn, setIsLoggedIn, setLoggedUser, loggedUser } = useContext(GlobalContext);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     setIsLoggedIn(false);
//     setLoggedUser(null);
//     navigate('/login');
//   };

//   return (
//     <nav className={styles.navbar}>
//       <Link to="/"><p className={styles.p}>Dashboard</p></Link>
//       <Link to="/cadastro"><p className={styles.p}>Cadastrar Relatório</p></Link>
//       <Link to="/lista"><p className={styles.p}>Lista de Relatórios</p></Link>
//       {isLoggedIn ? (
//         <p className={styles.p} onClick={handleLogout}>Logout</p>
//       ) : (
//         <Link to="/login"><p className={styles.p}>Login</p></Link>
//       )}
//       {console.log(isLoggedIn)}
//       {console.log(loggedUser)}
//     </nav>
//   );
// }

// export default Navbar;


// import { Link } from "react-router-dom"
// import styles from './Navbar.module.css'

// function Navbar() {
//   return (
//     <nav className={styles.navbar}>
//         <Link to="/"><p className={styles.p}>Dashboard</p></Link>
//         <Link to="/cadastro"><p className={styles.p}>Cadastrar Relatório</p></Link>
//         <Link to="/lista"><p className={styles.p}>Lista de Relatórios</p></Link>
//         <Link to="/login"><p className={styles.p}>Login</p></Link>
//     </nav>
//   )
// }

// export default Navbar