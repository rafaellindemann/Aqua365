import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { GlobalContext } from "../context/GlobalContext";
import { useNavigate } from 'react-router-dom';
import styles from './FormLogin.module.css';

function FormLogin({ switchToCadastro }) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { usuarios, setIsLoggedIn } = useContext(GlobalContext);
  const navigate = useNavigate();

  const onSubmit = data => {
    const user = usuarios.find(user => user.email === data.Email && user.senha === data.Senha);
    if (user) {
      setIsLoggedIn(true);
      navigate('/');
    } else {
      alert("Email ou senha incorretos");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1>Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>

          <div className={styles.inputWrapper}>
            <input 
              type="text" 
              id="email" 
              className={`${styles.input} ${errors.Email ? styles.inputError : ''}`} 
              {...register("Email", { required: true, pattern: /^\S+@\S+$/i })} 
            />
            <label htmlFor="email" className={styles.label}>Email</label>
            {errors.Email && <p className={styles.errorMessage}>Email inválido</p>}
          </div>

          <div className={styles.inputWrapper}>
            <input 
              type="password" 
              id="senha" 
              className={`${styles.input} ${errors.Senha ? styles.inputError : ''}`} 
              {...register("Senha", { required: true })} 
            />
            <label htmlFor="senha" className={styles.label}>Senha</label>
            {errors.Senha && <p className={styles.errorMessage}>Senha é obrigatória</p>}
          </div>

          <input type="submit" className={`${styles.submitButton} ${styles.button}`} />
        </form>
        <button onClick={switchToCadastro} className={styles.switchButton}>Não tem uma conta? Cadastre-se</button>
      </div>
    </div>
  );
}

export default FormLogin;



// import React, { useContext } from 'react';
// import { useForm } from 'react-hook-form';
// import { GlobalContext } from "../context/GlobalContext";
// import { useNavigate } from 'react-router-dom';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import styles from './FormLogin.module.css';

// function FormLogin({ switchToCadastro }) {
//   const { register, handleSubmit, formState: { errors } } = useForm();
//   const { usuarios, setIsLoggedIn } = useContext(GlobalContext);
//   const navigate = useNavigate();

//   const onSubmit = data => {
//     const user = usuarios.find(user => user.email === data.Email && user.senha === data.Senha);
//     if (user) {
//       setIsLoggedIn(true);
//       navigate('/');
//     } else {
//       alert("Email ou senha incorretos");
//     }
//   }

//   return (
//     <div className={styles.container}>
//       <div className={styles.formWrapper}>
//         <h1>Login</h1>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <TextField
//             label="Email"
//             variant="outlined"
//             fullWidth
//             // margin="normal"
//             // InputLabelProps={{
//             //   classes: {
//             //     root: styles.labelRoot,
//             //     focused: styles.labelFocused,
//             //   },
//             // }}
//             {...register("Email", { required: true, pattern: /^\S+@\S+$/i })}
//             error={!!errors.Email}
//             helperText={errors.Email ? "Email inválido" : ""}
//           />
//           <TextField
//             label="Senha"
//             type="password"
//             variant="outlined"
//             // fullWidth
//             // margin="normal"
//             // InputLabelProps={{
//             //   classes: {
//             //     root: styles.labelRoot,
//             //     focused: styles.labelFocused,
//             //   },
//             // }}
//             {...register("Senha", { required: true })}
//             error={!!errors.Senha}
//             helperText={errors.Senha ? "Senha é obrigatória" : ""}
//           />
//           <Button
//             type="submit"
//             variant="contained"
//             color="primary"
//             fullWidth
//             className={styles.submitButton}
//           >
//             Entrar
//           </Button>
//         </form>
//         <Button
//           onClick={switchToCadastro}
//           className={styles.switchButton}
//         >
//           Não tem uma conta? Cadastre-se
//         </Button>
//       </div>
//     </div>
//   );
// }

// export default FormLogin;



// import React, { useContext } from 'react';
// import { useForm } from 'react-hook-form';
// import { GlobalContext } from "../context/GlobalContext";
// import { useNavigate } from 'react-router-dom';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import styles from './FormLogin.module.css';

// function FormLogin({ switchToCadastro }) {
//   const { register, handleSubmit, formState: { errors } } = useForm();
//   const { usuarios, setIsLoggedIn } = useContext(GlobalContext);
//   const navigate = useNavigate();

//   const onSubmit = data => {
//     const user = usuarios.find(user => user.email === data.Email && user.senha === data.Senha);
//     if (user) {
//       setIsLoggedIn(true);
//       navigate('/');
//     } else {
//       alert("Email ou senha incorretos");
//     }
//   }

//   return (
//     <div className={styles.container}>
//       <div className={styles.formWrapper}>
//         <h1>Login</h1>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <TextField
//             label="Email"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             {...register("Email", { required: true, pattern: /^\S+@\S+$/i })}
//             error={!!errors.Email}
//             helperText={errors.Email ? "Email inválido" : ""}
//           />
//           <TextField
//             label="Senha"
//             type="password"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             {...register("Senha", { required: true })}
//             error={!!errors.Senha}
//             helperText={errors.Senha ? "Senha é obrigatória" : ""}
//           />
//           <Button
//             type="submit"
//             variant="contained"
//             color="primary"
//             fullWidth
//             className={styles.submitButton}
//           >
//             Entrar
//           </Button>
//         </form>
//         <Button
//           onClick={switchToCadastro}
//           className={styles.switchButton}
//         >
//           Não tem uma conta? Cadastre-se
//         </Button>
//       </div>
//     </div>
//   );
// }

// export default FormLogin;



// // import React, { useContext } from 'react';
// // import { useForm } from 'react-hook-form';
// // import { GlobalContext } from "../context/GlobalContext";
// // import { useNavigate } from 'react-router-dom';
// // import styles from './FormLogin.module.css';

// // function FormLogin({ switchToCadastro }) {
// //   const { register, handleSubmit, formState: { errors } } = useForm();
// //   const { usuarios, setIsLoggedIn } = useContext(GlobalContext);
// //   const navigate = useNavigate();

// //   const onSubmit = data => {
// //     const user = usuarios.find(user => user.email === data.Email && user.senha === data.Senha);
// //     if (user) {
// //       setIsLoggedIn(true);
// //       navigate('/');
// //     } else {
// //       alert("Email ou senha incorretos");
// //     }
// //   }

// //   return (
// //     <div className={styles.container}>
// //       <div className={styles.formWrapper}>
// //         <h1>Login</h1>
// //         <form onSubmit={handleSubmit(onSubmit)}>
// //           <input type="text" placeholder="Email" {...register("Email", {required: true, pattern: /^\S+@\S+$/i})} />
// //           {errors.Email && <p>Email inválido</p>}

// //           <input type="password" placeholder="Senha" {...register("Senha", {required: true})} />
// //           {errors.Senha && <p>Senha é obrigatória</p>}

// //           <input type="submit" value="Entrar" />
// //         </form>
// //         <button onClick={switchToCadastro}>Não tem uma conta? Cadastre-se</button>
// //       </div>
// //     </div>
// //   );
// // }

// // export default FormLogin;
