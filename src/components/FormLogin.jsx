import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalContext';
import styleFormLogin from './FormLogin.module.css';

function FormLogin({ switchToCadastro }) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { usuarios, setIsLoggedIn, setLoggedUser } = useContext(GlobalContext);
  const navigate = useNavigate();

  const onSubmit = data => {
    const user = usuarios.find(u => u.email === data.email && u.senha === data.senha);
    if (user) {
      setIsLoggedIn(true);
      setLoggedUser(user);
      navigate('/');
    } else {
      alert('Email ou senha incorretos');
    }
  };

  return (
    <div className={styleFormLogin.container}>
      <div className={styleFormLogin.formWrapper}>
        <h1>Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styleFormLogin.inputContainer}>
            <label>Email</label>
            <input type="text" {...register("email", { required: true, pattern: /^\S+@\S+$/i })} />
            {errors.email && <p>Email inválido</p>}
          </div>
          <div className={styleFormLogin.inputContainer}>
            <label>Senha</label>
            <input type="password" {...register("senha", { required: true })} />
            {errors.senha && <p>Senha é obrigatória</p>}
          </div>
          <input type="submit" value="Login" />
        </form>
        <p className={styleFormLogin.switchButton} onClick={switchToCadastro}>Não tem uma conta? Cadastre-se</p>
      </div>
    </div>
  );
}

export default FormLogin;
