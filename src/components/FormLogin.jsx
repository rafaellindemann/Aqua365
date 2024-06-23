import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { GlobalContext } from "../context/GlobalContext";
import { useNavigate } from 'react-router-dom';

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
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Email" {...register("Email", {required: true, pattern: /^\S+@\S+$/i})} />
        {errors.Email && <p>Email inválido</p>}

        <input type="password" placeholder="Senha" {...register("Senha", {required: true})} />
        {errors.Senha && <p>Senha é obrigatória</p>}

        <input type="submit" />
      </form>
      <button onClick={switchToCadastro}>Não tem uma conta? Cadastre-se</button>
    </div>
  );
}

export default FormLogin;


