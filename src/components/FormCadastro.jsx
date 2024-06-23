import React from 'react';
import { useForm } from 'react-hook-form';

function FormCadastro({ switchToLogin }) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => {
    alert(JSON.stringify(data));
    console.log(data);
  }

  return (
    <div>
      <h1>Cadastro</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Nome" {...register("Nome", {required: true})} />
        {errors.Nome && <p>Nome é obrigatório</p>}

        <input type="text" placeholder="Email" {...register("Email", {required: true, pattern: /^\S+@\S+$/i})} />
        {errors.Email && <p>Email inválido</p>}

        <input type="password" placeholder="Senha" {...register("Senha", {required: true})} />
        {errors.Senha && <p>Senha é obrigatória</p>}

        <input type="submit" />
      </form>
      <button onClick={switchToLogin}>Já tem uma conta? Faça login</button>
    </div>
  );
}

export default FormCadastro;
