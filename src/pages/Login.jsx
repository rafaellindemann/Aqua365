import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  // console.log(errors);
  const navigate = useNavigate(); // Hook para navegação


  function fazerLogin(){
    console.log(formState);
    //navigate('/')
  }

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Email" {...register("Email", {required: true, pattern: /^\S+@\S+$/i})} />
        <input type="password" placeholder="Senha" {...register("Senha", {required: true})} />

        <input type="submit" />
      </form>

      <button onClick={() => fazerLogin}>Logar</button>
    </div>
  )
}

export default Login;
